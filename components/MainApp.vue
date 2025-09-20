<script setup lang="ts">
    import {provide, ref} from 'vue'

    const currentPage = ref('Home')
    function updateCurrentPage(newPage: string) {
        currentPage.value = newPage
    }
    provide('currentPage', {currentPage, updateCurrentPage})
</script>
<template>
    <div class="flex flex-col min-h-full">
        <span class="page-content">
            <ScreenHome v-if="currentPage==='Home'"/>
            <ScreenStatistics v-if="currentPage==='Statistics'"/>
            <ScreenSettings v-if="currentPage==='Settings'"/>
        </span>
        <div class="pb-[25%]"></div>
        <Footer />
    </div>
</template>