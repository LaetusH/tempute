<script setup lang="ts">
import { useElapsedTime } from '~/composables/useElapsedTime'

const { id, name, category } = defineProps({
    id: {
        type: Number,
        required: true
    },
    name: String,
    category: String
})
const emit = defineEmits<{ 
	(e: 'close'): void
	(e: 'deleted'): void
}>()

const { time, running, lastStartDate, lastStopDate, loadElapsed } = useElapsedTime(id)

function close() {
    emit('close')
}

const showDeleteDialog = ref(false)

async function deleteActivity() {
	try {
		await $fetch(`/api/activities/${id}`, {method: 'DELETE'})
		emit('deleted')
		emit('close')
	} catch (err) {
		console.log('Fehler beim Löschen:', err)
		alert('Die Aktivität konnte nicht gelöscht werden.')
	}
}
</script>
<template>
  	<div class="fixed bottom-1/8 sm:bottom-1/10 inset-0 bg-gray-100 z-50 p-6 flex flex-col">
		<img src="/icons/icon-back.svg" alt="Zurück" @click="close" class="self-start w-5 h-5 mb-5 hover:scale-110 transition cursor-pointer"/>
		<div class="flex items-center justify-between mt-4 text-2xl">
			<h1 class="font-bold">{{ name }}</h1>
			<IconPlayPause :activity-id="id" :running="running" @update-running="loadElapsed" class="w-[1em] h-[1em]"/>
		</div>
		<span class="mt-2 text-gray-600">{{ category }}</span>
		<span class="mt-2 text-gray-600">{{ time }}</span><br/>
		<span v-if="lastStartDate !== ''" class="mt-2 text-gray-600">Zuletzt gestartet: {{ lastStartDate }}</span>
		<span v-if="lastStopDate !== ''" class="mt-2 text-gray-600">Zuletzt getoppt: {{ lastStopDate }}</span>
		<button @click="showDeleteDialog = true" class="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg self-start">Aktivität löschen</button>
		<Dialog v-model="showDeleteDialog" @confirm="deleteActivity" title="Aktivität löschen" confirm-label="Löschen">
			Möchtest du die Aktivität "{{ name }}" wirklich löschen?
		</Dialog>
	</div>
</template>