import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingOverlay = defineStore('loadingOverlay', () => {
  const isLoading = ref(false)

  function loadingBlock() {
    isLoading.value = true
  }

  function loadingUnBlock() {
    isLoading.value = false
  }

  return {
    isLoading,
    loadingBlock,
    loadingUnBlock,
  }
})
