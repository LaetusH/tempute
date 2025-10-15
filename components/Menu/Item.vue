<script setup>
defineProps({
    label: {type: String, required: true},
    icon: {type: String, required: true}
})
</script>
<template>
    <div class="flex flex-col items-center gap-0.5 p-2">
        <img :src="icon" alt="" class="w-full h-full"/>
        <span>{{label}}</span>
    </div>
</template>