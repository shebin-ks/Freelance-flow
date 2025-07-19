import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Lead } from "./leads.entity";
import { Payment } from "./payment.entity";



@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @OneToMany(() => User, (user) => user.company)
    employees: User[]

    @OneToMany(() => Lead, (lead) => lead.company )
    leads: Lead[]

    @OneToMany(()=>Payment,(payment)=>payment.company)
    payments: Payment[]


}