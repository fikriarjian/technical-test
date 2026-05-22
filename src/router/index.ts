import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  history: createWebHistory((import.meta as any).env.BASE_URL),
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
  const isAuthenticated = authStore.isAuthenticated || !!localStorage.getItem('token')

  // Check if the destination route or any of its parent routes require auth middleware
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

export default router

