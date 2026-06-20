<template>
  <div class="min-h-screen font-size-wrapper" :data-font-size="fontSize">
    <Toast />
    <Onboarding ref="onboardingRef" />
    <div v-if="isDesktop">
      <router-view />
    </div>
    <div v-else>
      <nav v-if="!isEntry" class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 md:top-0 md:bottom-auto border-t border-gray-100">
        <div class="max-w-md mx-auto md:max-w-none">
          <ul class="flex justify-around items-center h-16 md:h-14">
            <li v-for="item in currentNavItems" :key="item.path">
              <router-link :to="item.path" class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-parent transition-colors" :class="{ active: $route.name === item.name }">
                <component :is="iconComponents[item.icon]" class="w-6 h-6 mb-1" />
                <span class="nav-label text-xs">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <main :class="isEntry ? '' : 'pb-20 md:pb-0 md:pt-16'">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
      <!-- 全局SOS悬浮按钮 - 仅在父母端非入口页面显示 -->
      <FabSOS v-if="isParentRoute && !isEntry" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, HeartIcon, DeviceTabletIcon, ExclamationTriangleIcon, CogIcon, ChatBubbleLeftIcon, LinkIcon, UsersIcon } from '@heroicons/vue/24/solid'
import { useAppStore } from './stores/appStore'
import Toast from './components/Toast.vue'
import FabSOS from './components/FabSOS.vue'
import Onboarding from './components/Onboarding.vue'

const route = useRoute()
const store = useAppStore()

const fontSize = ref('medium')

const iconComponents = {
  Home: HomeIcon,
  Heart: HeartIcon,
  Pill: DeviceTabletIcon,
  AlertTriangle: ExclamationTriangleIcon,
  Settings: CogIcon,
  MessageCircle: ChatBubbleLeftIcon,
  Link: LinkIcon,
  Users: UsersIcon
}

const isDesktop = computed(() => {
  return route.path.startsWith('/desktop')
})

const isEntry = computed(() => {
  return route.path === '/' || route.path.startsWith('/login') || route.path.startsWith('/realname')
})

const isParentRoute = computed(() => {
  const parentPaths = ['/parent', '/health', '/medicine', '/memories', '/diet', '/safety', '/family', '/schedule', '/sos', '/settings']
  return parentPaths.includes(route.path)
})

const parentNavItems = [
  { path: "/parent", name: "Home", icon: "Home", label: "首页" },
  { path: "/health", name: "Health", icon: "Heart", label: "健康" },
  { path: "/medicine", name: "Medicine", icon: "Pill", label: "用药" },
  { path: "/family", name: "Family", icon: "Users", label: "家人" },
  { path: "/settings", name: "Settings", icon: "Settings", label: "设置" }
]

const childNavItems = [
  { path: "/child", name: "ChildHome", icon: "Home", label: "首页" },
  { path: "/child/status", name: "ChildStatus", icon: "Heart", label: "状态" },
  { path: "/child/messages", name: "ChildMessages", icon: "MessageCircle", label: "消息" },
  { path: "/child/connect", name: "ChildConnect", icon: "Link", label: "连接" },
  { path: "/", name: "Entry", icon: "Home", label: "入口" }
]

const currentNavItems = computed(() => {
  return route.path.startsWith('/child') ? childNavItems : parentNavItems
})

// 应用字体大小到 DOM
const applyFontSize = (size) => {
  document.documentElement.className = 'font-' + size
}

// 监听路由变化，每次都应用字体设置
watch(route, () => {
  store.loadAppSettings()
  if (store.appSettings?.fontSize) {
    fontSize.value = store.appSettings.fontSize
    applyFontSize(fontSize.value)
  }
})

// 监听字体大小变化
watch(fontSize, (newSize) => {
  applyFontSize(newSize)
})

onMounted(() => {
  store.loadAppSettings()
  if (store.appSettings?.fontSize) {
    fontSize.value = store.appSettings.fontSize
    applyFontSize(fontSize.value)
  }
})
</script>

<style scoped>
.active { color: #E8843C; }

/* 页面过渡动画 */
.page-enter-active {
  animation: pageIn 0.25s ease;
}
.page-leave-active {
  animation: pageOut 0.15s ease;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pageOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.nav-label {
  font-size: 0.65rem;
}
</style>
