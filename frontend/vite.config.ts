import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Allow connections from outside the container
    port: 3000,       // Explicitly set the port
    watch: {
      usePolling: true, // Enable polling for file changes (useful in Docker)
    },
  },
})
