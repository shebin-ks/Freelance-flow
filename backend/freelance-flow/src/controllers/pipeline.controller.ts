import { fetchPipelineOverview } from "../services/pipeline.services"
import { Request, Response, NextFunction } from "express";


export const getPipelineOverview = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = (req as any).user

        const result = await fetchPipelineOverview(user.id)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}