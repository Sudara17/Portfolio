import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import chatHandler from './api/chat.ts'

function chatDevPlugin(): Plugin {
  return {
    name: 'portfolio-chat-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path !== '/api/chat') {
          next()
          return
        }
        const env = loadEnv(server.config.mode, process.cwd(), '')
        if (!process.env.GROQ_API_KEY && env.GROQ_API_KEY) {
          process.env.GROQ_API_KEY = env.GROQ_API_KEY
        }
        void chatHandler(req, res).catch(() => {
          if (!res.headersSent) {
            res.statusCode = 503
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ message: "Sorry, I couldn't reach the AI assistant right now. You can still explore my projects below." }))
          }
        })
      })
    },
  }
}

function resolveBase() {
  const raw = process.env.BASE_PATH ?? '/'
  if (raw === '/' || raw === '') return '/'
  const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), chatDevPlugin()],
  base: resolveBase(),
})
