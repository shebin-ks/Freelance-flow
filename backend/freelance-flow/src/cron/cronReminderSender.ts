import cron from 'node-cron';
import { Reminder } from '../entities/reminder.entity';
import { AppDataSource } from '../config/data-source';
import { LessThanOrEqual } from 'typeorm';
import { sendEmail } from '../utils/email';




cron.schedule('0 */2 * * *', async () => {
    console.log('Checking for reminders scheduled 12 hours from now...');

    const reminderRepo = AppDataSource.getRepository(Reminder);
    const now = new Date();

    const endTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // now + 12 hours

    const remindersToNotify = await reminderRepo.find({
        where: {
            reminderAt: LessThanOrEqual(endTime),
            isCompleted: false,
            emailSend: false,
        },
        relations: ['createdBy'],
    });

    for (const reminder of remindersToNotify) {
        await sendReminderEmail(reminder);
    }
});

const sendReminderEmail = async (reminder: Reminder) => {
    try {
        const subject = `Reminder: ${reminder.note} is coming up in 12 hours`;

        const textMessage = `
Hello ${reminder.createdBy.name},

We wanted to remind you that you have an upcoming task/note scheduled for:

"${reminder.note}"

Scheduled time: ${reminder.reminderAt.toLocaleString()}

Please make sure to take the necessary steps to complete this on time.

If you have any questions or need assistance, feel free to reach out.

Best regards,
The Freelance Flow Team
        `;

        const htmlMessage = `
<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <p>Hi ${reminder.createdBy.name},</p>
    <p>This is a friendly reminder that the following task/note is scheduled to happen in about 12 hours:</p>
   
    <p><strong>Scheduled for:</strong> ${reminder.reminderAt.toLocaleString()}</p>
    <p>Please take the necessary action to complete this task on time.</p>
    <br />
    <p>Best regards,<br /><strong>The Freelance Flow Team</strong></p>
</div>
        `;

        await sendEmail(
            reminder.createdBy.email,
            subject,
            textMessage,
            htmlMessage
        );

        const reminderRepo = AppDataSource.getRepository(Reminder);
        reminder.emailSend = true;
        await reminderRepo.save(reminder);

        console.log(`Reminder email sent for reminder ID: ${reminder.id}`);
    } catch (error) {
        console.error('Failed to send reminder email:', error);
    }
};
