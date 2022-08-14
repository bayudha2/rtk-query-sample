import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    chunkSplitPlugin({
      customSplitting: {
        'react-utils-vendor': [
          'react-lazy-load-image-component',
          'react-paginate',
          'react-redux',
          'react-toastify',
          '@reduxjs/toolkit',
        ],
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'validation-vendor': ['yup', 'formik'],
      },
      strategy: 'single-vendor',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/component': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    host: true,
    open: false,
  },
})
