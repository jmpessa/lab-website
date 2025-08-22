// site/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lab-website/',   // 👈 important for GitHub Pages project site
  server: {
    port: 5173,            // default dev port (optional)
    open: true             // auto-open browser when running `npm run dev`
  },
  build: {
    outDir: 'dist',        // output folder (default for Vite)
    sourcemap: true        // helps debug if site is blank
  }
})