<template>
  <div class="min-h-screen bg-bg flex">
    <aside class="w-64 bg-white shadow-lg flex flex-col flex-shrink-0">
      <!-- Logo 区域 -->
      <div class="p-5 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-gradient-to-br from-parent to-parent-hover rounded-xl flex items-center justify-center text-white shadow-md">
            <AppIcon name="sunset" size="lg" />
          </div>
          <div>
            <h1 class="text-lg font-bold text-text leading-tight">夕阳智语</h1>
            <p class="text-xs text-text-muted">SunsetAI · 桌面端</p>
          </div>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="flex-1 p-3 overflow-y-auto">
        <p class="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">主要功能</p>
        <ul class="space-y-1 mb-4">
          <li v-for="item in mainNavItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 hover:bg-parent-light hover:text-parent transition-all duration-200"
              :class="{ 'bg-parent-light text-parent font-semibold shadow-sm': $route.name === item.name }"
            >
              <span class="text-lg w-6 text-center">{{ item.icon }}</span>
              <span class="text-sm">{{ item.label }}</span>
              <span v-if="$route.name === item.name" class="ml-auto w-1.5 h-1.5 bg-parent rounded-full"></span>
            </router-link>
          </li>
        </ul>

        <p class="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">其他</p>
        <ul class="space-y-1">
          <li v-for="item in secondaryNavItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-500 hover:bg-parent-light hover:text-parent transition-all duration-200"
              :class="{ 'bg-parent-light text-parent font-semibold shadow-sm': $route.name === item.name }"
            >
              <span class="text-lg w-6 text-center">{{ item.icon }}</span>
              <span class="text-sm">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 底部用户信息 -->
      <div class="p-3 border-t border-gray-100">
        <router-link to="/realname" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-parent-light transition-colors cursor-pointer">
          <UserAvatar role="parent" size="md" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-text truncate">{{ displayName }}</p>
            <p class="text-xs text-text-muted truncate">
              {{ store.connectedChildren.length > 0 ? '已连接 ' + store.connectedChildren.length + ' 位子女' : '未连接子女' }}
            </p>
        </router-link>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'
import AppIcon from '../../components/AppIcon.vue'
import UserAvatar from '../../components/UserAvatar.vue'

const store = useAppStore()

const displayName = computed(() => {
  const name = store.realNameInfo?.realName || store.userProfile?.realName
  return name || '父母用户'
})

const mainNavItems = [
  { path: '/desktop', name: 'DesktopHome', icon: '🏠', label: '首页' },
  { path: '/desktop/safety', name: 'DesktopSafety', icon: '✅', label: '平安签到' },
  { path: '/desktop/diet', name: 'DesktopDiet', icon: '🍜', label: '饮食管理' },
  { path: '/desktop/memories', name: 'DesktopMemories', icon: '📖', label: '回忆录' },
  { path: '/desktop/family', name: 'DesktopFamily', icon: '👨‍👩‍👧', label: '亲情连接' }
]

const secondaryNavItems = [
  { path: '/medicine', name: 'Medicine', icon: '💊', label: '用药提醒' },
  { path: '/health', name: 'Health', icon: '❤️', label: '健康监测' },
  { path: '/schedule', name: 'Schedule', icon: '📅', label: '日程提醒' },
  { path: '/sos', name: 'SOS', icon: '🚨', label: '紧急求助' },
  { path: '/settings', name: 'Settings', icon: '⚙️', label: '设置' }
]

onMounted(() => {
  store.loadConnectedChildren()
  store.loadRealNameInfo()
})
</script>
