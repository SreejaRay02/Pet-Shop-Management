import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
<<<<<<< HEAD
})
=======
})
>>>>>>> b616a0504d1ae214d87395d239c8793ea4c3d0dd
