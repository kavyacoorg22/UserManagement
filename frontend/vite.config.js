import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    proxy:{
       '/user': {
      target: 'http://localhost:3032',
      changeOrigin: true,
      secure: false,
    },
    '/admin':{
      target: 'http://localhost:3032',
      changeOrigin: true,
      secure: false,
    }
    }
  }
})
