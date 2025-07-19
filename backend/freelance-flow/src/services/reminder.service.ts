import { Between } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Lead } from "../entities/leads.entity";
import { Reminder } from "../entities/reminder.entity";
import { User } from "../entities/user.entity";
import { ReminderType } from "../enums/reminder_type.enum";
import { ApiError } from "../middlewares/error.handler.middleware";


export const createReminder = async (
    userId: number,
    leadId: number,
    reminderAt: Date,
    note: string,
    reminderType: ReminderType,
) => {

    const leadRepo = AppDataSource.getRepository(Lead)
    const reminderRepo = AppDataSource.getRepository(Reminder)
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const lead = await leadRepo.findOne({
        where: {
            id: leadId,
            company: { id: user.company.id }
        }
    })

    if (!lead) {
        throw new ApiError("Lead not founded in your company", 404)
    }


    const reminder = reminderRepo.create({
        reminderType,
        lead,
        reminderAt,
        note,
        createdBy: user
    })

    await reminderRepo.save(reminder)

    return {
        success: true,
        message: "Reminder created successfully",
        reminder
    }
}

export const markReminderAsDone = async (userId: number, reminderId: number) => {
    const reminderRepo = AppDataSource.getRepository(Reminder)
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    });

    const reminder = await reminderRepo.findOne({
        where: { id: reminderId },
        relations: ['createdBy', 'createdBy.company']
    })
    if (!reminder) {
        throw new ApiError("Reminder not found", 404);
    }

    if (reminder.createdBy.company.id !== user.company.id) {
        throw new ApiError("You are not authorized to update this reminder", 403);
    }

    reminder.isCompleted = true
    await reminderRepo.save(reminder)

    return {
        success: true,
        message: "Reminder marked as completed",
        reminder

    }

}


export const fetchReminders = async (
    userId: number,
    isCompleted?: boolean
) => {

    const userRepo = AppDataSource.getRepository(User)
    const reminderRepo = AppDataSource.getRepository(Reminder)


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

console.log(isCompleted);


    const reminders = await reminderRepo.find({
        where: {
            createdBy: {
                company: { id: user.company.id }
            },
            isCompleted: isCompleted
        },
        relations: ['lead', 'createdBy'],
        select: {
            lead: {
                id: true,
                name: true,
                email: true
            },
            createdBy: {
                id: true,
                name: true,
                email: true
            },

        },
        order: {
            reminderAt: "DESC"
        }
    })


    return {
        success: true,
        message: `reminders fetched successfully`,
        reminders
    }
}


export const upcommingReminders = async (
    userId: number,
    days: number = 7
) => {

    const userRepo = AppDataSource.getRepository(User)
    const reminderRepo = AppDataSource.getRepository(Reminder)


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const now = new Date()
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)



    const reminders = await reminderRepo.find({
        where: {
            createdBy: {
                company: { id: user.company.id }
            },
            reminderAt: Between(now, futureDate),
            isCompleted: false
        },
        relations: ['lead', 'createdBy'],
        select: {
            lead: {
                id: true,
                name: true,
                email: true
            },
            createdBy: {
                id: true,
                name: true,
                email: true
            },

        },
        order: {
            reminderAt: "ASC"
        }
    })


    return {
        success: true,
        message: `reminders fetched successfully`,
        reminders
    }
}