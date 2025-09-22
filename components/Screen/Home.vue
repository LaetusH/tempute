<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <div v-if="pending">Loading...</div>
        <div v-if="error">Error: {{ error.message }}</div>
        <CardActivity v-for="activity in activities" :name="activity.name" :category="activity.category"/>
        <CardAddActivity @click="addActivity = true" />
        <ScreenAddActivity v-model:show="addActivity" @activity-added="loadActivities" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const activities = ref<any[]>([])
const pending = ref(false)
const error = ref<any>(null)

const addActivity = ref(false)

async function loadActivities() {
  pending.value = true
  error.value = null
  try {
    const data = await $fetch('/api/activities')
    activities.value = data
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

await loadActivities()
</script>