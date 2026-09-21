import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import reactCompiler from 'babel-plugin-react-compiler'

// https://vite.dev/config/
export default defineConfig({
  base: '/repo-name/', // <--- Yahan apni GitHub repo ka naam likhein (jaise '/student-portal/')
  plugins: [
    react(),
    babel({ 
      plugins: [reactCompiler] 
    })
  ],
})