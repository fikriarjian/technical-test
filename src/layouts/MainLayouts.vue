<template>
  <div class="min-h-screen bg-[#F8F5F0] flex flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import Header from '@/components/layouts/Header.vue'
  import Footer from '@/components/layouts/Footer.vue'
</script>
