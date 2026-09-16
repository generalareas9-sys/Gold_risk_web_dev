import type { ErrorRequestHandler, Request, Response } from 'express'
import { HttpError } from '../utils/HttpError.ts'

interface MalformedJsonError {
  type: string
  status?: number
  message: string
}

interface ErrorResponseBody {
  success: false
  error: {
    message: string
    status: number
    errors?: Record<string, string>
  }
}

function isMalformedJsonError(err: unknown): err is MalformedJsonError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'type' in err &&
    (err as { type?: unknown }).type === 'entity.parse.failed'
  )
}

/**
 * Central error boundary. Every error — from thrown HttpErrors to body-parser
 * failures to unexpected crashes — passes through here and leaves as a
 * consistent JSON envelope. In production the internal detail of unexpected
 * errors is intentionally hidden from the client.
 */
export const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by Express' 4-arg signature
  _next,
) => {
  if (err instanceof HttpError) {
    const body: ErrorResponseBody = {
      success: false,
      error: {
        message: err.message,
        status: err.status,
        ...(err.errors !== undefined && { errors: err.errors }),
      },
    }
    res.status(err.status).json(body)
    return
  }

  if (isMalformedJsonError(err)) {
    const body: ErrorResponseBody = {
      success: false,
      error: {
        message: 'Request body is not valid JSON.',
        status: 400,
      },
    }
    res.status(400).json(body)
    return
  }

  console.error('[GoldRisk backend] Unexpected error', err)
  
  const body: ErrorResponseBody = {
    success: false,
    error: {
      message: 'An unexpected error occurred on the GoldRisk API.',
      status: 500,
    },
  }
  res.status(500).json(body)
}
