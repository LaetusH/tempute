import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from './db'
import { getCookie, setCookie, deleteCookie } from 'h3'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN || 3600) // seconds
const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token'
const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE || JWT_EXPIRES_IN)

export async function hashPassword(password: string) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (err) {
    return null
  }
}

export async function getCurrentUser(event: H3Event) {
  const token = getCookie(event, COOKIE_NAME) as string | undefined
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload || !payload.id) return null

  // Optionally fetch fresh user from DB (to check still exists / not deleted)
  const rows: any = await query('SELECT id, email FROM users WHERE id = ?', [payload.id])
  if (!rows || rows.length === 0) return null
  return rows[0]
}

export function setAuthCookie(event: H3Event, token: string) {
  // In dev, secure should be false; in production (https) set secure:true
  const isProd = process.env.NODE_ENV === 'production'
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: COOKIE_MAX_AGE
  })
}

export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}
