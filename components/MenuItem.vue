<script setup>
    defineProps({
        label: {type: String, required: true},
        icon: {type: String, required: true}
    })

    import {inject} from 'vue'
    const {_, updateCurrentPage} = inject('currentPage')
</script>
<template>
    <div class="menu-item" @click="updateCurrentPage(label)">
        <img :src="icon" alt="" class="menu-item-img"/>
        <span>{{label}}</span>
    </div>
</template>
<style scoped>
    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.1rem;
        padding: 0.5rem;
    }
    .menu-item-img {
        width: 40px;
        height: 40px;
    }
</style>