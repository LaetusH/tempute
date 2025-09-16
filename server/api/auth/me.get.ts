import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) return null
  // return minimal user info
  return { id: user.id, email: user.email }
})
