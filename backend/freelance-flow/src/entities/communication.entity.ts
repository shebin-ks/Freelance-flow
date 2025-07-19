import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lead } from "./leads.entity";
import { User } from "./user.entity";
import { ReminderType } from "../enums/reminder_type.enum";


@Entity()
export class CommunicationLog {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: ReminderType,
        default: ReminderType.EMAIL

    })
    communicationType: ReminderType


    @Column({ nullable: true })
    note: string

    @Column({ nullable: true })
    outcome: string

    @Column({ nullable: true })
    followUpNeeded: string

    @ManyToOne(() => Lead, (lead) => lead, { nullable: false ,onDelete:"CASCADE"})
    lead: Lead

    @ManyToOne(() => User, (user) => user.communicationLogs, { nullable: false ,onDelete:"CASCADE"})
    createdBy: User

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date




}