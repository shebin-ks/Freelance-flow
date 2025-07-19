import express from "express";
import { validateBody } from "../middlewares/body.validator.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { UserRole } from "../enums/user_role.enum";
import { createCommunicationController, getClientCommunication, getCompanyCommunications, getEmployeeCommunication } from "../controllers/communication.controller";
import { communicationSchema } from "../validations/communication.validation";


const router = express.Router()

router.route("/")
    .get(getCompanyCommunications)
router.route("/create")
    .post(authorizeRole([UserRole.ADMIN, UserRole.ASSISTANT]), validateBody(communicationSchema), createCommunicationController)



router.route("/:leadId")
    .get(getClientCommunication)

router.route("/employee/:userId")
    .get(getEmployeeCommunication)



export default router