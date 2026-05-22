<template>
  <div class="min-h-screen w-full flex flex-col lg:flex-row bg-white">
    <!-- Left Content (Hero Image) - Visible on Desktop only -->
    <div class="hidden lg:block lg:flex-1 h-screen">
      <img :src="leftImg" alt="left-img" class="h-full w-full object-cover object-center shadow-lg" />
    </div>

    <!-- Right Content (Form Area) - Centered and Responsive -->
    <div class="w-full lg:w-[480px] xl:w-[800px] min-h-screen flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-20 xl:px-24">
      <div class="w-full max-w-md mx-auto">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 mb-2">Hello!!!</h1>
        <h3 class="text-base sm:text-lg lg:text-xl font-medium text-gray-500 mb-6 border-b border-gray-100 pb-4">Welcome to the best Online Store</h3>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import leftImg from '@/assets/images/left-img.jpg'
</script>
