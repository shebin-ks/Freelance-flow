import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lead } from "./leads.entity";
import { User } from "./user.entity";
import { Company } from "./company.entity";


@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column({ nullable: true })
    note: string


    @ManyToOne(() => Lead, (lead) => lead.payments, { nullable: false, onDelete: "CASCADE" })
    lead: Lead

    @ManyToOne(() => Company, (company) => company.payments, { nullable: false })
    company: Company

    @ManyToOne(() => User, (user) => user.createdPayments, { nullable: false, onDelete: "CASCADE" })
    createdBy: User

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date


}