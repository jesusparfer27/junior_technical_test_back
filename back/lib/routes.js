import { Router } from 'express'
import { getInfo, getInfoNav } from '../controllers/get.info.controller.js'

const router = Router()

router.get('/furniture', getInfo);
router.get('/furniture/nav', getInfoNav)

export default router