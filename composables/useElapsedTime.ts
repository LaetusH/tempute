import { ref } from 'vue'

export function useElapsedTime(activityId: number) {
    const time = ref('00:00')
    const running = ref(false)
    const lastStartDate = ref('')
    const lastStopDate = ref('')

    let baseElapsed = 0
    let lastStart: number | null = null
    let clockOffset = 0
    let interval: ReturnType<typeof setInterval> | null = null

    function format(ms: number) {
        const totalSec = Math.floor(ms / 1000)
        const h = Math.floor(totalSec / 3600)
        const m = Math.floor((totalSec % 3600) / 60)
        const s = totalSec % 60
        return h > 0
            ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
            : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    function formatTimestamp(ms: number): string {
        const date = new Date(ms)

        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0') // months are 0-based
        const year = date.getFullYear()

        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        return `${day}.${month}.${year}, ${hours}:${minutes} Uhr`
    }

    async function loadElapsed() {
        const res = await $fetch<{ elapsedMs: number, running: boolean, lastStart?: string, lastStop?: string, serverNow: string }>(`/api/activities/${activityId}/elapsed`)

        const serverNow = new Date(res.serverNow).getTime()
        const clientNow = Date.now()
        clockOffset = clientNow - serverNow

        baseElapsed = res.elapsedMs
        running.value = res.running
        lastStart = res.lastStart ? new Date(res.lastStart).getTime() + clockOffset : null

        lastStartDate.value = res.lastStart ? formatTimestamp(new Date(res.lastStart).getTime() + clockOffset) : ''
        lastStopDate.value = res.lastStop ? formatTimestamp(new Date(res.lastStop).getTime() + clockOffset) : ''

        updateDisplay()
    }

    function updateDisplay() {
        let elapsed = baseElapsed
        if (running.value && lastStart) {
            elapsed += Date.now() - lastStart
        }
        time.value = format(elapsed)
    }

    onMounted(() => {
        loadElapsed()
        interval = setInterval(updateDisplay, 1000)
    })

    onUnmounted(() => {
        if (interval) clearInterval(interval)
    })

    return {
        time,
        running,
        lastStartDate,
        lastStopDate,
        loadElapsed
    }
}