import { NextFunction, Request, Response } from "express";
import { createCommunication, fetchCompanyCommunication, fetchEmployeeCommunications, fetchLeadCommunications } from "../services/communication.service";

export const createCommunicationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);

        const { leadId, communicationType, note, outcome, followUpNeeded } = req.body

        const user = (req as any).user

        const result = await createCommunication(user.id, leadId, communicationType, note, outcome, followUpNeeded)

        res.status(201).json(result)

    } catch (error) {
        next(error)
    }

}

export const getCompanyCommunications = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = (req as any).user

        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10



        const result = await fetchCompanyCommunication(user.id, page, limit)

        res.status(201).json(result)

    } catch (error) {
        next(error)
    }

}


export const getClientCommunication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leadId = parseInt(req.params.leadId)

        const user = (req as any).user


        const result = await fetchLeadCommunications(user.id, leadId)

        res.status(201).json(result)

    } catch (error) {
        next(error)
    }

}

export const getEmployeeCommunication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId)

        const admin = (req as any).user



        const result = await fetchEmployeeCommunications(admin.id, userId)

        res.status(201).json(result)

    } catch (error) {
        next(error)
    }

}