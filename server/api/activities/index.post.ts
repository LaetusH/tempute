import { query } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)

  const cats: any = await query(
    'SELECT id FROM categories WHERE id = ? AND user_id = ?',
    [body.category_id, user.id]
  )
  if (!cats[0]) {
    throw createError({ statusCode: 403, message: 'Invalid category' })
  }

  const result = await query(
    'INSERT INTO activities (name, category, user_id) VALUES (?, ?, ?)',
    [body.name, body.category_id, user.id]
  )

  return { id: result.insertId.toString() }
})
