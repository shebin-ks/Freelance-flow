import express from 'express'
import { getDashboardSummary } from '../controllers/dashboard.controller'


const router = express.Router()


router.route("/summary")
    .get(getDashboardSummary)


export default router