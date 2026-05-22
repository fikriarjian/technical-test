import type { AxiosResponse } from 'axios'
import { useLoadingOverlay } from '@/stores/loadingOverlay'
import { toast } from 'vue3-toastify'

const loadingStore = useLoadingOverlay()

export function loadingBlock() {
  loadingStore.loadingBlock()
}

export function loadingUnBlock() {
  loadingStore.loadingUnBlock()
}

export function requestSuccess(req: AxiosResponse<any, any>) {
  toast.success(req.data.message, {
    position: 'top-right',
    autoClose: 2000,
    progress: undefined,
    // theme: "colored",
    closeOnClick: false,
    pauseOnHover: false,
  })
}

export function requestFailed(error: any) {
  if (error?.response?.status === 401) return

  toast.error(error.response.data.message, {
    position: 'top-right',
    autoClose: 3000,
    progress: undefined,
    // theme: "colored",
    closeOnClick: false,
    pauseOnHover: false,
  })
}
