import express from 'express'
import { getPipelineOverview } from '../controllers/pipeline.controller'


const router = express.Router()


router.route("/overview")
    .get(getPipelineOverview)


export default router