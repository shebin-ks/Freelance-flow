import { truncate } from "fs"
import { AppDataSource } from "../config/data-source"
import { Lead } from "../entities/leads.entity"
import { User } from "../entities/user.entity"
import { LeadStatus } from "../enums/lead_status.enum"
import { UserRole } from "../enums/user_role.enum"
import { ApiError } from "../middlewares/error.handler.middleware"
import { Company } from "../entities/company.entity"
import { Payment } from "../entities/payment.entity"
import { Reminder } from "../entities/reminder.entity"
import { CommunicationLog } from "../entities/communication.entity"


export const createLead = async (
    userId: number,
    name: string,
    purpose: string,
    email?: string,
    phone?: string,
    leadCompanyName?: string,
) => {

    const userRepo = AppDataSource.getRepository(User)
    const leadRepo = AppDataSource.getRepository(Lead)



    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })


    const lead = leadRepo.create({
        name,
        email,
        phone,
        purpose,
        leadCompanyName,
        company: user.company,
        createdBy: user
    })

    await leadRepo.save(lead)


    return {
        success: true,
        message: "Lead created successfully",
        lead,

    }
}

export const statusChange = async (
    userId: number,
    leadId: number,
    status: LeadStatus
) => {
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

    if (status === LeadStatus.PAYMENT_DONE && user.role !== UserRole.ADMIN) {
        throw new ApiError("Only Admins can mark lead status as payment done", 403)
    }

    lead.status = status

    await leadRepo.save(lead)

    return {
        success: true,
        message: "Lead status updated successfully",
        lead,
    }
}


export const fetchAllLeads = async (
    userId: number,
    page: number = 1,
    limit: number = 10

) => {

    const userRepo = AppDataSource.getRepository(User)
    const leadRepo = AppDataSource.getRepository(Lead)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const skip = (page - 1) * limit

    const [leads, total] = await leadRepo.findAndCount({
        where: { company: { id: user.company.id } },
        relations: ['createdBy'],
        select: {

            createdBy: {
                id: true,
                name: true,
                email: true
            }
        },
        skip,
        take: limit,
        order: {
            id: 'DESC'
        }
    })

    return {
        success: true,
        message: "Leads fetched successfully",
        leads,
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


export const fetchTopLeads = async (userId: number) => {

    const userRepo = AppDataSource.getRepository(User)
    const leadRepo = AppDataSource.getRepository(Lead)
    const paymentRepo = AppDataSource.getRepository(Payment)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const leads = await leadRepo.find({
        where: {
            company: { id: user.company.id }
        },
        relations: ['payments']
    })

    const leadsWithTotal = leads.map(lead => {
        const totalPaid = lead.payments.reduce((sum, p) => sum + p.amount, 0)

        const { payments, ...leadData } = lead
        return {
            ...leadData,
            totalPaid
        }
    })

    const leadsWithTotalSorted = leadsWithTotal.sort((a, b) => b.totalPaid - a.totalPaid)

    return {
        topLeads: leadsWithTotalSorted
    }
}



export const fetchLeadProfile = async (
    leadId: number,
) => {
    const reminderRepo = AppDataSource.getRepository(Reminder);
    const communicationRepo = AppDataSource.getRepository(CommunicationLog);
    const leadRepo = AppDataSource.getRepository(Lead);

    const lead = await leadRepo.findOne({
        where: { id: leadId },
        relations: [
            'company', 'createdBy', 'payments'
        ]
    })

    if (!lead) {
        throw new ApiError("Lead not found", 404)
    }

    const paymentsCount = lead.payments.length

    const totalAmountReceived = lead.payments.reduce((sum, p) => sum + p.amount, 0)



    const [remindersCount, communicationsCount] = await Promise.all([
        reminderRepo.count({ where: { lead: { id: leadId } } }),
        communicationRepo.count({ where: { lead: { id: leadId } } }),
    ]);


    return {
        success: true,
        message: "Lead profile fetched successfully",
        lead,
        stats: {
            totalReminders: remindersCount,
            totalCommunications: communicationsCount,
            totalPayments: paymentsCount,
            totalAmountReceived
        }
    };
}

export const removeLead = async (userId: number, leadId: number) => {
    const userRepo = AppDataSource.getRepository(User);
    const leadRepo = AppDataSource.getRepository(Lead);


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company'],
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    const lead = await leadRepo.findOne({
        where: {
            id: leadId,
            company: { id: user.company.id },
        },
    });

    if (!lead) {
        throw new ApiError("Lead not found or doesn't belong to your company", 404);
    }

    await leadRepo.remove(lead);

    return {
        success: true,
        message: "Lead deleted successfully",
        leadId
    };

}

interface LeadData {
    name: string;
    email?: string;
    phone?: string;
    leadCompanyName?: string;
    purpose?: string;
}


export const insertLeads = async (userId: number, leadsData: LeadData[]) => {
    const userRepo = AppDataSource.getRepository(User);
    const leadRepo = AppDataSource.getRepository(Lead);

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company'],
    });
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    if (!user.company) {
        throw new ApiError('User company not found', 404);
    }

    const leadsToInsert = leadsData.map(data => {
        const lead = leadRepo.create({
            ...data,
            company: user.company,
            createdBy: user,
        });
        return lead;
    });

    const savedLeads = await leadRepo.save(leadsToInsert);

    
    return {
        success: true,
        message: `${savedLeads.length} leads imported successfully`,
        leads: savedLeads,
    };
};