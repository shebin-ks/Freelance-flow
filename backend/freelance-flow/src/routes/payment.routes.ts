import express from 'express'
import { validateBody } from '../middlewares/body.validator.middleware'
import { authorizeRole } from '../middlewares/authorizeRole.middleware'
import { UserRole } from '../enums/user_role.enum'
import { addPayment, getCompanyPayments, getTotalEarnedPerLead } from '../controllers/payment.controller'
import { paymentSchema } from '../validations/payment.validation'


const router = express.Router()

router.route("/")
    .get(authorizeRole([UserRole.ADMIN]),getCompanyPayments)

router.route("/create")
    .post(authorizeRole([UserRole.ADMIN]), validateBody(paymentSchema), addPayment)

router.route("/leads")
    .get( getTotalEarnedPerLead)



export default router