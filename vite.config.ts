
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-development-entry',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          const pathname = request.url?.split('?')[0]
          if (request.headers.accept?.includes('text/html') && (pathname === '/' || pathname === '/atlas')) {
            const query = request.url?.includes('?') ? request.url.slice(request.url.indexOf('?')) : ''
            request.url = `/index.dev.html${query}`
          }
          next()
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      input: 'index.dev.html',
    },
  },
})
