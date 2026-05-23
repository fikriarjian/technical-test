import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isShowMainLoader = ref(false)

  const showLoader = () => {
    isShowMainLoader.value = true
  }

  const hideLoader = () => {
    isShowMainLoader.value = false
  }

  return {
    isShowMainLoader,
    showLoader,
    hideLoader,
  }
})