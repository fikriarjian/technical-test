<template>
  <div class="relative w-full h-[420px] md:h-[540px] lg:h-[calc(100vh-70px)]">
    <!-- Slider Container with overflow-hidden -->
    <div class="w-full h-full overflow-hidden relative">
      <transition name="fade" mode="out-in">
        <div
          :key="currentSlide"
          class="absolute inset-0 bg-cover bg-center"
          :style="{
            backgroundImage: `url(${slides[currentSlide].image})`,
          }"
        >
          <div class="absolute inset-0 bg-black/10"></div>

          <!-- Content -->
          <div class="relative z-20 h-full flex flex-col gap-0 justify-center pl-6 md:pl-12 lg:pl-28 lg:-mt-60 -mt-0">
            <h1 class="text-[40px] font-bold text-[#2F2F2F]">
              {{ slides[currentSlide].title }}
            </h1>

            <p class="text-[25px] font-semibold text-white -mt-1">${{ slides[currentSlide].price }}</p>

            <p class="mt-6 text-[14px] text-white max-w-[520px] leading-relaxed">
              {{ slides[currentSlide].description }}
            </p>
          </div>
        </div>
      </transition>

      <!-- Dots -->
      <div class="absolute bottom-20 left-6 md:left-16 lg:bottom-[250px] lg:left-28 flex gap-4 z-30">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="w-2 h-2 rounded-full transition-all"
          :class="currentSlide === index ? 'bg-[#232323]' : 'bg-white'"
        />
      </div>
    </div>

    <transition name="btn-fade" mode="out-in">
      <div :key="currentSlide" class="absolute top-0 left-full z-30 flex flex-col">
        <!-- Add to Cart -->
        <button
          @click="handleAddToCart"
          title="Add to Cart"
          class="w-[60px] h-[60px] bg-[#E27F7A] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <i class="ti ti-shopping-cart text-white text-xl"></i>
        </button>

        <!-- View Product -->
        <button
          @click="handleView"
          title="View Product"
          class="w-[60px] h-[60px] bg-[#7B6DA0] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <i class="ti ti-eye text-white text-xl"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/images/bg-dashboard.jpg'
import img2 from '@/assets/images/bg-dashboard.jpg'
import img3 from '@/assets/images/bg-dashboard.jpg'

const emit = defineEmits<{
  (e: 'add-to-cart', slide: { title: string; price: string; image: string }): void
  (e: 'view-product', slide: { title: string; price: string; image: string }): void
}>()

const slides = [
  {
    title: 'Muscle Shirts',
    price: '39.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: img1,
  },
  {
    title: 'Classic Wear',
    price: '49.00',
    description: 'Modern apparel crafted for elegance.',
    image: img2,
  },
  {
    title: 'Urban Style',
    price: '59.00',
    description: 'Minimal design with premium comfort.',
    image: img3,
  },
]

const currentSlide = ref(0)

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const handleAddToCart = () => {
  emit('add-to-cart', {
    title: slides[currentSlide.value].title,
    price: slides[currentSlide.value].price,
    image: slides[currentSlide.value].image,
  })
}

const handleView = () => {
  emit('view-product', {
    title: slides[currentSlide.value].title,
    price: slides[currentSlide.value].price,
    image: slides[currentSlide.value].image,
  })
}

let intervalId: number | null = null

const startAutoPlay = () => {
  intervalId = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

const stopAutoPlay = () => {
  if (intervalId) {
    window.clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn-fade-enter-active,
.btn-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.btn-fade-enter-from,
.btn-fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
