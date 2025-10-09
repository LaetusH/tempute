<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="modelValue" class="fixed inset-0 flex items-start justify-center bg-black/50 z-50 bottom-1/8 sm:bottom-1/10">
                <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg mt-15 overflow-y-auto overscroll-contain">
                    <h2 class="text-xl font-semibold mb-4">{{ title}}</h2>
                    <div class="mb-6">
                        <slot />
                    </div>

                    <div class="mt-6 flex items-center justify-between">
                        <button @click="confirm" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">{{ confirmLabel }}</button>
                        <button @click="cancel" class="px-4 py-2 rounded-lg border hover:bg-gray-100">{{ cancelLabel }}</button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
<script setup lang="ts">
const { modelValue, title, confirmLabel, cancelLabel } = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        required: true
    },
    confirmLabel: {
        type: String,
        default: 'Bestätigen'
    },
    cancelLabel: {
        type: String,
        default: 'Abbrechen'
    }
})
const emit = defineEmits<{ 
    (e: 'update:modelValue', value: boolean): void
	(e: 'cancel'): void
	(e: 'confirm'): void
}>()

function cancel() {
    emit('update:modelValue', false)
    emit('cancel')
}
function confirm() {
    emit('update:modelValue', false)
    emit('confirm')
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>