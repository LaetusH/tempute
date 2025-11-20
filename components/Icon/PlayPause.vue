<template>
    <div class="flex gap-3 items-center">
        <div
            v-for="(icon, index) in activeIcons"
            :key="index"
            class="w-full h-full cursor-pointer hover:scale-110 transition"
        >
            <img :src="icon.path" :alt="icon.name" @click.stop="toggleRunning"/>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['updateRunning'])
const { activityId, running } = defineProps({
    activityId: Number,
    running: Boolean
})

const icons = [
    {name: 'play', path: '/icon-play.svg'},
    //{name: 'stop', path: '/icon-stop.svg'},
    {name: 'pause', path: '/icon-pause.svg'}
]

const activeIcons = ref([icons[0]])

watch (
    () => running,
    (newVal) => {
        activeIcons.value = newVal ? [icons[1]] : [icons[0]]
    },
    { immediate: true}
)

async function toggleRunning() {
    if (running) {
        emit('updateRunning')
        await $fetch(`/api/activities/${activityId}/stop`, { method: 'POST' })
    } else {
        emit('updateRunning')
        await $fetch(`/api/activities/${activityId}/start`, { method: 'POST' })
    }
}
</script>