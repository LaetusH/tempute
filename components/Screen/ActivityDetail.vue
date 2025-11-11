<script setup lang="ts">
import { useElapsedTime } from '~/composables/useElapsedTime'
import { useFormatTimestamp } from '~/composables/useFormatTimestamp'

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
const totalTimeChartData = ref<{ day: string; hours: number }[]>([])
const avgTimeChartData = ref<{ day: string; hours: number }[]>([])
const lastRefresh = ref('')

const scrolled = ref(false)
let scrollContainer: HTMLElement | null = null

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

async function loadChartData() {
  	const weekDays = ['So','Mo','Di','Mi','Do','Fr','Sa']
	const res = await $fetch<{ timePerDay: number[], avgPerDay: number[], serverNow: string }>(`/api/activities/${id}/weekdays`)
	lastRefresh.value = useFormatTimestamp(new Date(res.serverNow).getTime())
	const durationsByDay = res.timePerDay
	const averageByDay = res.avgPerDay
	if (durationsByDay === undefined) throw new TypeError('There is a value missing')
	if (averageByDay === undefined) throw new TypeError('There is a value missing')

	totalTimeChartData.value = weekDays.map((d, idx) => {
		const arr = durationsByDay[idx]!
		return { day: d, hours: arr }
	})

	avgTimeChartData.value = weekDays.map((d, idx) => {
		const arr = averageByDay[idx]!
		return { day: d, hours: arr }
	})
}

function onScroll() {
	if (!scrollContainer) return
	scrolled.value = scrollContainer.scrollTop > 30
}

onMounted(() => {
	scrollContainer = document.querySelector('#scrollable-content')
	scrollContainer?.addEventListener('scroll', onScroll)
	loadElapsed()
	loadChartData()
})
onBeforeUnmount(() => {
  	scrollContainer?.removeEventListener('scroll', onScroll)
})
</script>
<template>
  	<div class="fixed bottom-1/8 sm:bottom-1/10 inset-0 bg-gray-100 z-50 flex flex-col">
		<header class="sticky top-0 bg-gray-100 pb-3 px-6 sm:px-10" :class="scrolled ? 'pt-3 border-b border-gray-300' : 'pt-6'">
			<div class="flex items-center justify-between" :class="scrolled ? 'flex-row' : 'flex-row sm:items-center sm:justify-between'">
				<img src="/icons/icon-back.svg" alt="Zurück" @click="close" class="self-center w-[1.25em] h-[1.25em] sm:w-[1.5em] sm:h-[1.5em] hover:scale-110 transition cursor-pointer"/>
				<h1 class="font-bold text-xl sm:text-2xl" :class="scrolled ? 'text-center flex-1' : ''">
					{{ name }}
				</h1>
				<IconPlayPause :activity-id="id" :running="running" @update-running="loadElapsed" class="w-[1.25em] h-[1.25em] sm:w-[1.5em] sm:h-[1.5em]"/>
			</div>
        	<div v-if="!scrolled" class="text-sm text-gray-600 mt-2 flex flex-wrap justify-center ">
          		{{ category }}
    		</div>
		</header>

		<div id="scrollable-content" class="overflow-y-auto px-6 sm:px-10 py-6 sm:py-10">
			<span class="text-gray-600">Gesamtzeit: {{ time }}</span><br/>

			<span v-if="lastStartDate !== ''" class="mt-2 text-gray-600">Zuletzt gestartet: {{ lastStartDate }}</span>
			<span v-if="lastStopDate !== ''" class="mt-2 text-gray-600">Zuletzt getoppt: {{ lastStopDate }}</span>

			<div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col mt-5">
				<span class="py-2 font-medium text-center border-b border-gray-200">Verbrachte Zeit pro Tag</span>
				<TimeChart :data="totalTimeChartData"/>
				<span class="text-gray-600 text-right text-sm bg-gray-50 px-4 py-2 border-t border-gray-200 rounded-b-xl">Zuletzt aktualisiert: {{ lastRefresh }}</span>
			</div>

			<div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col mt-5">
				<span class="py-2 font-medium text-center border-b border-gray-200">Durchschnittlich pro Tag verbrachte Zeit</span>
				<TimeChart :data="avgTimeChartData"/>
				<span class="text-gray-600 text-right text-sm bg-gray-50 px-4 py-2 border-t border-gray-200 rounded-b-xl">Zuletzt aktualisiert: {{ lastRefresh }}</span>
			</div>

			<div>Irgendwelche anderen Infos</div>

			<button @click="showDeleteDialog = true" class="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg self-start">Aktivität löschen</button>
			<Dialog v-model="showDeleteDialog" @confirm="deleteActivity" title="Aktivität löschen" confirm-label="Löschen">
				Möchtest du die Aktivität "{{ name }}" wirklich löschen?
			</Dialog>
		</div>
	</div>
</template>