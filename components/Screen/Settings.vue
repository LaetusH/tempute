<script setup lang="ts">
const { logout } = useAuth()
</script>
<template>
    <div class="m-6">
        <button @click="logout" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg self-start">Abmelden</button>
    </div>
</template>