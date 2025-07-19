import { Request, Response, NextFunction } from "express";
import { createPayment, fetchCompanyPayments, fetchTotalEarnedPerLead } from "../services/payment.service";

export const addPayment = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { leadId, amount, note, createdAt } = req.body

        const user = (req as any).user

        const result = await createPayment(user.id, leadId, amount, createdAt, note)


        res.status(201).json(result)
    } catch (error) {

        next(error)
    }
}

export const getCompanyPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user

        const result = await fetchCompanyPayments(user.id)


        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}


export const getTotalEarnedPerLead = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = (req as any).user

        const result = await fetchTotalEarnedPerLead(user.id)


        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}
