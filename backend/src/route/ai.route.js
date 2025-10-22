import express from 'express'
import {getreview} from '../controller/ai.controller.js'
const router = express.Router()

router.post('/getreview', getreview)

export default router