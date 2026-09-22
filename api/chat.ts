import type { IncomingMessage, ServerResponse } from 'node:http'
import { answerPortfolioQuestion, isRateLimited, UNAVAILABLE, type ChatBody } from '../server/portfolio-chat.ts'

const MAX_BODY = 50_000

function send(res: ServerResponse, status: number, body: ChatBody) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function clientIp(req: IncomingMessage) {
  const forwarded = req.headers['x-forwarded-for']
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return raw?.split(',')[0]?.trim() || req.socket.remoteAddress || 'local'
}

function readRaw(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer | string) => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
      size += buffer.length
      if (size > MAX_BODY) {
        reject(new Error('too-large'))
        req.destroy()
        return
      }
      chunks.push(buffer)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

async function readPayload(req: IncomingMessage) {
  const withBody = req as IncomingMessage & { body?: unknown }
  if (typeof withBody.body === 'string') return JSON.parse(withBody.body) as unknown
  if (withBody.body && typeof withBody.body === 'object') return withBody.body
  const raw = await readRaw(req)
  if (!raw) return {}
  return JSON.parse(raw) as unknown
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    send(res, 405, { message: UNAVAILABLE })
    return
  }

  if (isRateLimited(clientIp(req))) {
    send(res, 429, { message: UNAVAILABLE })
    return
  }

  try {
    const payload = await readPayload(req)
    const record = payload && typeof payload === 'object' ? payload : {}
    const message = 'message' in record ? record.message : undefined
    const conversation = 'conversation' in record ? record.conversation : undefined
    const projectId = 'projectId' in record ? record.projectId : undefined
    const result = await answerPortfolioQuestion({ message, conversation, projectId })
    send(res, result.status, result.body)
  } catch {
    send(res, 400, { message: 'Enter a message.' })
  }
}
