<script setup lang="ts">
    import {provide, ref} from 'vue'

    const currentPage = ref('Home')
    function updateCurrentPage(newPage: string) {
        currentPage.value = newPage
    }
    provide('currentPage', {currentPage, updateCurrentPage})
</script>
<template>
    <div class="page-layout">
        <span class="page-content">
            <ScreenHome v-if="currentPage==='Home'"/>
            <ScreenStatistics v-if="currentPage==='Statistics'"/>
            <ScreenSettings v-if="currentPage==='Settings'"/>
        </span>
        <div class="spacer"></div>
        <Footer />
    </div>
</template>
<style scoped>
    .page-layout {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
    .spacer {
        padding-bottom: 25%;
    }
</style>