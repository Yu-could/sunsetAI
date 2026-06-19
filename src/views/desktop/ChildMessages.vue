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
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ChatBubbleLeftIcon class="w-7 h-7 text-green-500" />
            消息通知
          </h2>
          <p class="text-gray-500 mt-1">接收父母的消息和系统提醒</p>
        </div>
        <button @click="loadMessages" class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          <ArrowPathIcon class="w-4 h-4" />
          <span>刷新</span>
        </button>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1 bg-white rounded-xl shadow-md">
          <div class="p-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-800">消息列表</h3>
          </div>
          <div class="divide-y divide-gray-100">
            <div v-if="store.familyMessages.length > 0">
              <div v-for="(msg, index) in store.familyMessages" :key="index" class="p-4 hover:bg-gray-50 cursor-pointer" :class="{ 'bg-blue-50': selectedIndex === index }" @click="selectMessage(index)">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <UserIcon class="w-5 h-5 text-gray-500" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-800">{{ msg.name || '系统通知' }}</span>
                      <span class="text-xs text-gray-400">{{ formatTime(msg.time) }}</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1 truncate">{{ msg.content }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="p-8 text-center text-gray-400">
              <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ChatBubbleLeftIcon class="w-8 h-8 text-blue-500" />
              </div>
              <p>暂无消息</p>
              <p class="text-sm">连接父母后接收消息</p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-2 bg-white rounded-xl shadow-md flex flex-col">
          <div v-if="selectedMessage" class="flex-1 flex flex-col">
            <div class="p-4 border-b border-gray-200 flex items-center gap-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                <UserIcon class="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">{{ selectedMessage.name || '系统通知' }}</h4>
                <p class="text-sm text-gray-500">消息</p>
              </div>
            </div>
            <div class="flex-1 p-6 overflow-auto">
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <UserIcon class="w-5 h-5 text-gray-500" />
                  </div>
                  <div class="bg-gray-100 rounded-lg rounded-tl-none p-4 max-w-md">
                    <p class="text-gray-700">{{ selectedMessage.content }}</p>
                    <p class="text-xs text-gray-400 mt-2">{{ formatTime(selectedMessage.time) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4 border-t border-gray-200">
              <div class="flex gap-3">
                <input type="text" v-model="replyText" placeholder="输入消息..." class="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500">
                <button @click="sendReply" class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">发送</button>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-gray-400">
            <div class="text-center">
              <div class="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftIcon class="w-12 h-12 text-blue-500" />
              </div>
              <p>选择一条消息查看详情</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { SunIcon, HomeIcon, HeartIcon, ChatBubbleLeftIcon, LinkIcon, UsersIcon, UserIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'

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

const selectedIndex = ref(-1)
const replyText = ref('')

const selectedMessage = ref(null)

const selectMessage = (index) => {
  selectedIndex.value = index
  selectedMessage.value = store.familyMessages[index]
}

const loadMessages = () => {
  store.loadFamilyMessages()
}

const sendReply = () => {
  if (replyText.value.trim()) {
    replyText.value = ''
    alert('消息已发送')
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

onMounted(() => {
  store.loadFamilyMessages()
})
</script>
