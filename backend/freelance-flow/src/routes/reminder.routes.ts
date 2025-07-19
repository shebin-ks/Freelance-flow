import express from 'express'
import { authenticate } from '../middlewares/authenticate.middleware'
import { authorizeRole } from '../middlewares/authorizeRole.middleware'
import { UserRole } from '../enums/user_role.enum'
import { validateBody } from '../middlewares/body.validator.middleware'
import { createReminder } from '../services/reminder.service'
import { createReminderController, getReminders, getUpcommingReminder, markAsDoneController } from '../controllers/reminder.controller'
import { reminderSchema } from '../validations/reminder.validation'

const router = express.Router()

router.route("/")
    .get(getReminders)

router.route("/upcomming")
    .get(getUpcommingReminder)



router.route("/create")
    .post(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), validateBody(reminderSchema), createReminderController)

router.route("/:reminderId/complete")
    .patch(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), markAsDoneController)




export default router