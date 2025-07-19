import { AppDataSource } from "../config/data-source"
import { userStatusChange } from "../controllers/user.controller";
import { CommunicationLog } from "../entities/communication.entity";
import { Company } from "../entities/company.entity";
import { Lead } from "../entities/leads.entity";
import { Payment } from "../entities/payment.entity";
import { Reminder } from "../entities/reminder.entity";
import { User } from "../entities/user.entity"
import { UserStatus } from "../enums/user_status.enum";
import { ApiError } from "../middlewares/error.handler.middleware";


export const fetchUserProfile = async (
    userId: number,
) => {
    const userRepo = AppDataSource.getRepository(User)
    const reminderRepo = AppDataSource.getRepository(Reminder);
    const communicationRepo = AppDataSource.getRepository(CommunicationLog);
    const paymentRepo = AppDataSource.getRepository(Payment);
    const leadRepo = AppDataSource.getRepository(Lead);

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: [
            'company',
        ]
    })

    if (!user) {
        throw new ApiError("User not found", 404)
    }

    const [remindersCount, communicationsCount, paymentsCount, leadsCount] = await Promise.all([
        reminderRepo.count({ where: { createdBy: { id: userId } } }),
        communicationRepo.count({ where: { createdBy: { id: userId } } }),
        paymentRepo.count({ where: { createdBy: { id: userId } } }),
        leadRepo.count({ where: { createdBy: { id: userId } } }),
    ]);



    return {
        success: true,
        message: "User profile fetched successfully",
        user,
        stats: {
            totalRemindersCreated: remindersCount,
            totalCommunicationsLogged: communicationsCount,
            totalPaymentsRecorded: paymentsCount,
            totalLeadsGenerated: leadsCount
        }
    }
}



export const fetchCompanyUsers = async (
    userId: number,
) => {
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: [
            'company',
            'company.employees'
        ],
        select: {
            company: {
                id: true,
                employees: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    role: true,
                    status: true
                }
            }
        }

    })


    if (!user) {
        throw new ApiError("User not found", 404)
    }






    return {
        success: true,
        message: "Users fetched successfully",
        users: user.company.employees || [],

    }
}



export const removeUser = async (userId: number, employeeId: number) => {
    const userRepo = AppDataSource.getRepository(User);


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company'],
    });

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    const employee = await userRepo.findOne({
        where: {
            id: employeeId,
            company: { id: user.company.id },
        },
    });

    if (!employee) {
        throw new ApiError("User not found or doesn't belong to your company", 404);
    }

    await userRepo.remove(employee);

    return {
        success: true,
        message: "User deleted successfully",
        userId: employeeId
    };

}

export const statusChange = async (
    userId: number,
    employeeId: number,
    newStatus: UserStatus
) => {
    const userRepo = AppDataSource.getRepository(User)


    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company']
    })

    const employee = await userRepo.findOne({
        where: {
            id: employeeId,
            company: { id: user.company.id }
        }
    })

    if (!employee) {
        throw new ApiError("User not founded in your company", 404)
    }
    console.log(userId);
    console.log(employeeId);

    if (userId == employeeId) {
        throw new ApiError("You cannot change your own status", 403);
    }
    if (newStatus === UserStatus.PENDING) {
        throw new ApiError("Cannot change user status to pending", 400);
    }


    if (newStatus === UserStatus.REVOKED && employee.status !== UserStatus.PENDING) {
        throw new ApiError("User can only be revoked from pending status", 400);
    }

    employee.status = newStatus

    await userRepo.save(employee)

    return {
        success: true,
        message: "User status updated successfully",
        user: employee,
    }
}