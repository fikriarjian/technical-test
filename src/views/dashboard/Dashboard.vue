<template>
  <div class="min-h-screen">
    <SliderSection class="hidden xl:block" />

    <div class="px-4 mt-2 sm:px-6 sm:mt-2 md:px-10 md:mt-2 lg:px-20 lg:mt-2 xl:px-59 xl:mt-0 bg-[#F8F5F0]">
      <!-- Subscribe Section -->
      <div
        class="flex flex-col lg:flex-row justify-between lg:items-center gap-5 bg-[#2F2F2F] px-4 py-5 sm:p-5"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white">
          <h1 class="font-bold text-[16px] shrink-0">SUBSCRIBE</h1>

          <p class="text-[14px] sm:text-[15px] text-[#919191] font-normal">
            Get the last update from our store
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full lg:w-auto">
          <div class="w-full sm:w-[260px]">
            <InputText placeholder="your@email.co" />
          </div>

          <Button
            icon="ti ti-send"
            variant="purple"
            class="w-full sm:w-auto"
          />
        </div>
      </div>

      <!-- Section Produk -->
      <ProductSection />
    </div>

    <ProductSlider />
    <Brands />
  </div>
</template>

<script setup lang="ts">
import SliderSection from '@/views/dashboard/components/SliderSection.vue'
import ProductSlider from '@/views/dashboard/components/ProductSlider.vue'
import InputText from '@/components/ui/form/InputText.vue'
import Button from '@/components/ui/button/Button.vue'
import ProductSection from '@/views/dashboard/components/ProductSection.vue'
import Brands from '@/views/dashboard/components/Brands.vue'
</script>