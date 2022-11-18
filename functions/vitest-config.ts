import { defineConfig } from 'vitest/config'
import alias from '@rollup/plugin-alias'
import path from 'path'

export default defineConfig({
  plugins: [alias()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    setupFiles: ['src/helper/setupTest.ts'],
  },
})
