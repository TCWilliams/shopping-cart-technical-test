import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // silence console.error for localStorage in tests
    onConsoleLog(log, type) {
      if (
        type === 'stderr' &&
        /Failed to (save|restore) cart from localStorage/.test(log)
      ) {
        return false // suppress
      }
      return true
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
