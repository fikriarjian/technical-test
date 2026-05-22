<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex justify-center items-center bg-amber-950 h-screen mt-4">
    <div class="w-full max-w-4xl p-6">
      <h1 class="text-4xl font-bold mb-4">Hello, World!</h1>
      <p class="text-lg text-gray-700 mb-6">Welcome to your Vue.js application.</p>
      <button @click="count++" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Count is: {{ count }}
      </button>
    </div>
  </div>
</template>
