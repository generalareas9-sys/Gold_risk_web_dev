import type { Request, Response } from 'express'

interface HealthResponseBody {
  success: true
  message: string
}

/**
 * GET /api/health — liveness probe. Returns a fixed envelope so that the
 * frontend and monitoring tooling can confirm the API is up without needing
 * any authenticated or database-dependent call.
 */
export function getHealth(_req: Request, res: Response<HealthResponseBody>): void {
  const body: HealthResponseBody = {
    success: true,
    message: 'GoldRisk API is running',
  }
  res.status(200).json(body)
}
