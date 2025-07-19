import { AppDataSource } from "../config/data-source"
import { Company } from "../entities/company.entity"
import { Lead } from "../entities/leads.entity"
import { Payment } from "../entities/payment.entity"
import { User } from "../entities/user.entity"
import { ApiError } from "../middlewares/error.handler.middleware"


export const createPayment = async (
    userId: number,
    leadId: number,
    amount: number,
    createdAt: Date,
    note?: string,
) => {

    const leadRepo = AppDataSource.getRepository(Lead)
    const paymentRepo = AppDataSource.getRepository(Payment)
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

    const payment = paymentRepo.create({
        amount,
        lead,
        createdBy: user,
        company: user.company,
        createdAt,
        note,


    })


    await paymentRepo.save(payment)

    return {
        success: true,
        message: "Payment added successfully",
        payment
    }


}

export const fetchCompanyPayments = async (userId: number) => {
    const userRepo = AppDataSource.getRepository(User)
    const paymentRepo = AppDataSource.getRepository(Payment)


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })


    const payments = await paymentRepo.find({
        where: {
            createdBy: {
                company: { id: user.company.id }
            }
        },
        relations: ['lead', 'createdBy'],
        order: {
            createdAt: "DESC"
        },
        select: {
            lead: {
                id: true,
                name: true,
                email: true,
                leadCompanyName:true
            },
            createdBy: {
                id: true,
                name: true,
                email: true
            }
        }

    })

    return {
        success: true,
        message: "Payment fetched successfully",
        payments
    }

}


export const fetchTotalEarnedPerLead = async (userId: number) => {
    const userRepo = AppDataSource.getRepository(User)
    const companyRepo = AppDataSource.getRepository(Company)


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const company = await companyRepo.findOne({
        where: { id: user.company.id },
        relations: ['leads', 'leads.createdBy', 'leads.payments'],
        select: {
            leads: {
                id: true,
                name: true,
                email: true,
            },

        }
    })


    return {
        EarnedPerLead: company.leads
    }

}