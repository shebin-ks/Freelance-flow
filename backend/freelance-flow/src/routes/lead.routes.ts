import express from 'express'
import { createLeadController, deleteLead, getAllLeads, getLeadProfile, getTopLeads, leadStatusChange, uploadLeadsFromExcel, } from '../controllers/lead.controller'
import { leadSchema, leadStatusSchema } from '../validations/lead.validation'
import { validateBody } from '../middlewares/body.validator.middleware'
import { authorizeRole } from '../middlewares/authorizeRole.middleware'
import { UserRole } from '../enums/user_role.enum'
import { validateSameCompany } from '../middlewares/same.company.middleware'
import { upload } from '../middlewares/upload.middleware'


const router = express.Router()


router.route("/")
    .get(getAllLeads)

router.route("/profile/:leadId")
    .get(validateSameCompany('lead', 'leadId'), getLeadProfile)
    .delete(authorizeRole([UserRole.ADMIN]), deleteLead)


router.route("/import")
    .post(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), upload.single('file'), uploadLeadsFromExcel);


router.route("/top-leads")
    .get(getTopLeads)

router.route("/create")
    .post(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), validateBody(leadSchema), createLeadController)

router.route("/change-status")
    .patch(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), validateBody(leadStatusSchema), leadStatusChange)


export default router