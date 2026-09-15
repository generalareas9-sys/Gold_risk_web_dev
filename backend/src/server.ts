import { createApp } from './app.ts'
import { config } from './config/env.ts'

const app = createApp()

const server = app.listen(config.port, () => {
  console.log(
    `[GoldRisk backend] API listening on http://localhost:${config.port} (${config.nodeEnv})`,
  )
})

/**
 * Graceful shutdown: stop accepting new connections, then exit once in-flight
 * requests have flushed. A hard timeout guards against hangs.
 */
function shutdown(signal: NodeJS.Signals): void {
  console.log(`[GoldRisk backend] Received ${signal}, shutting down…`)
  server.close((error?: Error) => {
    if (error) {
      console.error('[GoldRisk backend] Error during shutdown', error)
      process.exit(1)
    }
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
