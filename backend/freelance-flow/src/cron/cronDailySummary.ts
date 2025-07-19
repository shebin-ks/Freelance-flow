import cron from 'node-cron';
import { Between } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Company } from '../entities/company.entity';
import { CommunicationLog } from '../entities/communication.entity';
import { Reminder } from '../entities/reminder.entity';
import { sendEmail } from '../utils/email';
import { startOfDay, endOfDay, subDays } from 'date-fns';

cron.schedule('0 8 * * *', async () => {
    console.log('Running Daily Summary Email Job...');
    await sendDailySummaryEmails();
});

const sendDailySummaryEmails = async () => {
    const companyRepo = AppDataSource.getRepository(Company);
    const communicationRepo = AppDataSource.getRepository(CommunicationLog);
    const reminderRepo = AppDataSource.getRepository(Reminder);

    const yesterday = subDays(new Date(), 1);
    const start = startOfDay(yesterday);
    const end = endOfDay(yesterday);

    const companies = await companyRepo.find({
        relations: ['employees', 'leads', 'payments'],
    });

    for (const company of companies) {
        const admins = company.employees.filter(emp => emp.role === 'admin');
        if (!admins.length) continue;

        const leads = company.leads.filter(lead => lead.createdAt >= start && lead.createdAt <= end);
        const payments = company.payments.filter(p => p.createdAt >= start && p.createdAt <= end);
        const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

        const [communications, reminders] = await Promise.all([
            communicationRepo.find({
                where: {
                    createdBy: { company: { id: company.id } },
                    createdAt: Between(start, end),
                },
            }),
            reminderRepo.find({
                where: {
                    createdBy: { company: { id: company.id } },
                    createdAt: Between(start, end),
                },
            }),
        ]);

        const html = `
            <div style="font-family: sans-serif; padding: 16px;">
                <h2>Daily Summary for <strong>${company.name}</strong></h2>
                <p><strong>Date:</strong> ${start.toDateString()}</p>
                <ul>
                    <li><strong>Leads Created:</strong> ${leads.length}</li>
                    <li><strong>Total Payments:</strong> ${payments.length}</li>
                    <li><strong>Payments Received:</strong> ₹${totalAmount.toLocaleString()}</li>
                    <li><strong>Communications Logged:</strong> ${communications.length}</li>
                    <li><strong>Reminders Created:</strong> ${reminders.length}</li>
                </ul>
                <hr />
                <p style="font-size: 12px; color: #777;">
                    This is an automated email sent on ${new Date().toLocaleString()}.
                </p>
            </div>
        `;

        for (const admin of admins) {
            try {
                await sendEmail(
                    admin.email,
                    `Daily Summary - ${company.name} (${start.toDateString()})`,
                    `Your daily activity summary`,
                    html
                );
            } catch (err) {
                console.error(`Failed to send email to ${admin.email}`, err);
            }
        }

        console.log(`Summary sent to ${admins.length} admin(s) of ${company.name}`);
    }
};
