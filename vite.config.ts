import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // public/ contiene referencias internas. Los recursos publicables se importan desde src/assets.
  publicDir: command === 'serve' ? 'public' : false,
  plugins: [react(), tailwindcss()],
}))
