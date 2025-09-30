<script setup lang="ts">
import { useElapsedTime } from '~/composables/useElapsedTime'

const { id, name, category } = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: String,
    category: String,
})

const { time, running, loadElapsed } = useElapsedTime(id)
</script>
<template>
    <div class="relative flex min-w-[50%] bg-stone-300 h-20 rounded-lg">
        <span class="absolute top-2 left-3 text-lg">{{ name }}</span>
        <IconPlayPause :activityId="id" :running="running" @update-running="loadElapsed" class="absolute top-3 right-3"/>
        <span class="absolute bottom-3 left-3 text-sm">{{ category }}</span>
        <span class="absolute bottom-3 right-3 text-sm">{{ time }}</span>
    </div>
</template>