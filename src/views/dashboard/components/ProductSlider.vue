<template>
  <section class="bg-[#0B0B0B] py-10 px-4 sm:px-6 lg:px-16">
    <div class="max-w-[1800px] mx-auto">
      <!-- Heading -->
      <div class="flex flex-col gap-4 items-center justify-center mb-14">
        <div>
          <h2
            class="text-2xl sm:text-4xl lg:text-6xl font-bold text-white text-center mb-2 leading-tight"
          >
            "Shirtbox shop provide you the finest shirts <br />
            all over the world,,
          </h2>

          <p
            class="text-[14px] sm:text-[16px] lg:text-[20px] text-center text-[#606060] mb-2"
          >
            Best choose for your daily activities
          </p>
        </div>
        <hr class="border-2 border-[#3D916F] w-12 sm:w-16 lg:w-20" />
      </div>

      <!-- SLIDER WRAPPER -->
      <div class="flex flex-col lg:items-end lg:flex-row gap-4">
        <!-- Desktop Prev Button -->
        <button
          type="button"
          @click="prev"
          :disabled="!canPrev"
          class="hidden lg:flex p-5 items-center justify-center bg-[#313131] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <i class="ti ti-chevron-left text-2xl"></i>
        </button>

        <!-- Slide Container -->
        <div class="relative overflow-hidden flex-1">
          <div
            class="flex gap-4 transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 25}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] shrink-0"
            >
              <div
                class="overflow-hidden bg-[#151515] shadow-[0_22px_72px_-30px_rgba(0,0,0,0.8)] h-full flex flex-col"
              >
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="w-full h-[240px] sm:h-[286px] object-cover object-center"
                />

                <div class="bg-[#2F2F2F] flex-1 flex flex-col">
                  <div
                    class="flex items-center justify-between p-4 sm:p-6 gap-3"
                  >
                    <span
                      class="text-sm sm:text-lg uppercase text-[#9CA3AF]"
                    >
                      {{ slide.title }}
                    </span>

                    <span
                      class="text-2xl sm:text-3xl font-bold text-white shrink-0"
                    >
                      ${{ slide.price }}
                    </span>
                  </div>

                  <hr class="border-[#4A4A4A]" />

                  <p
                    class="text-xs sm:text-sm leading-6 text-[#B3B3B3] p-4 sm:p-6 flex-1"
                  >
                    {{ slide.description }}
                  </p>
                </div>

                <button
                  type="button"
                  class="w-full bg-[#3D916F] px-4 py-4 sm:py-6 text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#7B6DA0]"
                >
                  Add to basket
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Next Button -->
        <button
          type="button"
          @click="next"
          :disabled="!canNext"
          class="hidden lg:flex p-5 items-center justify-center bg-[#313131] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <i class="ti ti-chevron-right text-2xl"></i>
        </button>

        <!-- MOBILE/TABLET ARROWS -->
        <div class="flex lg:hidden justify-center gap-4 mt-4">
          <button
            type="button"
            @click="prev"
            :disabled="!canPrev"
            class="flex p-4 items-center justify-center bg-[#313131] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i class="ti ti-chevron-left text-xl"></i>
          </button>

          <button
            type="button"
            @click="next"
            :disabled="!canNext"
            class="flex p-4 items-center justify-center bg-[#313131] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i class="ti ti-chevron-right text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
  import img1 from '@/assets/images/slider/img-1.jpg'
  import img2 from '@/assets/images/slider/img-2.jpg'
  import img3 from '@/assets/images/slider/img-3.jpg'

  interface SlideItem {
    title: string
    category: string
    description: string
    price: string
    image: string
  }

  const slides: SlideItem[] = [
    {
      title: 'Nice T-Shirt',
      category: 'New Arrival',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: '39',
      image: img1,
    },
    {
      title: 'Modern Jacket',
      category: 'Premium',
      description: 'Comfortable fit with modern style for every occasion.',
      price: '39',
      image: img2,
    },
    {
      title: 'Streetwear Tee',
      category: 'Popular',
      description: 'Soft fabric and bold design for daily wear.',
      price: '39',
      image: img3,
    },
    {
      title: 'Classic Polo',
      category: 'Limited',
      description: 'Classic cut with premium details and refined comfort.',
      price: '39',
      image: img1,
    },
    {
      title: 'Urban Hoodie',
      category: 'Featured',
      description: 'Cozy hoodie with a sleek silhouette.',
      price: '39',
      image: img2,
    },
    {
      title: 'Classic Polo',
      category: 'Limited',
      description: 'Classic cut with premium details and refined comfort.',
      price: '39',
      image: img1,
    },
    {
      title: 'Urban Hoodie',
      category: 'Featured',
      description: 'Cozy hoodie with a sleek silhouette.',
      price: '39',
      image: img2,
    },
  ]

  const visibleCount = 4
  const currentIndex = ref(0)

  const maxIndex = computed(() => Math.max(0, slides.length - visibleCount))
  const canPrev = computed(() => currentIndex.value > 0)
  const canNext = computed(() => currentIndex.value < maxIndex.value)

  const prev = () => {
    if (currentIndex.value > 0) {
      currentIndex.value -= 1
    }
  }

  const next = () => {
    if (currentIndex.value < maxIndex.value) {
      currentIndex.value += 1
    }
  }
</script>
