import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar todos los warnings para hacer el build
        return;
      }
    }
  },
  define: {
    global: 'globalThis',
  }
})
