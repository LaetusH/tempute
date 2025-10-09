<template>
	<div v-if="!selectedActivity" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 min-h-full">
		<div v-if="pending">Loading...</div>
		<div v-if="error">Error: {{ error.message }}</div>
		<CardActivity v-for="activity in activities" :key="activity.id" :id="activity.id" :name="activity.name" :category="activity.category" @click="openActivity(activity)"/>
		<CardAddActivity @click="addActivity = true" />
	</div>
	<Transition name="slide-right" mode="out-in">
		<ScreenActivityDetail v-if="selectedActivity" :key="selectedActivity.id" v-bind="selectedActivity" @close="closeDetail" @deleted="loadActivities"/>
	</Transition>
	<ScreenAddActivity v-model:show="addActivity" @activity-added="loadActivities" />
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

const selectedActivity = ref<null | any>(null)
    
function openActivity(activity: any) {
    selectedActivity.value = activity
}

function closeDetail() {
    selectedActivity.value = null
}

onMounted(loadActivities)
</script>
<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
}
.slide-right-enter-to {
    transform: translateX(0%);
    opacity: 1;
}

.slide-right-leave-from {
    transform: translateX(0%);
    opacity: 1;
}
.slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>