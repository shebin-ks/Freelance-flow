import { NextFunction, Request, Response } from 'express';
import { ApiError } from './error.handler.middleware';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { Lead } from '../entities/leads.entity';


export type EntityType = 'user' | 'lead';

const entityMap = {
    user: User,
    lead: Lead,

};


export const validateSameCompany = (entity: EntityType, idParam: string) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userRepo = AppDataSource.getRepository(User);
        const EntityClass = entityMap[entity];
        const targetRepo = AppDataSource.getRepository(EntityClass);


        const adminUserId = (req as any).user.id;
        const targetId = parseInt(req.params[idParam]);


        const adminUser = await userRepo.findOne({
            where: { id: adminUserId },
            relations: ['company']
        });

        if (!adminUser) {
            throw new ApiError("Admin user not found", 404);
        }

        const targetEntity: any = await targetRepo.findOne({
            where: { id: targetId },
            relations: ['company',],
        });

        if (!targetEntity) {
            throw new ApiError(`${entity} not found`, 404);
        }



        if (targetEntity.company.id !== adminUser.company.id) {
            throw new ApiError(`Unauthorized: ${entity} does not belong to your company`, 403);
        }

        next();


    } catch (error) {
        next(error)
    }
}
