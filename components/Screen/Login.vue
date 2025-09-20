<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { fetchUser } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await fetchUser()
  } catch (err: any) {
    error.value = err?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Willkommen zurück
      </h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Passwort</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'Melde an…' : 'Anmelden' }}
        </button>

        <p v-if="error" class="text-sm text-red-600 text-center mt-2">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>
