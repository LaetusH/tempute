<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <CardActivity v-for="index in 9" :name="'Aktivität ' + index" :category="'Schlafen'" :time="'5:30'"/>
    </div>
</template>
<style scoped>
</style>