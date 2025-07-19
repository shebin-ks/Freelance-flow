import express from "express";
import { acceptInvite, forgotPassword, loginUser, refreshToken, registerUser, resetPassword, sendInvite } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/body.validator.middleware";
import { passwordResetSchema, inviteSchema, loginSchema, registerSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/authenticate.middleware";


const router = express.Router()

router.route("/register")
    .post(validateBody(registerSchema), registerUser)

router.route("/login")
    .post(validateBody(loginSchema), loginUser)

router.route("/refresh-token")
    .post(refreshToken)

router.route("/send-invite")
    .post(authenticate, validateBody(inviteSchema), sendInvite)

router.route("/accept-invite")
    .post(validateBody(passwordResetSchema), acceptInvite)


router.route('/forgot-password')
    .post(forgotPassword)

router.route('/reset-password')
    .post(validateBody(passwordResetSchema), resetPassword)


export default router