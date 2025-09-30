import { query } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const user = await getCurrentUser(event)
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const { id } = event.context.params!
    const activityId = Number(id)
    if (isNaN(activityId)) throw createError({ statusCode: 400, message: 'Invalid activity ID' })

    const starts = await query(
        'SELECT stamp FROM startTimestamps WHERE activity = ? ORDER BY stamp ASC',
        [activityId]
    )
    const stops = await query(
        'SELECT stamp FROM stopTimestamps WHERE activity = ? ORDER BY stamp ASC',
        [activityId]
    )

    let total = 0
    const length = Math.min(starts.length, stops.length)

    for (let i = 0; i < length; i++) {
        total += new Date(stops[i].stamp).getTime() - new Date(starts[i].stamp).getTime()
    }

    let running = false
    let lastStart: string | null = null
    let lastStop: string | null = null

    if (starts.length > stops.length) {
        running = true
        lastStart = starts[starts.length - 1].stamp
    } else if (stops.length > 0) {
        lastStop = stops[stops.length - 1].stamp
    }

    return { elapsedMs: total, running, lastStart, lastStop, serverNow: new Date().toISOString() }
})