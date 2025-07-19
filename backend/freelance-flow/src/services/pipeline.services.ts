import { AppDataSource } from "../config/data-source";
import { Lead } from "../entities/leads.entity";
import { User } from "../entities/user.entity";
import { LeadStatus } from "../enums/lead_status.enum";


export const fetchPipelineOverview = async (userId: number) => {
    const userRepo = AppDataSource.getRepository(User);
    const leadRepo = AppDataSource.getRepository(Lead);

    const user = await userRepo.findOne({
        where: { id: userId },
        relations: ["company", "company.leads"],
    });

    const leads = user.company.leads

    const overview = leads.reduce((acc, lead) => {
        const status = lead.status
        acc[status] = (acc[status] || 0) + 1
        return acc
    }, Object.values(LeadStatus).reduce((acc, status) => {
        acc[status] = 0;
        return acc;
    },{}))

    return {
        success: true,
        message: "Pipeline overview fetched successfully",
        overview,
    };




}