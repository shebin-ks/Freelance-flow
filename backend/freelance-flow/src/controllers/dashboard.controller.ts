import { NextFunction, Request, Response } from "express";
import { fetchDashboardSummary } from "../services/dashboard.service";

export const getDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {

        
        const userId = (req as any).user.id

        const result = await fetchDashboardSummary(userId)

        res.status(200).json(result)


    } catch (error) {
        next(error)
    }
}

