/** Error subclass carrying an HTTP status code, used by controllers/routes. */

export class HttpError extends Error {
  readonly status: number

  /**
   * Optional field-level validation errors keyed by field name. When present
   * the error handler renders them under `error.errors`.
   */
  readonly errors?: Record<string, string>

  constructor(status: number, message: string, errors?: Record<string, string>) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.errors = errors
  }
}
