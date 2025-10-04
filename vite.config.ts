import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    singleThread: true,
    exclude: [
      'node_modules',
      '**/__tests__/shared/**',
      '**/dto.ts',
      '**/factories/**',
      '**/mocks/**'
    ]
  },
});