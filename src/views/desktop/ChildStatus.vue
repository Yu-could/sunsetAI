<template>
  <div class="min-h-screen bg-gray-100 flex">
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white">
            <SunIcon class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">夕阳智语</h1>
            <p class="text-sm text-gray-500">子女端</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <router-link :to="item.path" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors" :class="{ 'bg-blue-50 text-blue-600': $route.name === item.name }">
              <component :is="iconComponents[item.icon]" class="w-5 h-5" />
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3 px-4 py-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon class="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p class="font-medium text-gray-800">子女用户</p>
            <p class="text-sm text-gray-500">{{ store.connectedParents.length > 0 ? '已连接' + store.connectedParents.length + '位父母' : '未连接父母' }}</p>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 overflow-auto p-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <HeartIcon class="w-7 h-7 text-red-500" />
          健康状态
        </h2>
        <p class="text-gray-500 mt-1">查看父母的健康数据和活动记录</p>
      </div>
      <div v-if="store.connectedParents.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div v-for="(parent, index) in store.connectedParents" :key="index" class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <UserIcon class="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">{{ parent.name }}</h3>
              <p class="text-gray-500">{{ parent.relation }}</p>
            </div>
            <div class="ml-auto">
              <span :class="parent.online ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'" class="px-4 py-2 rounded-full font-medium">{{ parent.online ? '在线' : '离线' }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-gray-400">-</p>
              <p class="text-sm text-gray-500 mt-1">健康评分</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-gray-400">{{ store.signInRecords.length }}</p>
              <p class="text-sm text-gray-500 mt-1">签到天数</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-3xl font-bold text-gray-400">-</p>
              <p class="text-sm text-gray-500 mt-1">今日热量</p>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 mb-3">本周签到情况</h4>
            <div class="flex items-end gap-3 h-24">
              <div v-for="day in weekDays" :key="day" class="flex-1 bg-gray-200 rounded-t-lg flex flex-col items-center">
                <div class="w-full bg-gray-300 rounded-t-lg mb-1" style="height: 0%"></div>
                <span class="text-xs text-gray-500">{{ day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <UsersIcon class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500">暂无父母健康数据</p>
        <p class="text-sm text-gray-400">请先连接父母</p>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">最近活动记录</h3>
        <div v-if="store.signInRecords.length > 0" class="space-y-4">
          <div v-for="(record, index) in store.signInRecords.slice(-5)" :key="index" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon class="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p class="font-medium text-gray-800">完成平安签到</p>
                <p class="text-sm text-gray-500">{{ formatTime(record.timestamp) }}</p>
              </div>
            </div>
            <span class="text-green-500 text-sm">正常</span>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <ClipboardDocumentIcon class="w-8 h-8 text-indigo-500" />
          </div>
          <p>暂无活动记录</p>
          <p class="text-sm">父母签到后会显示在这里</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { SunIcon, HomeIcon, HeartIcon, ChatBubbleLeftIcon, LinkIcon, UsersIcon, UserIcon, CheckCircleIcon, ClipboardDocumentIcon } from '@heroicons/vue/24/solid'

const store = useAppStore()

const iconComponents = {
  Home: HomeIcon,
  Heart: HeartIcon,
  Message: ChatBubbleLeftIcon,
  Link: LinkIcon,
  Users: UsersIcon,
  User: UserIcon
}

const navItems = [
  { path: '/desktop/child', name: 'DesktopChildHome', icon: 'Home', label: '首页' },
  { path: '/desktop/child/status', name: 'DesktopChildStatus', icon: 'Heart', label: '健康状态' },
  { path: '/desktop/child/messages', name: 'DesktopChildMessages', icon: 'Message', label: '消息通知' },
  { path: '/desktop/child/connect', name: 'DesktopChildConnect', icon: 'Link', label: '连接管理' },
  { path: '/desktop', name: 'DesktopHome', icon: 'User', label: '父母端' },
  { path: '/parent', name: 'Home', icon: 'Users', label: '父母移动端' }
]

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onMounted(() => {
  store.loadConnectedParents()
  store.loadSignInRecords()
})
</script>
