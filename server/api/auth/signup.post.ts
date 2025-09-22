import { query } from '~/server/utils/db'
import { hashPassword, signToken, setAuthCookie } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  // Check if user exists
  const existing: any = await query('SELECT id FROM users WHERE email = ?', [email])
  if (existing && existing.length > 0) {
    throw createError({ statusCode: 409, message: 'User already exists' })
  }

  const password_hash = await hashPassword(password)
  const result: any = await query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, password_hash])
  const userId = result.insertId.toString()

  // Sign a token and set cookie
  const token = signToken({ id: userId })
  setAuthCookie(event, token)

  return { id: userId, email }
})
