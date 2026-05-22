import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import ApiService from '@/services/ApiService'
import router from '@/router'

export interface User {
  id: string
  firstName?: string
  lastName?: string
  name?: string
  username: string
  email: string
  image?: string
  gender?: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)

    ApiService.setAuthToken(newToken)
  }

  function setUser(userData: User) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  async function login(username: string, password: string) {
    loading.value = true

    try {
      const req = await ApiService.post({
        resource: '/auth/login',
        params: {
          username,
          password,
        },
      })

      const data = req.data

      setAuth(data.accessToken || data.token)

      setUser({
        id: String(data.id),
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        image: data.image,
        gender: data.gender,
      })

      router.push({ name: 'dashboard' })

      return data
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    try {
      const req = await ApiService.get({
        resource: '/auth/me',
      })

      setUser(req.data)
    } catch {
      await logout()
    }
  }

  async function logout() {
    token.value = ''
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    delete axios.defaults.headers.common.Authorization

    router.push({ name: 'sign-in' })
  }

  watch(
    token,
    async (newToken) => {
      if (newToken) {
        ApiService.setAuthToken(newToken)
      } else {
        delete axios.defaults.headers.common.Authorization
        user.value = null
      }
    },
    { immediate: true },
  )

  return {
    token,
    user,
    loading,
    isAuthenticated,

    login,
    logout,
    fetchUser,
    setAuth,
    setUser,
  }
})
