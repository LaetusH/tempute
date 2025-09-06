<script setup lang="ts">
    import {provide, ref} from 'vue'

    const currentPage = ref('Home')
    function updateCurrentPage(newPage: string) {
        currentPage.value = newPage
    }
    provide('currentPage', {currentPage, updateCurrentPage})
</script>
<template>
    <ScreenHome v-if="currentPage==='Home'"/>
    <ScreenStatistics v-if="currentPage==='Statistics'"/>
    <ScreenSettings v-if="currentPage==='Settings'"/>
    <Footer/>
</template>