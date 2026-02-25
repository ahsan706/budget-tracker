import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';

export default defineConfig({
  plugins: [
    // Pre-transform .js files with JSX so Vitest's SSR parser can handle them
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
          jsxImportSource: 'react'
        });
      }
    },
    react()
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    onConsoleLog(log, type) {
      // Suppress jsdom XHR errors from i18next trying to fetch locales in tests
      if (type === 'stderr' && log.includes('AggregateError')) return false;
    }
  }
});
