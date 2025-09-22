<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = defineModel<boolean>('show', { required: true })
const emit = defineEmits<{ (e: 'activity-added'): void }>()

const name = ref('')
const categoryId = ref<number | null>(null)
const categories = ref<{ id: number; name: string }[]>([])
const newCategory = ref('')
const addingCategory = ref(false)

async function loadCategories() {
  categories.value = await $fetch('/api/categories')
}

async function addCategory() {
  if (!newCategory.value) return
  const cat = await $fetch<{ id: number; name: string }>('/api/categories', {
    method: 'POST',
    body: { name: newCategory.value }
  })
  categories.value.push(cat)
  categoryId.value = cat.id
  newCategory.value = ''
  addingCategory.value = false
}

async function saveActivity() {
  if (!name.value || !categoryId.value) return
  await $fetch('/api/activities', {
    method: 'POST',
    body: {
      name: name.value,
      category_id: categoryId.value
    }
  })
  name.value = ''
  categoryId.value = null
  show.value = false
  emit('activity-added')
}

async function cancel() {
    show.value = false
}

onMounted(loadCategories)
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-start justify-center bg-black/50 z-50"
  >
    <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg mt-15 overflow-y-auto overscroll-contain">
      <h2 class="text-xl font-semibold mb-4">Aktivität hinzufügen</h2>

      <div class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <label class="block text-sm font-medium text-gray-700">Kategorie</label>

          <select
            v-if="!addingCategory"
            v-model="categoryId"
            class="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Wähle eine Kategorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>

          <div v-else class="flex space-x-2 mt-1">
            <input
              v-model="newCategory"
              type="text"
              placeholder="Neue Kategorie"
              class="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="addCategory"
              class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Hinzufügen
            </button>
          </div>

          <button
            class="mt-2 text-sm text-blue-600 hover:underline"
            @click="addingCategory = !addingCategory"
          >
            {{ addingCategory ? 'Abbrechen' : 'Neue Kategorie hinzufügen' }}
          </button>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-2">
        <button
          @click="cancel"
          class="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Abbrechen
        </button>
        <button
          @click="saveActivity"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>