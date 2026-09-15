import { Router } from 'express'
import { getHealth } from '../controllers/healthController.ts'

export const healthRouter = Router()

healthRouter.get('/', getHealth)
