import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/proxy-api": {
        target: "https://crudapi.co.uk/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy-api/, ""),
      },
    },
  },
})
