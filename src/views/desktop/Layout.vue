﻿<template>
  <div class="min-h-screen bg-gray-100 flex">
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center text-white text-xl">🌅</div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">夕阳智语</h1>
            <p class="text-sm text-gray-500">SunsetAI</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <router-link :to="item.path" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors" :class="{ 'bg-orange-50 text-orange-600': $route.name === item.name }">
              <span class="text-xl">{{ item.icon }}</span>
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3 px-4 py-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">👴</div>
          <div>
            <p class="font-medium text-gray-800">父母用户</p>
            <p class="text-sm text-gray-500">{{ store.connectedChildren.length > 0 ? '已连接' + store.connectedChildren.length + '位子女' : '未连接子女' }}</p>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const navItems = [
  { path: '/desktop', name: 'DesktopHome', icon: '🏠', label: '首页' },
  { path: '/desktop/memories', name: 'DesktopMemories', icon: '📖', label: '回忆录' },
  { path: '/desktop/diet', name: 'DesktopDiet', icon: '🍜', label: '饮食管理' },
  { path: '/desktop/safety', name: 'DesktopSafety', icon: '✅', label: '平安签到' },
  { path: '/desktop/family', name: 'DesktopFamily', icon: '👨‍👩‍👧', label: '亲情连接' },
  { path: '/', name: 'Home', icon: '📱', label: '移动端入口' }
]

onMounted(() => {
  store.loadConnectedChildren()
})
</script>
