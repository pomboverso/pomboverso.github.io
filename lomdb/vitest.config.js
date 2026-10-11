import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: '.',
  test: {
    reporters: ['default', 'html'],
    include: ['**/*.test.js'],
    outputFile: {
      html: './vitest/index.html',
    },
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
})
