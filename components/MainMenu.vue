<script setup>
    const menu = [
        {label: 'Home', icon: '/icons/home-icon.png'},
        {label: 'Statistics', icon: '/icons/statistics-icon.png'},
        {label: 'Settings', icon: '/icons/settings-icon.png'}
    ]
</script>
<template>
    <div class="main-menu">
        <MenuItem v-for="item in menu" :key="item.label" :label="item.label" :icon="item.icon"/>
    </div>
</template>
<style scoped>
    .main-menu {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 0.5rem;
    }
</style>