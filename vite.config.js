import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve('nested', 'index.html'),
        nested: resolve('nested', 'nested/signup.html'),
      },
    },
  },
})
