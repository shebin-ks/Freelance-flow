import { User } from "../entities/user.entity";


export const sanitizeUser = (user: User) => {
    const { password, ...safeUser } = user

    return safeUser
}