import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Reminder } from "./reminder.entity";
import { CommunicationLog } from "./communication.entity";
import { Payment } from "./payment.entity";
import { UserRole } from "../enums/user_role.enum";
import { UserStatus } from "../enums/user_status.enum";
import { Lead } from "./leads.entity";






@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    phone: number

    @Column({ type: "enum", enum: UserRole, default: UserRole.VIEWER })
    role: UserRole

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.PENDING
    })
    status: UserStatus


    @ManyToOne(() => Company, (company) => company.employees, { nullable: false,onDelete:'CASCADE' })
    company: Company

    @OneToMany(() => Reminder, (reminder) => reminder.createdBy)
    createdReminders: Reminder[]

    @OneToMany(() => CommunicationLog, (communicationLog) => communicationLog.lead)
    communicationLogs: CommunicationLog[]


    @OneToMany(() => Payment, (payment) => payment.company)
    createdPayments: Payment[]

    @OneToMany(() => Lead, (lead) => lead.createdBy)
    createdLeads: Lead[]




}