import { query } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const user = await getCurrentUser(event)
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const { id } = event.context.params!
    const activityId = Number(id)
    if (isNaN(activityId)) throw createError({ statusCode: 400, message: 'Invalid activity ID' })

    const result = await query(
        'INSERT INTO startTimestamps (activity) VALUES (?)',
        [activityId]
    )

    return { id: result.insertId.toString(), stamp: new Date().toISOString() }
})