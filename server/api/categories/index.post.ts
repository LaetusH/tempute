import { query } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)

  const result = await query(
    'INSERT INTO categories (name, user_id) VALUES (?, ?)',
    [body.name, user.id]
  )

  return { id: result.insertId.toString(), name: body.name }
})
