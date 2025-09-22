<script setup>
defineProps({
    id: Number,
    name: String,
    category: String,
    time: String,
    isRunning: Boolean
})
</script>
<template>
    <div class="relative flex min-w-[50%] bg-stone-300 h-20 rounded-lg">
        <span class="absolute top-2 left-3 text-lg">{{ name }}</span>
        <IconPlayPause :activityId="id" class="absolute top-3 right-3"/>
        <span class="absolute bottom-3 left-3 text-sm">{{ category }}</span>
        <span class="absolute bottom-3 right-3 text-sm">{{ time }}</span>
    </div>
</template>