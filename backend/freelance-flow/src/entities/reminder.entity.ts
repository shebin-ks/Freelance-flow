import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lead } from "./leads.entity";
import { User } from "./user.entity";
import { ReminderType } from "../enums/reminder_type.enum";




@Entity()
export class Reminder {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: ReminderType,
        default: ReminderType.EMAIL
    })
    reminderType: ReminderType


    @Column({ type: 'timestamptz' })
    reminderAt: Date

    @Column()
    note: String

    @Column({ default: false })
    isCompleted: boolean

    @Column({default:false})
    emailSend:boolean


    @ManyToOne(() => Lead, (lead) => lead, { nullable: false, onDelete: "CASCADE" })
    lead: Lead

    @ManyToOne(() => User, (user) => user.createdReminders, { nullable: false, onDelete: "CASCADE" })
    createdBy: User

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date




}