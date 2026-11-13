import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /Fashion-Man/, so asset URLs need this prefix.
  base: '/Fashion-Man/',
})
