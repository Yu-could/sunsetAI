<template>
  <div class="min-h-screen font-size-wrapper" :data-font-size="fontSize">
    <div v-if="isDesktop">
      <router-view />
    </div>
    <div v-else>
      <nav v-if="!isEntry" class="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 md:top-0 md:bottom-auto">
        <div class="max-w-md mx-auto md:max-w-none">
          <ul class="flex justify-around items-center h-16 md:h-14">
            <li v-for="item in currentNavItems" :key="item.path">
              <router-link :to="item.path" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors" :class="{ active: $route.name === item.name }">
                <component :is="iconComponents[item.icon]" class="w-6 h-6 mb-1" />
                <span class="nav-label">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <main :class="isEntry ? '' : 'pb-20 md:pb-0 md:pt-16'">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, HeartIcon, DeviceTabletIcon, ExclamationTriangleIcon, CogIcon, ChatBubbleLeftIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { useAppStore } from './stores/appStore'

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
  Link: LinkIcon
}

const isDesktop = computed(() => {
  return route.path.startsWith('/desktop')
})

const isEntry = computed(() => {
  return route.path === '/' || route.path.startsWith('/login') || route.path.startsWith('/realname')
})

const parentNavItems = [
  { path: "/parent", name: "Home", icon: "Home", label: "首页" },
  { path: "/health", name: "Health", icon: "Heart", label: "健康" },
  { path: "/medicine", name: "Medicine", icon: "Pill", label: "用药" },
  { path: "/sos", name: "SOS", icon: "AlertTriangle", label: "求助" },
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
  return window.location.pathname.startsWith('/child') ? childNavItems : parentNavItems
})

watch(fontSize, (newSize) => {
  document.documentElement.className = 'font-' + newSize
})

onMounted(() => {
  store.loadAppSettings()
  if (store.appSettings?.fontSize) {
    fontSize.value = store.appSettings.fontSize
    document.documentElement.className = 'font-' + fontSize.value
  }
})
</script>

<style scoped>
.active { color: #d35400; }
</style>
