<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps<{
    type?: string
    disabled?: boolean
    placeholder?: string
    required?: boolean
    labelFor?: string
    label?: string
    modelValue?: string
    requiredMessage?: string
    errorMessage?: string
    submitted?: boolean
    min?: string
    max?: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const model = ref(props.modelValue)

  watch(
    () => props.modelValue,
    (newValue) => {
      model.value = newValue
    },
  )

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
</script>

<template>
  <div>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5" v-if="$slots.inputGroupStart">
        <slot name="inputGroupStart"></slot>
      </div>
      <input
        :type="props.type"
        :id="props.labelFor"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :required="props.required"
        :min="min"
        :max="max"
        v-model="model"
        @input="onInput"
        @wheel="props.type === 'number' ? ($event.target as HTMLInputElement).blur() : null"
        class="min-h-[40px] py-2 px-3 placeholder:text-white text-white text-medium font-semibold focus:outline-none block w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#E0E6ED]"
        :class="{
          'border-[#C0280C] bg-[#FFEDED] text-[#C0280C] placeholder:text-[#C0280C] focus:border-[#C0280C] focus:ring-[#C0280C]':
            props.required && props.submitted && !model,
          'ps-10': $slots.inputGroupStart,
          'pe-10': $slots.inputGroupEnd,
        }"
      />
      <div v-if="$slots.inputGroupEnd" class="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer">
        <slot name="inputGroupEnd"></slot>
      </div>
    </div>
    <p v-if="props.required && !model" class="text-[#C0280C] mt-2 text-small">
      {{ props.requiredMessage || 'Kolom ini wajib diisi' }}
    </p>
    <p v-if="props.errorMessage" class="text-[#C0280C] mt-2 text-small">
      {{ props.errorMessage }}
    </p>
  </div>
</template>
