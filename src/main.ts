import { createApp } from 'vue'
// @ts-ignore: Allow side-effect import of CSS without type declarations
import '@/assets/css/style.css'
// @ts-ignore: Allow side-effect import of CSS without type declarations
import '@tabler/icons-webfont/dist/tabler-icons.min.css'
import App from '@/App.vue'

const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
// router
import router from '@/router'
app.use(router)
// ApiService
import ApiService from '@/services/ApiService'
ApiService.init(app)
// Toastify
import Vue3Toastify from 'vue3-toastify'
// @ts-ignore: Allow side-effect import of CSS without type declarations
import 'vue3-toastify/dist/index.css'

app.use(Vue3Toastify)
app.mount('#app')
