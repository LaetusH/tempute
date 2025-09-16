import { query } from '~/server/utils/db'
import { verifyPassword, signToken, setAuthCookie } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  const rows: any = await query('SELECT id, password_hash FROM users WHERE email = ?', [email])
  const user = rows && rows[0]
  if (!user) throw createError({ statusCode: 401, message: 'Invalid credentials' })

  const ok = await verifyPassword(password, user.password_hash)
  if (!ok) throw createError({ statusCode: 401, message: 'Invalid credentials' })

  const token = signToken({ id: user.id })
  setAuthCookie(event, token)

  return { id: user.id, email }
})
