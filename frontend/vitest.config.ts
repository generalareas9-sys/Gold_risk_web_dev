import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    env: {
      TZ: 'UTC',
      VITE_API_BASE_URL: 'http://test.api.invalid',
    },
  },
})