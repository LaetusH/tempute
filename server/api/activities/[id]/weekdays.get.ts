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
    let stops = await query(
        'SELECT stamp FROM stopTimestamps WHERE activity = ? ORDER BY stamp ASC',
        [activityId]
    )

    let total = [0, 0, 0, 0, 0, 0, 0]
    const now  = new Date()

    for (let i = 0; i < starts.length; i++) {
        const start = new Date(starts[i].stamp)
        const stop = i < stops.length ? new Date(stops[i].stamp) : now
        
        if (stop < start) continue

        let current = start
        while (current < stop) {
            const dayIndex = current.getDay()
            const nextMidnight = new Date(current)
            nextMidnight.setHours(24, 0, 0, 0)

            const segmentEnd = nextMidnight < stop ? nextMidnight : stop
            const hours = (segmentEnd.getTime() - current.getTime()) / (1000 * 60 * 60)
            total[dayIndex] += hours

            current = nextMidnight
        }
    }

    return { timePerWeekday: total, serverNow: now.toISOString() }
})