const http = require('http')
const fs = require('fs')
const path = require('path')
const { handler } = require('../frontend/netlify/functions/chat.cjs')

const PORT = Number(process.env.GUGU_LOCAL_PORT || 8889)
const ROOT_DIR = path.resolve(__dirname, '..')

const loadEnv = () => {
  const envPath = path.join(ROOT_DIR, '.env')
  if (!fs.existsSync(envPath)) return

  const envLines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)

  envLines.forEach((line) => {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) return

    const separatorIndex = trimmedLine.indexOf('=')
    if (separatorIndex === -1) return

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '')

    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  })
}

const readBody = (request) => new Promise((resolve, reject) => {
  let body = ''

  request.on('data', (chunk) => {
    body += chunk
  })

  request.on('end', () => resolve(body))
  request.on('error', reject)
})

loadEnv()

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      ok: true,
      service: 'Gugu local API',
      usage: 'POST JSON messages to /api/chat. Use the portfolio at http://localhost:3000.'
    }))
    return
  }

  if (request.method === 'GET' && request.url === '/api/chat') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      ok: true,
      service: 'Gugu chat endpoint',
      usage: 'Send a POST request with { "messages": [{ "role": "user", "content": "..." }] }.'
    }))
    return
  }

  if (request.url !== '/api/chat') {
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  try {
    const body = await readBody(request)
    const result = await handler({
      httpMethod: request.method,
      headers: request.headers,
      body
    })

    response.writeHead(result.statusCode || 200, result.headers || { 'Content-Type': 'application/json' })
    response.end(result.body || '')
  } catch (error) {
    console.error('Local Gugu server error:', error)
    response.writeHead(500, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'Local Gugu server failed.' }))
  }
})

server.listen(PORT, () => {
  console.log(`Gugu local API listening on http://localhost:${PORT}/api/chat`)
})
