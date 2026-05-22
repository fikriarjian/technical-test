<template>
  <button :class="[variantClasses[props.variant || 'purple'], 'p-5 flex items-center justify-center']">
    <i v-if="props.icon" :class="props.icon" class="text-white text-2xl"></i>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string
  variant?: 'red' | 'purple' | 'orange' | 'blue' | 'green'
}>()

const variantClasses: Record<string, string> = {
  red: 'bg-[#E27F7A] hover:brightness-110',
  purple: 'bg-[#7B6DA0] hover:brightness-110',
  orange: 'bg-[#DF995E] hover:brightness-110',
  blue: 'bg-[#75AAB8] hover:brightness-110',
  green: 'bg-[#3D916F] hover:brightness-110',
}
</script>