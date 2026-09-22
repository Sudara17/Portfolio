import { closeSync, existsSync, openSync, readSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const resumeVirtualId = 'virtual:resume-available'
const resolvedResumeId = `\0${resumeVirtualId}`

function resumeFileReady() {
  const pdfPath = resolve(process.cwd(), 'public/resume.pdf')
  if (!existsSync(pdfPath)) return false
  try {
    const file = openSync(pdfPath, 'r')
    const buffer = Buffer.alloc(5)
    readSync(file, buffer, 0, 5, 0)
    closeSync(file)
    return buffer.toString('utf8').startsWith('%PDF')
  } catch {
    return false
  }
}

function resumeAvailabilityPlugin(): Plugin {
  return {
    name: 'resume-availability',
    resolveId(id) {
      if (id === resumeVirtualId) return resolvedResumeId
    },
    load(id) {
      if (id !== resolvedResumeId) return
      return `export const resumeIsAvailable = ${resumeFileReady()}`
    },
    configureServer(server) {
      const reload = (changed: string) => {
        if (!changed.endsWith(`${resolve('public')}/resume.pdf`) && !changed.endsWith('public/resume.pdf')) {
          return
        }
        const module = server.moduleGraph.getModuleById(resolvedResumeId)
        if (!module) return
        server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', reload)
      server.watcher.on('change', reload)
      server.watcher.on('unlink', reload)
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
  plugins: [react(), resumeAvailabilityPlugin()],
  base: resolveBase(),
})
