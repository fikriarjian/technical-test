import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/sign-in',
  },

  //   Auth routes
  {
    path: '/sign-in',
    component: () => import('@/layouts/AuthLayouts.vue'),
    children: [
      {
        path: '/sign-in',
        name: 'sign-in',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
          pageTitle: 'signIn',
        },
      },
    ],
  },

  // Dashboard
  {
    path: '/',
    component: () => import('@/layouts/MainLayouts.vue'),
    meta: {
      middleware: 'auth',
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          pageTitle: 'dashboard',
          middleware: 'auth',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory('/technical-test/'),
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  appStore.showLoader()

  const isAuthenticated = authStore.isAuthenticated || !!localStorage.getItem('token')

  // Check if route requires auth
  const requiresAuth = to.matched.some((record) => record.meta.middleware === 'auth')

  if (requiresAuth) {
    if (!isAuthenticated) {
      next({ name: 'sign-in' })
    } else {
      next()
    }
  } else if (to.name === 'sign-in' && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

router.afterEach(() => {
  const appStore = useAppStore()

  setTimeout(() => {
    appStore.hideLoader()
  }, 500)
})

export default router
