import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '../utils/HttpError.ts'

/**
 * Catch-all for any request that matched no route. It is registered after
 * every route so all unmatched paths end herehareas. Delegates to Express as a
 * 404 HttpError — the central error boundary decides how it is rendered.
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, `Route ${req.method} ${req.path} was not found.`))
}
