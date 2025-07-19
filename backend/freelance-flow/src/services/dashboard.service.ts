import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import { Reminder } from "../entities/reminder.entity";
import { ApiError } from "../middlewares/error.handler.middleware";

export const fetchDashboardSummary = async (userId: number) => {

    console.log(userId);
    
    const userRepo = AppDataSource.getRepository(User);
    const reminderRepo = AppDataSource.getRepository(Reminder);

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ['company', 'company.leads', 'company.payments']
    });

    if (!user || !user.company) {
        throw new ApiError("User or associated company not found", 404);
    }

    


    const now = new Date();
    const startCurrentMonth = startOfMonth(now);
    const endCurrentMonth = endOfMonth(now);

    const startPrevMonth = startOfMonth(subMonths(now, 1));
    const endPrevMonth = endOfMonth(subMonths(now, 1));

    const leads = user.company.leads;
    const payments = user.company.payments;

    const totalLeads = leads.length;

    const leadsThisMonth = leads.filter(lead =>
        lead.createdAt >= startCurrentMonth && lead.createdAt <= endCurrentMonth
    );

    const leadsLastMonth = leads.filter(lead =>
        lead.createdAt >= startPrevMonth && lead.createdAt <= endPrevMonth
    );

    const leadGrowth = calculateGrowth(leadsLastMonth.length, leadsThisMonth.length);



    // -------- REVENUE -----------

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const paymentsThisMonth = payments.filter(p =>
        p.createdAt >= startCurrentMonth && p.createdAt <= endCurrentMonth
    );

    const paymentsLastMonth = payments.filter(p =>
        p.createdAt >= startPrevMonth && p.createdAt <= endPrevMonth
    );

    const monthlyRevenue = paymentsThisMonth.reduce((sum, p) => sum + p.amount, 0);
    const lastMonthRevenue = paymentsLastMonth.reduce((sum, p) => sum + p.amount, 0);



    const revenueGrowth = calculateGrowth(lastMonthRevenue, monthlyRevenue);

    // -------- Reminders --------
    const reminders = await reminderRepo.find({
        where: {
            createdBy: { company: { id: user.company.id } }
        },
    });

    const notCompleted = reminders.filter(r => !r.isCompleted);
    const upcomingFollowUps = notCompleted.filter(r => r.reminderAt > now);
    const overdueFollowUps = notCompleted.filter(r => r.reminderAt < now);

    return {
        success: true,
        message: "Dashboard summary fetched successfully",
        summary: {
            totalContacts: totalLeads,
            totalContactsGrowth: leadGrowth,
            totalRevenue,
            totalRevenueGrowth: revenueGrowth,
            monthlyRevenue,
            monthlyRevenueGrowth: revenueGrowth,
            upcomingFollowUps: upcomingFollowUps.length,
            overdueFollowUps: overdueFollowUps.length
        }
    };
};

function calculateGrowth(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}
