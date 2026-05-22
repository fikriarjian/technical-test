import ApiService from '@/services/ApiService'
import { useAuthStore } from '@/stores/auth'
import type { AuthLoginPayload, AuthLoginResponse, DeleteAccountPayload } from '@/core/types/auth.ts'
import type { BaseResponse } from '@/core/types/base'

export default function useAuth() {
  const authStore = useAuthStore()

  const login = async (params: AuthLoginPayload) => {
    try {
      const req = await ApiService.post<any>({
        resource: `auth/login`,
        params: params,
      })

      const data = req.data
      const token = data.accessToken || data.token || data.payload?.data?.token

      if (token) {
        authStore.setAuth(token)
        // Also set user data for a complete authentication state
        authStore.setUser({
          id: String(data.id || data.payload?.data?.id || ''),
          firstName: data.firstName || data.payload?.data?.firstName || '',
          lastName: data.lastName || data.payload?.data?.lastName || '',
          username: data.username || data.payload?.data?.username || '',
          email: data.email || data.payload?.data?.email || '',
          image: data.image || data.payload?.data?.image || '',
          gender: data.gender || data.payload?.data?.gender || '',
        })
      }

      return req
    } catch (e: any) {
      throw e
    }
  }

  const deleteAccount = async (params: DeleteAccountPayload) => {
    try {
      const res = await ApiService.post<BaseResponse<null>>({
        resource: `auth/delete-user`,
        params: params,
      })

      return res
    } catch (e: any) {
      throw new Error(e)
    }
  }

  return {
    login,
    deleteAccount,
  }
}
