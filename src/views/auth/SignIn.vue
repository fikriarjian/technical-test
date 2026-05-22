<template>
  <form @submit.prevent="handleLogin" class="w-full mx-auto py-8 space-y-6">
    <AuthField v-model="form.username" type="text" placeholder="Username" :error="errors.username" prepend-icon="ti-user" label="Username" />

    <AuthField
      class="mt-6 mb-10"
      v-model="form.password"
      type="password"
      placeholder="Password"
      :error="errors.password"
      prepend-icon="ti-lock"
      label="Password"
    />

    <Alert v-if="showError" type="danger" title="" :description="apiError" :autoClose="3000" @close="showError = false" />
    <button
      type="submit"
      class="w-full py-3.5 mt-2 rounded bg-dark-teal-700 active:text-white hover:text-white hover:bg-dark-teal-600 active:bg-dark-teal-600 cursor-pointer hover:transition-all duration-300"
      :disabled="loading"
    >
      <span v-if="loading" class="text-white cursor-wait">Loading…</span>
      <span v-else class="text-white">Sign In</span>
    </button>
  </form>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import type { AuthLoginPayload } from '@/core/types/auth'
  import AuthField from '@/views/auth/components/AuthField.vue'
  import Alert from '@/components/ui/Alert.vue'
  import useAuth from '@/api/auth-api'

  const router = useRouter()
  const authStore = useAuthStore()
  const { login } = useAuth()

  const form = reactive<AuthLoginPayload>({
    username: '',
    password: '',
  })

  const errors = reactive({ username: '', password: '' })
  const apiError = ref('')
  const showError = ref(false)
  const loading = ref(false)

  async function handleLogin() {
    errors.username = form.username ? '' : 'Username wajib diisi'
    errors.password = form.password ? '' : 'Password wajib diisi'
    apiError.value = ''

    if (errors.username || errors.password) {
      return
    }

    loading.value = true
    try {
      await login(form)
      router.push({ name: 'dashboard' })
    } catch (err: any) {
      apiError.value = err.response?.data?.message || 'Kombinasi username dan password salah.'
      showError.value = true
    } finally {
      loading.value = false
    }
  }
</script>
