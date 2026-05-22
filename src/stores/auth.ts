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

const TOKEN_EXPIRED_KEY = 'token_expired_at'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null'),
  )

  const loading = ref(false)

  let logoutTimer: ReturnType<typeof setTimeout> | null = null

  const isAuthenticated = computed(() => {
    if (!token.value) return false

    const expiredAt = localStorage.getItem(TOKEN_EXPIRED_KEY)

    if (!expiredAt) return false

    return Date.now() < Number(expiredAt)
  })

  function setAuth(newToken: string) {
    token.value = newToken

    localStorage.setItem('token', newToken)

    // expired 1 jam
    const expiredAt = Date.now() + 60 * 60 * 1000

    localStorage.setItem(TOKEN_EXPIRED_KEY, expiredAt.toString())

    ApiService.setAuthToken(newToken)

    startAutoLogoutTimer()
  }

  function setUser(userData: User) {
    user.value = userData

    localStorage.setItem('user', JSON.stringify(userData))
  }

  function startAutoLogoutTimer() {
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }

    const expiredAt = localStorage.getItem(TOKEN_EXPIRED_KEY)

    if (!expiredAt) return

    const remainingTime = Number(expiredAt) - Date.now()

    if (remainingTime <= 0) {
      logout()
      return
    }

    logoutTimer = setTimeout(() => {
      logout()
    }, remainingTime)
  }

  function checkTokenExpiration() {
    const expiredAt = localStorage.getItem(TOKEN_EXPIRED_KEY)

    if (!expiredAt) return

    if (Date.now() >= Number(expiredAt)) {
      logout()
    } else {
      startAutoLogoutTimer()
    }
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
    localStorage.removeItem(TOKEN_EXPIRED_KEY)

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }

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

  // cek token expired
  checkTokenExpiration()

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
    checkTokenExpiration,
  }
})