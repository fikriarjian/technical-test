<template>
  <div class="mb-5">
    <label :for="id" v-if="label != null" class="block mb-2 text-sm font-semibold text-[#888EA8]" :class="{ 'text-[#C0280C]': error }">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <span v-if="prependIcon" class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-xl">
        <i :class="['ti', prependIcon]"></i>
      </span>

      <!-- Input Field -->
      <input
        :id="id"
        :value="modelValue"
        :type="fieldType"
        :placeholder="placeholder"
        @input="onInput"
        :disabled="disabled"
        :class="[
          'w-full py-3 border rounded-md text-medium placeholder-gray-400',
          prependIcon ? 'pl-12 pr-10' : 'px-4',
          disabled && 'opacity-50 cursor-not-allowed',
          error ? 'border-red-500 text-red-600 focus:border-red-500' : 'border-[#EBEEF3] text-b200 focus:border-[#69B8D0]',
          'focus:outline-none focus:ring-0',
        ]"
      />

      <!-- Append Password Toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        @click="toggleShow"
      >
        <i :class="['text-xl', show ? 'ti ti-eye' : 'ti ti-eye-off']"></i>
      </button>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, toRefs } from 'vue'

  const props = defineProps({
    modelValue: { type: String, required: true },
    label: { type: String, required: false },
    prependIcon: { type: String, required: false },
    id: { type: String, default: () => `field-${Math.random().toString(36).substr(2, 5)}` },
    placeholder: { type: String, default: '' },
    type: { type: String as () => 'text' | 'email' | 'password', default: 'text' },
    error: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const { type } = toRefs(props)
  const show = ref(false)
  const toggleShow = () => {
    show.value = !show.value
  }

  const fieldType = computed(() => (props.type === 'password' ? (show.value ? 'text' : 'password') : props.type))

  function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value
    emit('update:modelValue', val)
  }
</script>
