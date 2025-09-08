<script setup>
defineProps(['name', 'category', 'time', 'isRunning'])
</script>
<template>
    <div class="relative flex min-w-[50%] bg-stone-300 h-20">
        <span class="absolute top-3 left-3 text-lg">{{ name }}</span>
        <span class="absolute bottom-3 left-3 text-sm">{{ category }}</span>
        <span class="absolute bottom-3 right-3 text-sm">{{ time }}</span>
    </div>
</template>