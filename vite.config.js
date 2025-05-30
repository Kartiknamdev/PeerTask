import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 1600
  },
  server: {
    port: 5173,
    host: true,
    cors: {
      origin: ['http://localhost:3000', 'https://pba-swart.vercel.app'],
      credentials: true
    }
  },
  preview: {
    port: 5173
  },
  base: './',
  define: {
    'process.env': {}
  }
})