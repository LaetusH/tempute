<script setup lang="ts">
const props = defineProps<{
  	data: { day: string; hours: number }[]
}>()

const maxHours = computed(() =>
  	Math.max(...props.data.map(d => d.hours), 1)
)
</script>

<template>
    <div class="flex items-end justify-between w-full h-40 sm:h-56 mt-4 pt-3 sm:pt-5 bg-white rounded-t-xl shadow-lg">
      <div
        v-for="(entry, index) in data"
        :key="index"
        class="flex flex-col items-center justify-end flex-1 mx-1 h-full"
      >
        <div
          class="w-5 sm:w-6 md:w-7 bg-blue-500"
          :style="{
            height: `${(entry.hours / maxHours) * 100}%`
          }"
        ></div>
        <span class="mt-1 text-xs sm:text-sm text-gray-600">{{ entry.day }}</span>
        <span class="text-[10px] text-gray-500">{{ entry.hours.toFixed(1) }}h</span>
      </div>
    </div>
</template>