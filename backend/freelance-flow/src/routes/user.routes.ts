import express from 'express'
import { authorizeRole } from '../middlewares/authorizeRole.middleware'
import { UserRole } from '../enums/user_role.enum'
import { deleteUser, getCompanyUsers, getMyProfile, getUserProfile, userStatusChange } from '../controllers/user.controller'
import { validateSameCompany } from '../middlewares/same.company.middleware'
import { userStatusSchema } from '../validations/user.validation'
import { validateBody } from '../middlewares/body.validator.middleware'


const router = express.Router()


router.route("/")
    .get(getCompanyUsers)

router.route("/profile/me")
    .get(getMyProfile)




router.route("/profile/:userId")
    .get(authorizeRole([UserRole.ADMIN, UserRole.VIEWER]), validateSameCompany('user', 'userId'), getUserProfile)
    .delete(authorizeRole([UserRole.ADMIN]), deleteUser)


router.route("/change-status")
    .patch(authorizeRole([UserRole.ADMIN]), validateBody(userStatusSchema), userStatusChange)

export default router