import { AppDataSource } from "../config/data-source"
import { Company } from "../entities/company.entity"
import { User } from "../entities/user.entity"
import { UserRole } from "../enums/user_role.enum";
import { UserStatus } from "../enums/user_status.enum";
import { ApiError } from "../middlewares/error.handler.middleware"
import bcrypt from "bcrypt";
import { generateAccessToken, generateInviteToken, generatePasswordResetToken, generateRefreshToken, verifyAccessToken, verifyInviteToken, verifyPasswordResetToken, verifyRefreshToken } from "../utils/token";
import { sanitizeUser } from "../utils/sanitize.user";
import { sendEmail } from "../utils/email";


export const createUser = async (name: string, email: string, password: string, companyName: string) => {

    const userRepo = AppDataSource.getRepository(User)
    const companyRepo = AppDataSource.getRepository(Company)


    const existingUser = await userRepo.findOneBy({ email })

    console.log(existingUser);


    if (existingUser) {
        throw new ApiError("Email Already in use", 409)
    }

    const company = companyRepo.create({ name: companyName })
    await companyRepo.save(company)


    const hashedPassword = await bcrypt.hash(password, 10)

    const user = userRepo.create({
        name,
        email,
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        company: company
    })

    await userRepo.save(user)

    return {
        success: true,
        message: "User registered successfully",
        data: {
            id: user.id,
            name,
            email: user.email,
            role: user.role,
            company: company.name
        }
    }
}

export const authenticateUser = async (email: string, password: string) => {

    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOneBy({ email })

    if (!user) {
        throw new ApiError("Email doesn't exist", 404)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new ApiError("Email or Password is invalid", 401)
    }

    if (user.status !== UserStatus.ACTIVE) {
        throw new ApiError("User is not active", 403)
    }

    const payload = {
        id: user.id,
        role: user.role
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return {
        accessToken,
        refreshToken,
        user: sanitizeUser(user)
    }

}

export const refreshAccessToken = async (refreshToken: string) => {
    const userRepo = AppDataSource.getRepository(User);

    const decoded = verifyRefreshToken(refreshToken)


    if (typeof decoded === "string" || !decoded.id) {
        throw new ApiError("Invalid or expired invite token", 400);
    }

    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.status !== UserStatus.ACTIVE) {
        throw new ApiError("User is not active", 403)
    }
    const payload = {
        id: user.id,
        role: user.role
    }

    const accessToken = generateAccessToken(payload)

    return {
        success: true,
        message: "New access token created successfully",
        accessToken,

    }


}

export const requestPasswordReset = async (email: string) => {

    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOneBy({ email })

    console.log(user);
    if (!user) {

        throw new ApiError('No user associated with this email', 404);
    }


    if (user.status !== UserStatus.ACTIVE) {
        throw new ApiError("User is not active", 403)
    }




    const token = generatePasswordResetToken({ id: user.id });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const html = `
      <h3>Password Reset Request</h3>
      <p>Hi ${user.name || 'User'},</p>
      <p>You recently requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>
      <p><small>This link will expire in 15 minutes.</small></p>
    `;

    await sendEmail(
        user.email,
        'Reset Your Password - FreelanceFlow',
        html.toString(),
        html
    );

    return {
        success: true,
        message: 'Password reset email sent successfully',
    };
};



export const changePassword = async (token: string, password: string) => {

    const decoded = verifyPasswordResetToken(token);


    if (typeof decoded === "string" || !decoded.id) {
        throw new ApiError("Invalid or expired invite token", 400);
    }
    

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: decoded.id });

    if (!user) {
        throw new ApiError('User not found', 404);
    }

    if (user.status !== 'active') {
        throw new ApiError('User account is not active', 403);
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await userRepo.save(user);

    return {
        success: true,
        message: 'Password has been reset successfully',
    };
};



export const createInvite = async (userId: number, name: string, email: string, role: UserRole) => {



    const userRepo = AppDataSource.getRepository(User)

    const existingUser = await userRepo.findOneBy({ email })

    if (existingUser) {
        throw new ApiError("User with this email already exists", 409)
    }

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ["company"]
    })


    const company = user.company


    const newUser = userRepo.create({
        name,
        email,
        password: "",
        role,
        status: UserStatus.PENDING,
        company

    })

    await userRepo.save(newUser)

    const payload = {
        id: newUser.id
    }

    const inviteToken = generateInviteToken(payload)

    const inviteLink = `${process.env.FRONTEND_URL}/accept-invite/${inviteToken}`;
    const subject = `${user.name} has invited you to join ${company.name}`

    const html = `
    <p>Hi ${name},</p>
    <p><strong>${user.name}</strong> has invited you to join the company <strong>${company.name}</strong> on FreelanceFlow CRM.</p>
    <p>Click the link below to accept the invitation and set your password:</p>
    <p><a href="${inviteLink}">Accept Invitation</a></p>
    <p>This link will expire in 48 hours.</p>
    <br/>
    <p>– FreelanceFlow Team</p>
  `;


    await sendEmail(email, subject, undefined, html)

    return {
        success: true,
        message: "Invitation sent successfully",
        user: newUser
    }
}

export const confirmInvite = async (token: string, password: string) => {

    const userRepo = AppDataSource.getRepository(User)


    const decoded = verifyInviteToken(token)


    if (typeof decoded === "string" || !decoded.id) {
        throw new ApiError("Invalid or expired invite token", 400);
    }


    const user = await userRepo.findOneBy({ id: decoded.id })

    if (!user || user.status !== UserStatus.PENDING) {
        throw new ApiError("Invite not found or already accepted", 404);

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.status = UserStatus.ACTIVE

    await userRepo.save(user)

    return {
        success: true,
        message: "Invite accepted successfully. You can now login.",

    }


}