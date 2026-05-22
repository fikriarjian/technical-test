<template>
  <header
    class="sticky top-0 z-[9999] bg-[#2F2F2F] px-4 sm:px-6 md:px-10 lg:px-[150px] py-4 flex items-center justify-between shadow-sm gap-4"
  >
    <!-- Search -->
    <div class="flex items-center gap-2 flex-1 max-w-full lg:max-w-[320px]">
      <SearchPanel type="text" placeholder="Search">
        <template #inputGroupEnd>
          <i class="ti ti-search text-white text-xl"></i>
        </template>
      </SearchPanel>
    </div>

    <!-- Navigation & Account Dropdown -->
    <div
      class="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 text-white font-semibold shrink-0"
    >
      <!-- Dropdown Container -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center gap-1.5 focus:outline-none hover:text-gray-300 transition-colors cursor-pointer select-none font-semibold text-white text-sm sm:text-base"
        >
          <span class="hidden sm:block">My Account</span>
          <i class="ti ti-user text-lg sm:hidden"></i>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isDropdownOpen"
          @click.stop
          class="absolute right-0 mt-3 w-[90vw] max-w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-4 px-5 text-gray-800 z-50"
        >
          <!-- User Profile Info -->
          <div
            v-if="authStore.user"
            class="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4"
          >
            <img
              v-if="authStore.user.image"
              :src="authStore.user.image"
              alt="User Profile"
              class="w-10 h-10 rounded-full object-cover border border-gray-200"
            />

            <div class="flex flex-col text-left overflow-hidden">
              <span
                class="text-sm font-semibold text-gray-800 leading-tight truncate"
              >
                {{
                  authStore.user.firstName
                    ? `${authStore.user.firstName} ${authStore.user.lastName || ''}`
                    : authStore.user.username
                }}
              </span>

              <span class="text-xs text-gray-500 capitalize mt-0.5">
                {{ authStore.user.gender || 'User' }}
              </span>
            </div>
          </div>

          <!-- Sign Out Button -->
          <button
            @click="handleLogout"
            class="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#C0280C] hover:bg-[#A02008] active:bg-[#801806] rounded-md transition-colors cursor-pointer shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </div>

      <!-- My Cart -->
      <div
        class="flex items-center cursor-pointer hover:text-gray-300 transition-colors select-none"
      >
        <span class="hidden sm:block">My Cart</span>

        <i class="ti ti-shopping-cart text-lg sm:hidden"></i>

        <span
          class="relative ml-2.5 px-1.5 py-0.5 text-[13px] font-bold text-white bg-[#539077] rounded-[3px] flex items-center justify-center min-w-[24px] h-[20px] before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-[4px] before:border-transparent before:border-r-[#539077]"
        >
          26
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import SearchPanel from '@/components/ui/form/SearchPanel.vue'

const authStore = useAuthStore()

const isDropdownOpen = ref(false)

const toggleDropdown = (event: Event) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = async () => {
  closeDropdown()
  await authStore.logout()
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>