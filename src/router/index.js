import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Entry',
    component: () => import('../views/Entry.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/realname',
    name: 'RealName',
    component: () => import('../views/RealName.vue')
  },
  {
    path: '/parent',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/memories',
    name: 'Memories',
    component: () => import('../views/Memories.vue')
  },
  {
    path: '/diet',
    name: 'Diet',
    component: () => import('../views/Diet.vue')
  },
  {
    path: '/safety',
    name: 'Safety',
    component: () => import('../views/Safety.vue')
  },
  {
    path: '/family',
    name: 'Family',
    component: () => import('../views/Family.vue')
  },
  {
    path: '/health',
    name: 'Health',
    component: () => import('../views/Health.vue')
  },
  {
    path: '/medicine',
    name: 'Medicine',
    component: () => import('../views/Medicine.vue')
  },
  {
    path: '/sos',
    name: 'SOS',
    component: () => import('../views/SOS.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/Schedule.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/child',
    name: 'ChildHome',
    component: () => import('../views/ChildHome.vue')
  },
  {
    path: '/child/status',
    name: 'ChildStatus',
    component: () => import('../views/ChildStatus.vue')
  },
  {
    path: '/child/connect',
    name: 'ChildConnect',
    component: () => import('../views/ChildConnect.vue')
  },
  {
    path: '/child/messages',
    name: 'ChildMessages',
    component: () => import('../views/ChildMessages.vue')
  },
  {
    path: '/desktop',
    name: 'DesktopHome',
    component: () => import('../views/desktop/Home.vue')
  },
  {
    path: '/desktop/memories',
    name: 'DesktopMemories',
    component: () => import('../views/desktop/Memories.vue')
  },
  {
    path: '/desktop/diet',
    name: 'DesktopDiet',
    component: () => import('../views/desktop/Diet.vue')
  },
  {
    path: '/desktop/safety',
    name: 'DesktopSafety',
    component: () => import('../views/desktop/Safety.vue')
  },
  {
    path: '/desktop/family',
    name: 'DesktopFamily',
    component: () => import('../views/desktop/Family.vue')
  },
  {
    path: '/desktop/health',
    name: 'DesktopHealth',
    component: () => import('../views/Health.vue')
  },
  {
    path: '/desktop/medicine',
    name: 'DesktopMedicine',
    component: () => import('../views/Medicine.vue')
  },
  {
    path: '/desktop/schedule',
    name: 'DesktopSchedule',
    component: () => import('../views/Schedule.vue')
  },
  {
    path: '/desktop/sos',
    name: 'DesktopSOS',
    component: () => import('../views/SOS.vue')
  },
  {
    path: '/desktop/child',
    name: 'DesktopChildHome',
    component: () => import('../views/desktop/ChildHome.vue')
  },
  {
    path: '/desktop/child/status',
    name: 'DesktopChildStatus',
    component: () => import('../views/desktop/ChildStatus.vue')
  },
  {
    path: '/desktop/child/messages',
    name: 'DesktopChildMessages',
    component: () => import('../views/desktop/ChildMessages.vue')
  },
  {
    path: '/desktop/child/connect',
    name: 'DesktopChildConnect',
    component: () => import('../views/desktop/ChildConnect.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/logo-showcase',
    name: 'LogoShowcase',
    component: () => import('../views/LogoShowcase.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPaths = ['/', '/login', '/realname', '/logo-showcase']
  const isPublicPath = publicPaths.includes(to.path)
  const loginStatus = JSON.parse(localStorage.getItem('sunsetai_login_status') || '{}')

  if (to.path === '/admin') {
    if (loginStatus.isLoggedIn && loginStatus.isAdmin) {
      next()
    } else {
      next('/')
    }
  } else if (!isPublicPath && !loginStatus.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
