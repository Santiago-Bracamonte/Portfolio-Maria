import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { Resend } from 'resend'

function parseJsonBody(req: NodeJS.ReadableStream): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        const parsed = JSON.parse(body) as Record<string, unknown>
        resolve(parsed)
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function resendContactPlugin() {
  const handler = async (req: any, res: any, next: () => void) => {
    if (req.url !== '/api/contact') {
      next()
      return
    }

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    try {
      const apiKey = process.env.RESEND_API_KEY
      const toEmail = process.env.CONTACT_TO_EMAIL
      const fromEmail = process.env.CONTACT_FROM_EMAIL

      if (!apiKey || !toEmail || !fromEmail) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          error: 'Missing environment variables: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL',
        }))
        return
      }

      const payload = await parseJsonBody(req)
      const name = String(payload.name ?? '').trim()
      const email = String(payload.email ?? '').trim()
      const message = String(payload.message ?? '').trim()

      if (!name || !email || !message) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Missing required fields' }))
        return
      }

      const resend = new Resend(apiKey)
      const subject = `Nuevo mensaje portfolio - ${name}`
      const text = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`

      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject,
        text,
        html: `<div><p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p></div>`,
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Send failed' }))
    }
  }

  return {
    name: 'resend-contact-api',
    configureServer(server: any) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(handler)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), resendContactPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
