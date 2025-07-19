import { DataSource } from "typeorm";
import { Company } from "../entities/company.entity";
import { User } from "../entities/user.entity";
import { Lead } from "../entities/leads.entity";
import { Reminder } from "../entities/reminder.entity";
import { CommunicationLog } from "../entities/communication.entity";
import { Payment } from "../entities/payment.entity";

import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: [Company, User, Lead, Reminder, CommunicationLog, Payment]
})