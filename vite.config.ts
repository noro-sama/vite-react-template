import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { loginSchema } from './src/utils/validators'

function demoAuthApi(): Plugin {
  const middleware: Plugin['configureServer'] = (server) => {
    server.middlewares.use('/api/auth/login', (request, response, next) => {
      if (request.method !== 'POST' || request.url !== '/') {
        next()
        return
      }

      const chunks: Buffer[] = []
      request.on('data', (chunk: Buffer | string) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
      })
      request.on('error', (error: Error) => {
        console.error('Failed to read demo login request:', error)
        if (!response.headersSent) {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ message: 'Unable to read request body.' }))
        }
      })
      request.on('end', () => {
        let body: unknown
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
        } catch {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ message: 'Request body must be valid JSON.' }))
          return
        }

        const result = loginSchema.safeParse(body)
        if (!result.success) {
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json')
          response.end(
            JSON.stringify({
              message: result.error.issues[0]?.message ?? 'Invalid login details.',
            }),
          )
          return
        }

        const { email } = result.data
        const token = `demo-${crypto.randomUUID()}`
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json')
        response.setHeader(
          'Set-Cookie',
          `auth-token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`,
        )
        response.end(
          JSON.stringify({
            token,
            user: { id: email, email, name: email.split('@')[0] },
          }),
        )
      })
    })
  }

  return {
    name: 'launchpad-demo-auth',
    configureServer: middleware,
    configurePreviewServer(server) {
      server.middlewares.use('/api/auth/login', (request, response, next) => {
        if (request.method !== 'POST' || request.url !== '/') {
          next()
          return
        }

        const chunks: Buffer[] = []
        request.on('data', (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        })
        request.on('error', (error: Error) => {
          console.error('Failed to read demo login request:', error)
          if (!response.headersSent) {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ message: 'Unable to read request body.' }))
          }
        })
        request.on('end', () => {
          let body: unknown
          try {
            body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          } catch {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ message: 'Request body must be valid JSON.' }))
            return
          }

          const result = loginSchema.safeParse(body)
          if (!result.success) {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(
              JSON.stringify({
                message: result.error.issues[0]?.message ?? 'Invalid login details.',
              }),
            )
            return
          }

          const { email } = result.data
          const token = `demo-${crypto.randomUUID()}`
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json')
          response.setHeader(
            'Set-Cookie',
            `auth-token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`,
          )
          response.end(
            JSON.stringify({
              token,
              user: { id: email, email, name: email.split('@')[0] },
            }),
          )
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), demoAuthApi()],
})
