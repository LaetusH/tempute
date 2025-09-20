import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({statusCode: 401, message: 'Not logged in'})
  }
  return { id: user.id, email: user.email }
})
