import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Reminder } from "./reminder.entity";
import { CommunicationLog } from "./communication.entity";
import { Payment } from "./payment.entity";
import { LeadStatus } from "../enums/lead_status.enum";
import { User } from "./user.entity";




@Entity()
export class Lead {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    leadCompanyName: string

    @Column()
    purpose: string

    @Column({
        type: "enum",
        enum: LeadStatus,
        default: LeadStatus.INQUIRY
    })
    status: LeadStatus

    @ManyToOne(() => Company, (company) => company, { nullable: false,onDelete:"CASCADE" })
    company: Company

    @ManyToOne(() => User, (user) => user.createdLeads, { onDelete: 'SET NULL' })
    createdBy: User

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date


    @OneToMany(() => Reminder, (reminder) => reminder.lead)
    reminders: Reminder[]


    @OneToMany(() => CommunicationLog, (communicationLog) => communicationLog.lead)
    communicationLogs: CommunicationLog[]

    @OneToMany(() => Payment, (payment) => payment.lead)
    payments: Payment[]
}