<template>
  <section class="bg-white py-12 px-6 lg:px-16">
    <div class="max-w-[1800px] mx-auto">
      <div class="flex flex-col items-center justify-center mb-8">
        <div>
          <h2 class="text-[24px] font-bold text-[#686868] text-center mb-2">
            Our Brands
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1  gap-4">
        <!-- Brand Item -->
        <div class="p-4">
          <img :src="brand" alt="Brand 1" class="w-full h-auto object-cover rounded-md" />
        </div>
        <!-- Add more brand items as needed -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import brand from '@/assets/images/brands.png'
</script>
