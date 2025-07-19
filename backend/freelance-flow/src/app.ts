import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler.middleware";
import authRoute from './routes/auth.routes'
import leadRoute from './routes/lead.routes'
import reminderRoute from './routes/reminder.routes'
import communicationRoute from './routes/communication.routes'
import paymentRoute from './routes/payment.routes'
import userRoute from './routes/user.routes'
import pipelineRoute from './routes/pipeline.routes'
import dashboardRoute from './routes/dashboard.routes'
import { authenticate } from "./middlewares/authenticate.middleware";
import cors from 'cors';

import './cron/cronReminderSender'
import './cron/cronDailySummary'

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", authenticate, userRoute)
app.use("/api/v1/pipeline", authenticate, pipelineRoute)
app.use("/api/v1/dashboard", authenticate, dashboardRoute)
app.use("/api/v1/lead", authenticate, leadRoute)
app.use("/api/v1/reminder", authenticate, reminderRoute)
app.use("/api/v1/communication", authenticate, communicationRoute)
app.use("/api/v1/payment", authenticate, paymentRoute)

app.use(errorHandler)


export default app