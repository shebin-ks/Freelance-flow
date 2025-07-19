import { AppDataSource } from "../config/data-source"
import { CommunicationLog } from "../entities/communication.entity"
import { Lead } from "../entities/leads.entity"
import { User } from "../entities/user.entity"
import { ReminderType } from "../enums/reminder_type.enum"
import { ApiError } from "../middlewares/error.handler.middleware"

export const createCommunication = async (
    userId: number,
    leadId: number,
    communicationType?: ReminderType,
    note?: string,
    outcome?: string,
    followUpNeeded?: string,

) => {
    const communicationRepo = AppDataSource.getRepository(CommunicationLog)
    const userRepo = AppDataSource.getRepository(User)
    const leadRepo = AppDataSource.getRepository(Lead)


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

    const communication = communicationRepo.create({
        communicationType,
        note,
        outcome,
        followUpNeeded,
        lead,
        createdBy: user
    })

    await communicationRepo.save(communication)


    return {
        success: true,
        message: "Communication log created",
        communication,
    }

}


export const fetchCompanyCommunication = async (
    userId: number,
    page: number = 1,
    limit: number = 10
) => {
    const communicationRepo = AppDataSource.getRepository(CommunicationLog)
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const skip = (page - 1) * limit


    const [communications, total] = await communicationRepo.findAndCount({
        where: {
            createdBy: { company: { id: user.company.id } }
        },
        relations: ['createdBy', 'lead'],
        select: {
            lead: {
                id: true,
                name: true,
                email: true,
            },
            createdBy: {
                id: true,
                name: true,
                email: true,
            }
        },
        // skip,
        // take: limit,
        order: {
            id: "DESC"
        }
    })

    return {
        success: true,
        message: "Communications fetched successfully",
        communications,
        pagination: {
            totalItems: total,
            currentPage: page,
            pageSize: limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        }
    }




}


export const fetchLeadCommunications = async (userId: number, leadId: number) => {
    const communicationRepo = AppDataSource.getRepository(CommunicationLog)
    const userRepo = AppDataSource.getRepository(User)
    const leadRepo = AppDataSource.getRepository(Lead)


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

    const communications = await communicationRepo.find({
        where: {
            lead: { id: leadId },
        }
    })

    return {
        communications
    }

}


export const fetchEmployeeCommunications = async (adminId: number, userId: number) => {
    const communicationRepo = AppDataSource.getRepository(CommunicationLog)
    const userRepo = AppDataSource.getRepository(User)


    const admin = await userRepo.findOne({
        where: { id: adminId },
        relations: ['company']
    })

    const user = await userRepo.findOne({
        where: {
            id: userId,
            company: { id: admin.company.id }
        }
    })

    if (!user) {
        throw new ApiError(`Employee with id ${userId} not founded in your company`, 404)
    }

    const communications = await communicationRepo.find({
        where: {
            createdBy: { id: userId },
        }
    })

    return {
        success: true,
        communications
    }

}