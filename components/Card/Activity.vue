<script setup lang="ts">
import { ref } from 'vue'

const { id, name, category } = defineProps({
    id: Number,
    name: String,
    category: String,
})

const time = ref('00:00')
const running = ref(false)

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

async function loadElapsed() {
    const res = await $fetch<{ elapsedMs: number, running: boolean, lastStart?: string, serverNow: string }>(`/api/activities/${id}/elapsed`)

    const serverNow = new Date(res.serverNow).getTime()
    const clientNow = Date.now()
    clockOffset = clientNow - serverNow

    baseElapsed = res.elapsedMs
    running.value = res.running
    lastStart = res.lastStart ? new Date(res.lastStart).getTime() + clockOffset : null

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
</script>
<template>
    <div class="relative flex min-w-[50%] bg-stone-300 h-20 rounded-lg">
        <span class="absolute top-2 left-3 text-lg">{{ name }}</span>
        <IconPlayPause :activityId="id" :running="running" @update-running="loadElapsed" class="absolute top-3 right-3"/>
        <span class="absolute bottom-3 left-3 text-sm">{{ category }}</span>
        <span class="absolute bottom-3 right-3 text-sm">{{ time }}</span>
    </div>
</template>