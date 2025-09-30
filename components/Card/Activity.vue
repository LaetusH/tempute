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
    <div class="relative min-w-[50%] bg-stone-300 h-20 rounded-lg flex flex-col justify-between">
        <div class="flex items-center justify-between px-3 pt-3 text-lg">
            <span class="font-bold leading-none">{{ name }}</span>
            <IconPlayPause :activityId="id" :running="running" @update-running="loadElapsed" class="w-[1em] h-[1em]"/>
        </div>
        <div class="flex items-center justify-between px-3 pb-3">
            <span class="text-sm leading-none">{{ category }}</span>
            <span class="text-sm leading-none">{{ time }}</span>
        </div>
    </div>
</template>