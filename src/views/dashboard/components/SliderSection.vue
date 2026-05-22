<template>
  <div class="relative bg-[#6f6f73] min-h-[calc(100vh-100px)] overflow-hidden">
    <div class="pattern-overlay"></div>

    <div
      class="relative z-30 h-[420px] md:h-[540px] lg:h-[calc(100vh-71px)] py-6 md:py-10 px-4 sm:px-6 lg:px-[300px] text-white"
      :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
      <nav class="z-40 w-full flex bg-[#2b2b2b] text-white shadow-lg">
        <ul class="flex w-full">
          <li v-for="item in menu" :key="item.name" class="border-l border-white/10">
            <button
              @click="setActive(item.name)"
              :class="[
                'h-[70px] flex items-center transition-all duration-300',
                item.logo ? 'px-8 gap-4 text-[24px] font-bold min-w-[200px]' : 'px-10 text-[16px] font-semibold',
                activeMenu === item.name ? 'bg-[#3D916F]' : 'hover:bg-[#383838]',
              ]"
            >
              <i v-if="item.logo" class="ti ti-box text-[24px]"></i>

              {{ item.name }}

              <span v-if="item.dropdown" class="ml-2 text-xs opacity-60"> ▼ </span>
            </button>
          </li>
        </ul>
      </nav>
      <HeroSlider @add-to-cart="onAddToCart" @view-product="onViewProduct" />

      <!-- Toast Notification -->
      <transition name="toast-fade">
        <div
          v-if="toast.visible"
          class="fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white text-sm font-semibold"
          :class="toast.type === 'cart' ? 'bg-[#E27F7A]' : 'bg-[#7B6DA0]'"
        >
          <i :class="toast.type === 'cart' ? 'ti ti-shopping-cart' : 'ti ti-eye'" class="text-lg"></i>
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import bg from '@/assets/images/bg-dashboard.jpg'
  import HeroSlider from '@/views/dashboard/components/HeroSlider.vue'
  import { ref } from 'vue'

  interface SlideData {
    title: string
    price: string
    image: string
  }

  const toast = ref({ visible: false, message: '', type: '' as 'cart' | 'view' })
  let toastTimer: number | null = null

  const showToast = (message: string, type: 'cart' | 'view') => {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = { visible: true, message, type }
    toastTimer = window.setTimeout(() => {
      toast.value.visible = false
    }, 2500)
  }

  const onAddToCart = (slide: SlideData) => {
    showToast(`"${slide.title}" ditambahkan ke keranjang!`, 'cart')
  }

  const onViewProduct = (slide: SlideData) => {
    showToast(`Melihat detail "${slide.title}" — $${slide.price}`, 'view')
  }

  const activeMenu = ref('Shirtbox')

  const setActive = (name: string) => {
    activeMenu.value = name
  }

  const menu = [
    { name: 'Shirtbox', logo: true },
    { name: 'Home' },
    { name: 'Products' },
    { name: 'Cart' },
    { name: 'Archive' },
    { name: 'Blog' },
    { name: 'Portfolio', dropdown: true },
    { name: 'Contact' },
  ]
</script>

<style scoped>
  .pattern-overlay {
    position: absolute;
    inset: 0;
    z-index: 20;
    opacity: 0.25;
    backdrop-filter: blur(100px);

    background: repeating-radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1px, transparent 2px, transparent 9px);

    background-size: 40px 14px;
  }

  /* Toast transition */
  .toast-fade-enter-active,
  .toast-fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .toast-fade-enter-from,
  .toast-fade-leave-to {
    opacity: 0;
    transform: translateY(12px);
  }
</style>
