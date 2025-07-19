import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/user_role.enum";
import { ApiError } from "./error.handler.middleware";
import { UserStatus } from "../enums/user_status.enum";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";

export const authorizeRole = (allowedRoles: UserRole[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = (req as any).user;

        if (!user) {
            throw new ApiError("Unauthorized", 401)
        }
        const userInfo = await AppDataSource.getRepository(User).findOneBy({ id: user.id })


        const role = userInfo.role
        if (!allowedRoles.includes(role)) {
            throw new ApiError("Forbidden: Access denied", 403)
        }

        if (userInfo.status !== UserStatus.ACTIVE) {
            throw new ApiError("Your account is not active", 403)
        }
        next()

    } catch (error) {
        next(error)
    }




}