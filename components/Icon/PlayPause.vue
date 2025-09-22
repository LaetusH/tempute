<template>
    <div class="flex gap-3 items-center">
        <div
            v-for="(icon, index) in activeIcons"
            :key="index"
            class="w-5 h-5 cursor-pointer hover:scale-110 transition"
        >
            <img :src="icon.path" :alt="icon.name" class="w-full h-full" @click="toggleRunning(icon.name)"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const { activityId } = defineProps({activityId: Number});

const icons = [
    {name: 'play', path: '/icons/icon-play.svg'},
    //{name: 'stop', path: '/icons/icon-stop.svg'},
    {name: 'pause', path: '/icons/icon-pause.svg'}
];
const running = ref(false);
const activeIcons = ref([icons[0]]);

async function toggleRunning(toggling) {
    if (running.value) {
        await $fetch(`/api/activities/${activityId}/stop`, { method: 'POST' });
        activeIcons.value = [icons[0]];
        running.value = false;
    } else {
        await $fetch(`/api/activities/${activityId}/start`, { method: 'POST' });
        activeIcons.value = icons[2] === undefined ? [icons[1]]: [icons[1], icons[2]];
        running.value = true;
    }
}
</script>