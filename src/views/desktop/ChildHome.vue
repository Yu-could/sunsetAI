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
        <h2 class="text-2xl font-bold text-gray-800">欢迎回来</h2>
        <p class="text-gray-500 mt-1">随时关注父母的健康状况</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">父母健康评分</p>
              <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
              <p class="text-gray-400 text-sm mt-1">{{ store.connectedParents.length > 0 ? '等待数据' : '请连接父母' }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <HeartIcon class="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">今日签到</p>
              <p class="text-3xl font-bold text-gray-400 mt-2">{{ store.signInRecords.length }}</p>
              <p class="text-gray-400 text-sm mt-1">人</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon class="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">未读消息</p>
              <p class="text-3xl font-bold text-gray-400 mt-2">{{ store.familyMessages.length }}</p>
              <p class="text-gray-400 text-sm mt-1">条</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ChatBubbleLeftIcon class="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">已连接父母</p>
              <p class="text-3xl font-bold text-gray-400 mt-2">{{ store.connectedParents.length }}</p>
              <p class="text-gray-400 text-sm mt-1">人</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <UsersIcon class="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">父母状态概览</h3>
          <div v-if="store.connectedParents.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(parent, index) in store.connectedParents" :key="index" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                    <UserIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ parent.name }}</p>
                    <p class="text-sm text-gray-500">{{ parent.relation }}</p>
                  </div>
                </div>
                <span :class="parent.online ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'" class="px-3 py-1 rounded-full text-sm">{{ parent.online ? '在线' : '离线' }}</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <p class="text-lg font-bold text-gray-400">-</p>
                  <p class="text-xs text-gray-500">健康评分</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-bold text-gray-400">-</p>
                  <p class="text-xs text-gray-500">今日签到</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-bold text-gray-400">-</p>
                  <p class="text-xs text-gray-500">今日热量</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-400">
            <div class="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <UsersIcon class="w-10 h-10" />
            </div>
            <p>暂无父母状态</p>
            <p class="text-sm">请先连接父母</p>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">最近消息</h3>
          <div v-if="store.familyMessages.length > 0" class="space-y-3">
            <div v-for="(msg, index) in store.familyMessages.slice(-3)" :key="index" class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <UserIcon class="w-4 h-4 text-gray-500" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-800 text-sm">{{ msg.name || '系统通知' }}</p>
                <p class="text-gray-600 text-sm">{{ msg.content }}</p>
              </div>
              <span class="text-xs text-gray-400">{{ msg.time || '刚刚' }}</span>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400">
            <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <ChatBubbleLeftIcon class="w-8 h-8 text-blue-500" />
            </div>
            <p>暂无消息</p>
            <p class="text-sm">连接父母后接收消息</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { SunIcon, HomeIcon, HeartIcon, ChatBubbleLeftIcon, LinkIcon, UsersIcon, UserIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'

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

onMounted(() => {
  store.loadConnectedParents()
  store.loadSignInRecords()
  store.loadFamilyMessages()
})
</script>
