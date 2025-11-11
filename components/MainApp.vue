<script setup lang="ts">
import {provide, ref} from 'vue'

const currentPage = ref('Home')
const pageTrigger = ref(0)

function updateCurrentPage(newPage: string) {
    pageTrigger.value *= -1
    currentPage.value = newPage
}
provide('navigation', {currentPage, pageTrigger, updateCurrentPage})
</script>
<template>
    <div class="flex flex-col min-h-full">
        <div class="flex-1 relative overflow-hidden">
            <ScreenHome v-if="currentPage==='Home'"/>
            <ScreenStatistics v-if="currentPage==='Statistics'"/>
            <ScreenSettings v-if="currentPage==='Settings'"/>
        </div>
        <div class="pb-[25%]"></div>
        <Footer />
    </div>
</template>