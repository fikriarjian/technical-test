<template>
  <div
    :class="[
      'px-4 py-2.5 rounded relative flex items-start gap-2',
      baseClass,
      borderClass,
      textClass,
    ]"
    role="alert"
  >
    <!-- Icon -->
    <i :class="[icon, textClass, 'text-xl mt-1']" />

    <!-- Text -->
    <div class="flex-1">
      <strong class="block font-bold text-md">{{ title }}</strong>
      <span class="block text-sm">{{ description }}</span>
    </div>

    <!-- Close button -->
    <button
      type="button"
      class="absolute top-0 right-0 px-4 py-3 text-inherit"
      @click="$emit('close')"
    >
      <i class="ri-close-line text-xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps<{
  type?: 'success' | 'danger' | 'info' | 'warning'
  title: string
  description: string
  icon?: string
  autoClose?: number
}>()

const emit = defineEmits(['close'])

const type = props.type || 'info'

onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => {
      emit('close')
    }, props.autoClose)
  }
})

const icon = computed(() => {
  if (props.icon) return props.icon
  switch (type) {
    case 'success':
      return 'ri-check-line'
    case 'danger':
      return 'ri-error-warning-line'
    case 'warning':
      return 'ri-alert-line'
    case 'info':
    default:
      return 'ri-information-line'
  }
})

const baseClass = computed(() => {
  const map = {
    success: 'bg-green-100',
    danger: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100',
  }
  return map[type as keyof typeof map]
})

const borderClass = computed(() => {
  const map = {
    success: 'border border-green-400',
    danger: 'border border-red-400',
    warning: 'border border-yellow-400',
    info: 'border border-blue-400',
  }
  return map[type as keyof typeof map]
})

const textClass = computed(() => {
  const map = {
    success: 'text-green-700',
    danger: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700',
  }
  return map[type as keyof typeof map]
})
</script>
