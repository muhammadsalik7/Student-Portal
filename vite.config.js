import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import reactCompiler from 'babel-plugin-react-compiler'

// https://vite.dev/config/
export default defineConfig({
  base: '/Student-Portal-/',
  plugins: [
    react(),
    babel({ 
      plugins: [reactCompiler] 
    })
  ],
})