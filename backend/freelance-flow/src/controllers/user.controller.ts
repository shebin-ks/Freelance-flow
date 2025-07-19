import { Request, Response, NextFunction } from "express";
import { fetchCompanyUsers, fetchUserProfile, removeUser, statusChange } from "../services/user.service";

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = (req as any).user

        const result = await fetchUserProfile(user.id)

        res.status(200).json(result)

    } catch (error) {
        next(error)

    }
}


export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userId = parseInt(req.params.userId)

        const result = await fetchUserProfile(userId)

        res.status(200).json(result)

    } catch (error) {
        next(error)

    }
}

export const getCompanyUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = (req as any).user

        const result = await fetchCompanyUsers(user.id)

        res.status(200).json(result)

    } catch (error) {
        next(error)

    }

}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const user = (req as any).user
        const employeeId = parseInt(req.params.userId)

        const result = await removeUser(user.id, employeeId)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


export const userStatusChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, status } = req.body

        const user = (req as any).user

        const result = await statusChange(user.id, userId, status)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}