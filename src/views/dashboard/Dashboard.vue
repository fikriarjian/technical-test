<template>
  <div class="min-h-screen">
    <SliderSection />
    <div class="px-59 bg-[#F8F5F0]">
      <div class="flex justify-between items-center bg-[#2F2F2F]">
        <div class="flex gap-4 text-white p-5">
          <h1 class="font-bold text-[16px]">SUBSCRIBE</h1>
          <p class="text-[15px] text-[#919191] font-normal">Get the last update from our store</p>
        </div>
        <div class="flex gap-2 items-center">
          <InputText placeholder="your@email.co" />
          <Button icon="ti ti-send" variant="purple" />
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
