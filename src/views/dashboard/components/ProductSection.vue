<template>
  <section class="w-full py-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
      <!-- Left: Large Product Card -->
      <div class="relative group overflow-hidden cursor-pointer md:h-full h-72">
        <img :src="products[0].image" :alt="products[0].name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <!-- Dark overlay on hover -->
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <!-- Action Buttons -->
        <div class="absolute bottom-14 left-0 flex flex-col z-10 translate-x-[-100%] group-hover:translate-x-40 transition-transform duration-300">
          <button
            @click.stop="handleCart(products[0])"
            class="w-[65px] h-[65px] bg-[#E27F7A] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
          >
            <i class="ti ti-shopping-cart text-white text-2xl"></i>
          </button>
          <div class="flex w-full">
            <button
              @click.stop="handleView(products[0])"
              class="w-[65px] h-[65px] bg-[#7B6DA0] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
            >
              <i class="ti ti-eye text-white text-2xl"></i>
            </button>
            <!-- Bottom Info Bar -->
            <div class="flex items-center z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div class="flex-1 bg-[#2F2F2F]/85 px-4 py-5 text-white text-[15px] font-medium truncate">
                {{ products[0].name }}
              </div>
              <div class="bg-[#3D916F] px-4 py-5 text-white text-[16px] font-bold">${{ products[0].price }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: 2x2 Grid -->
      <div class="grid grid-cols-2 grid-rows-2 gap-[2px]">
        <div v-for="(product, index) in products.slice(1)" :key="index" class="relative group overflow-hidden cursor-pointer">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <!-- Dark overlay on hover -->
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Action Buttons -->
          <div class="absolute bottom-10 left-0 flex z-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300">
            <button
              @click.stop="handleCart(product)"
              class="w-[50px] h-[50px] bg-[#E27F7A] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
            >
              <i class="ti ti-shopping-cart text-white text-xl"></i>
            </button>
            <button
              @click.stop="handleView(product)"
              class="w-[50px] h-[50px] bg-[#7B6DA0] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
            >
              <i class="ti ti-eye text-white text-xl"></i>
            </button>
            <!-- Bottom Info Bar -->
            <div class="max-h-[50px] flex items-center z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div class="flex-1 min-w-[170px] bg-[#2F2F2F]/85 px-3 py-4 text-white text-[12px] font-medium truncate">
                {{ product.name }}
              </div>
              <div class="bg-[#3D916F] px-3 py-3 text-white text-[16px] font-bold">${{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mb-4 w-full">
    <div class="flex gap-4 w-full">
      <!-- Sales Tagline -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white" v-for="(sale, index) in salesProducts" :key="index">
          <div :class="sale.background" class="px-6 py-8 flex items-center justify-center">
            <i :class="sale.icons" class="text-white text-4xl ti"></i>
          </div>
          <div class="flex flex-col gap-2 px-10">
            <h1 class="font-bold text-[18px]">{{ sale.tagline }}</h1>
            <span class="font-normal text-[12px]">{{ sale.subTagline }}</span>
          </div>
        </div>
      </div>
      <!-- Sales Videos -->
      <section class="flex-1 !h-full">
        <div class="h-full">
          <!-- Header Bar -->
          <div class="flex items-center gap-3 bg-[#3D916F] px-5 py-3">
            <i class="ti ti-video text-white text-xl"></i>
            <h2 class="text-white text-[16px] font-bold">Our Feature</h2>
          </div>

          <!-- YouTube Video Embed -->
          <div class="relative w-full aspect-video bg-black">
            <iframe
              class="w-full min-h-[300px]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Sales Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Description Footer -->
          <div class="bg-[#2F2F2F] px-10 py-10">
            <p class="text-[#C0C0C0] text-[12px] leading-relaxed">
              Watch our feature to understand more <br />
              about our shop
            </p>
          </div>
        </div>
      </section>
      <!-- Comment -->
      <div class="flex flex-col flex-1 bg-[#2F2F2F]">
        <div class="flex gap-4 px-6 py-4 border-b border-[#636363]">
          <div class="flex gap-3 text-[#636363]">
            <i class="ti ti-user text-xl"></i>
            <span class="text-[14px]">Anggi Krisna</span>
          </div>
          <div class="flex gap-3 text-[#636363]">
            <i class="ti ti-clock text-xl"></i>
            <span class="text-[14px]">9:20 PM</span>
          </div>
        </div>
        <div class="p-6 flex flex-col gap-1 flex-1 items-center justify-center">
          <span class="text-[18px] text-white font-semibold">Morris hawked the idea to several publishers, with little success</span>
          <p class="text-[#C0C0C0] text-[12px]">
            Mauris aliquet, elit consequat consectetur vestibulum, neque tortor faucibus purus, nec scelerisque diam tortor quis turpis. Morbi risus nibh,
            volutpat at lacinia a, hendrerit at nunc. Curabitur id nulla quam, eget euismod dolor Nunc quis lectus id diam porttitor porta. Cras at massa eget
            leo pharetra cursus ac non lacus. Integer iaculis velit ac arcu convallis lobortis. Morbi elit elit, aliquam in venenatis suscipit, posuere in
            justo.
          </p>
        </div>
        <div class="flex justify-between gap-4 px-6 py-4 border-t border-[#636363]">
          <div class="flex gap-3 text-white">
            <i class="ti ti-user text-xl"></i>
            <span class="text-[14px] font-semibold">25 Response</span>
          </div>
          <div class="flex gap-3 text-white">
            <!-- <i class="ti ti-clock text-xl"></i> -->
            <span class="text-[14px] font-semibold">Food, Design</span>
          </div>
          <div class="flex gap-3 text-white">
            <i class="ti ti-link text-xl"></i>
            <span class="text-[14px] font-semibold">Permalink</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import img1 from '@/assets/images/slider/img-1.jpg'
  import img2 from '@/assets/images/slider/img-2.jpg'
  import img3 from '@/assets/images/slider/img-3.jpg'

  interface Product {
    name: string
    price: string
    image: string
  }

  interface TextSeling {
    tagline: string
    subTagline: string
    icons: string
    background?: string
  }

  const products: Product[] = [
    { name: 'Lorem ipsum dolor sit amet, consectetur...', price: '546', image: img1 },
    { name: 'Summer Collection', price: '546', image: img2 },
    { name: 'Men Shirts', price: '546', image: img3 },
    { name: 'Urban Wear', price: '546', image: img2 },
    { name: 'Classic Style', price: '546', image: img3 },
  ]

  const salesProducts: TextSeling[] = [
    {
      tagline: 'Five Star Products',
      subTagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean',
      icons: 'ti-star',
      background: 'bg-[#E27F7A]',
    },
    { tagline: 'Fast Delivery', subTagline: 'Fusce quis est nibh. Integer ultrices tristique urna, ut mattis', icons: 'ti-send', background: 'bg-[#DF995E]' },
    {
      tagline: 'Easy Customization',
      subTagline: 'Sed vitae mollis elit. Phasellus molestie sapien ac nisi elemen',
      icons: 'ti-adjustments',
      background: 'bg-[#75AAB8]',
    },
    { tagline: 'Great Companion', subTagline: 'Cras eu leo quis ligula sollicitudin ullamcorper id at nisi. Ve', icons: 'ti-cup', background: 'bg-[#7B6DA0]' },
  ]

  const emit = defineEmits<{
    (e: 'add-to-cart', product: Product): void
    (e: 'view-product', product: Product): void
  }>()

  const handleCart = (product: Product) => {
    emit('add-to-cart', product)
  }

  const handleView = (product: Product) => {
    emit('view-product', product)
  }
</script>
