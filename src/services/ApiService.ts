import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { App } from 'vue'
import VueAxios from 'vue-axios'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '@/stores/auth'
import router from '@/router/index'

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

const API_BASE = 'https://dummyjson.com'

class ApiService {
  private static isTokenExpiredMessageShown = false

  public static init(app: App<Element>) {
    app.use(VueAxios, axios)
    axios.defaults.baseURL = API_BASE
    this.setInterceptor()
  }

  public static setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.isTokenExpiredMessageShown = false
  }

  public static get<T = any>({ resource, params }: { resource: string; params?: any }): Promise<AxiosResponse<T>> {
    return axios.get(resource, {
      params,
    })
  }

  public static post<T = any>({ resource, params, options = {} }: { resource: string; params?: any; options?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return axios.post(resource, params, options)
  }

  public static put<T = any>({ resource, params, options = {} }: { resource: string; params?: any; options?: AxiosRequestConfig }): Promise<AxiosResponse<T>> {
    return axios.put(resource, params, options)
  }

  public static patch<T = any>({
    resource,
    params,
    options = {},
  }: {
    resource: string
    params?: any
    options?: AxiosRequestConfig
  }): Promise<AxiosResponse<T>> {
    return axios.patch(resource, params, options)
  }

  public static delete<T = any>({ resource, params }: { resource: string; params?: any }): Promise<AxiosResponse<T>> {
    return axios.delete(resource, {
      params,
    })
  }

  public static download({ resource, params }: { resource: string; params?: any }): Promise<AxiosResponse<Blob>> {
    return axios.get(resource, {
      params,
      responseType: 'blob',
    })
  }

  public static downloadV2({ resource, params }: { resource: string; params?: any }): Promise<AxiosResponse<Blob>> {
    return axios.post(resource, null, {
      params,
      responseType: 'blob',
    })
  }

  private static setInterceptor() {
    axios.interceptors.response.use(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      },
      (error) => {
        if (axios.isCancel(error)) {
          console.warn('Request canceled:', error.message)
          return Promise.reject(new Error('Request canceled'))
        } else if (error.response.status >= 500) {
          // todo: handle error 500
          if (error.response.status == 500) {
            toast.error('Terjadi kesalahan pada server', {
              autoClose: 3000,
            })
            router.push({ name: '500' })
            return Promise.reject(error)
          } else if (error.response.status == 503) {
            toast.error('Layanan tidak tersedia', {
              autoClose: 3000,
            })
            router.push({ name: '503' })
            return Promise.reject(error)
          }
        } else if (error.response.status >= 400 && error.response.status < 500) {
          let message = error.response.data.message

          if (error.response.status == 400) {
            const url = error.response.request.responseURL
            const urlSplit = url.split('/')
            const last = urlSplit[urlSplit.length - 1]
            const secondLast = urlSplit[urlSplit.length - 3]

            if (last === 'summary' && secondLast === 'branches') {
              toast.error('Akses tidak tersedia.', {
                position: 'top-right',
                autoClose: 3000,
                progress: undefined,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: 'summary-error',
              })
              return Promise.reject(error)
            }
          }

          if (error.response.status == 401) {
            // Identify specific 401 cases
            const url = error.response.request.responseURL
            const last = url.split('/').pop()

            if (last === 'delete-user' || last === 'login') {
              const toastMsg = last === 'delete-user' ? 'Akun tidak valid.' : 'Kombinasi username atau password salah.'
              const toastId = last === 'delete-user' ? 'delete-user-error' : 'login-error'

              toast.error(toastMsg, {
                position: 'top-right',
                autoClose: 3000,
                progress: undefined,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: toastId,
              })
              return Promise.reject(error)
            }

            // De-duplicate general token expiration message
            if (ApiService.isTokenExpiredMessageShown) {
              return Promise.reject(error)
            }

            ApiService.isTokenExpiredMessageShown = true

            toast.error('Sesi Anda telah berakhir, silakan login lagi', {
              position: 'top-right',
              autoClose: false,
              closeOnClick: true,
              pauseOnHover: true,
              toastId: 'session-expired',
            })

            // Clear auth data
            const authStore = useAuthStore()
            authStore.logout()

            return Promise.reject(error)
          }

          if (error.response.status == 404) {
            message += ' - Please contact Administrator!'
          }

          toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            progress: undefined,
            // theme: "colored",
            closeOnClick: true,
            pauseOnHover: true,
          })
        }

        return Promise.reject(error)
      },
    )
  }
}

export default ApiService
