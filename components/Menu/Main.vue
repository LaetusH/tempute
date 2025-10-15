<script setup>
import {inject} from 'vue'

const {_, updateCurrentPage} = inject('currentPage')
const menu = [
    {name: 'Home', label: 'Start', icon: '/icons/icon-home.svg'},
    {name: 'Statistics', label: 'Statistik', icon: '/icons/icon-statistics.svg'},
    {name: 'Settings', label: 'Einstellungen', icon: '/icons/icon-settings.svg'}
]
</script>
<template>
    <div class="flex flex-row justify-around items-center p-2">
        <MenuItem v-for="item in menu" :key="item.name" :label="item.label" :icon="item.icon" @click="updateCurrentPage(item.name)" class="w-14 h-14 cursor-pointer"/>
    </div>
</template>