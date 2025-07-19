import { Request, Response, NextFunction } from "express";
import { authenticateUser, changePassword, confirmInvite, createInvite, createUser, refreshAccessToken, requestPasswordReset } from "../services/auth.services";
import { ApiError } from "../middlewares/error.handler.middleware";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { name, email, password, companyName } = req.body

        const result = await createUser(name, email, password, companyName)

        res.status(201).json(result)

    } catch (error) {
        next(error)

    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        console.log(req.body);

        const { accessToken, refreshToken, user } = await authenticateUser(email, password)


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })


        res.status(200).json({
            success: true,
            message: "Login successfull",
            accessToken,
            user
        })


    } catch (error) {
        next(error);

    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.refreshToken
        console.log("Refresh token called");

        if (!token) {
            throw new ApiError("Refresh token missing", 401)

        }


        const result = await refreshAccessToken(token)
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {

    try {

        if(!req.body.email) {
            throw new ApiError('Email cannot be null',400)
        }
        
        const { email } = req.body
console.log(email);


        const result = await requestPasswordReset(email)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { token, password } = req.body


        const result = await changePassword(token, password)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}

export const sendInvite = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, name, role } = req.body

        const user = (req as any).user

        const result = await createInvite(user.id, name, email, role)

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }

}

export const acceptInvite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, password } = req.body

        const result = await confirmInvite(token, password)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

