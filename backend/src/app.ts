import cors from 'cors'
import express from 'express'
import { config } from './config/env.ts'
import { pool } from './db/pool.ts'
import { PostgresTokenStore, type TokenStore } from './db/tokenStore.ts'
import { PostgresUserRepository, type UserRepository } from './db/usersRepository.ts'
import {
  PostgresAccountsRepository,
  type AccountRepository,
} from './db/accountsRepository.ts'
import {
  PostgresSpecificationsRepository,
  type SpecificationRepository,
} from './db/specificationsRepository.ts'
import {
  PostgresCalculationsRepository,
  type CalculationRepository,
} from './db/calculationsRepository.ts'
import { errorHandler } from './middleware/errorHandler.ts'
import { notFoundHandler } from './middleware/notFoundHandler.ts'
import { createApiRouter } from './routes/index.ts'

export interface AppDependencies {
  userRepository?: UserRepository
  tokenStore?: TokenStore
  accountsRepository?: AccountRepository
  specificationsRepository?: SpecificationRepository
  calculationsRepository?: CalculationRepository
}

/**
 * Builds and returns the Express app without binding a port. This keeps the
 * app trivially importable and testable (e.g. with supertest) while
 * `server.ts` owns the actual listener lifecycle.
 *
 * Dependencies default to PostgreSQL-backed implementations; tests inject
 * in-memory stand-ins.
 */
export function createApp(dependencies: AppDependencies = {}) {
  const app = express()
  const userRepository = dependencies.userRepository ?? new PostgresUserRepository(pool)
  const tokenStore = dependencies.tokenStore ?? new PostgresTokenStore(pool)
  const accountsRepository =
    dependencies.accountsRepository ?? new PostgresAccountsRepository(pool)
  const specificationsRepository =
    dependencies.specificationsRepository ?? new PostgresSpecificationsRepository(pool)
  const calculationsRepository =
    dependencies.calculationsRepository ?? new PostgresCalculationsRepository(pool)

  app.disable('x-powered-by')

  app.use(
    cors({
      origin(origin, callback) {
        if (origin === undefined || config.corsOrigins.includes(origin)) {
          callback(null, true)
          return
        }
        callback(new Error(`Origin "${origin}" is not allowed by the GoldRisk API.`))
      },
    }),
  )
  app.use(express.json())

  app.use(
    '/api',
    createApiRouter(
      userRepository,
      tokenStore,
      accountsRepository,
      specificationsRepository,
      calculationsRepository,
    ),
  )

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
