import { query } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const rows: any = await query('SELECT a.id, a.name, c.name AS category FROM activities a LEFT OUTER JOIN categories c ON a.category = c.id WHERE a.user_id = ? ORDER BY a.created_at DESC', [user.id])
  return rows
})
