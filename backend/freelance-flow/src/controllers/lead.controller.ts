import { NextFunction, Request, Response } from "express";
import { createLead, fetchAllLeads, fetchLeadProfile, fetchTopLeads, insertLeads, removeLead, statusChange } from "../services/lead.service";
import { parseExcelBuffer } from "../utils/excelParsrer";
import { ApiError } from "../middlewares/error.handler.middleware";

export const createLeadController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, purpose, leadCompanyName } = req.body

        const userId = (req as any).user.id


        const result = await createLead(userId, name, purpose, email, phone, leadCompanyName)


        res.status(201).json(result)


    } catch (error) {
        next(error)
    }
}

export const getLeadProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const leadId = parseInt(req.params.leadId)

        const result = await fetchLeadProfile(leadId)

        res.status(200).json(result)

    } catch (error) {
        next(error)

    }
}

export const leadStatusChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { leadId, status } = req.body

        const user = (req as any).user

        const result = await statusChange(user.id, leadId, status)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}


export const getAllLeads = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10

        const user = (req as any).user

        const result = await fetchAllLeads(user.id, page, limit)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}

export const getTopLeads = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10

        const user = (req as any).user

        const result = await fetchTopLeads(user.id)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}

export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const user = (req as any).user
        const leadId = parseInt(req.params.leadId)

        const result = await removeLead(user.id, leadId)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}




export const uploadLeadsFromExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new ApiError('Excel file is required', 400);
        }

        const user = (req as any).user

        const data = parseExcelBuffer(req.file.buffer);
        const result = await insertLeads(user.id, data);

        res.status(200).json(result);

    } catch (err) {
        next(err);
    }
};
