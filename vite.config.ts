import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig, loadEnv } from 'vite';
import { configDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [
    !process.env.VITEST &&
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@context': path.resolve(__dirname, './src/context'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    environment: 'jsdom',
    env: loadEnv('test', process.cwd(), ''),
    globals: true,
    setupFiles: 'setupTest.ts',
    exclude: [
      ...configDefaults.exclude,
      '**/mocks/**',
      '.eslintrc.cjs',
      'tailwind.config.ts',
      'postcss.config.js',
      '**/build/**',
    ],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/mocks/**',
        '.eslintrc.cjs',
        'tailwind.config.ts',
        'postcss.config.js',
        '**/build/**',
      ],
    },
  },
});
