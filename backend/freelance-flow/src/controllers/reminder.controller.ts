import { NextFunction, Request, Response } from "express";
import { createReminder, fetchReminders, markReminderAsDone, upcommingReminders } from "../services/reminder.service";


export const createReminderController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { reminderAt, leadId, note, reminderType } = req.body

        const userId = (req as any).user.id

        const result = await createReminder(userId, leadId, reminderAt, note, reminderType)

        res.status(201).json(result)


    } catch (error) {
        next(error)
    }
}

export const markAsDoneController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const reminderId = parseInt(req.params.reminderId)

        const userId = (req as any).user.id

        const result = await markReminderAsDone(userId, reminderId)

        res.status(201).json(result)


    } catch (error) {
        next(error)
    }
}

export const getReminders = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const isCompletedQuery = req.query.isCompleted

        let isCompleted: boolean | undefined;

        if (isCompletedQuery !== undefined) {
            const completedStr = String(isCompletedQuery).toLowerCase();

            if (completedStr === "true") {
                isCompleted = true;
            } else if (completedStr === "false") {
                isCompleted = false;
            }
        }

        const userId = (req as any).user.id


        const result = await fetchReminders(userId,isCompleted)

        res.status(201).json(result)


    } catch (error) {
        next(error)
    }
}

export const getUpcommingReminder = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const days = parseInt(req.query.days as string) || 7

        const userId = (req as any).user.id


        const result = await upcommingReminders(userId, days)

        res.status(201).json(result)


    } catch (error) {
        next(error)
    }
}