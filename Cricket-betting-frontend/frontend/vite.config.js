import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/api/user': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
      '/api/bet': {
        target: 'http://localhost:5004',
        changeOrigin: true,
        secure: false,
      },
      '/api/match': {
        target: 'http://localhost:5003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
