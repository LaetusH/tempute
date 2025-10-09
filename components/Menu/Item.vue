<script setup>
defineProps({
    label: {type: String, required: true},
    icon: {type: String, required: true}
})
</script>
<template>
    <div class="flex flex-col items-center gap-0.5 p-2">
        <img :src="icon" alt="" class="w-10 h-10"/>
        <span>{{label}}</span>
    </div>
</template>