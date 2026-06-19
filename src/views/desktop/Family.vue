<template>
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
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">👵</div>
          <div>
            <p class="font-medium text-gray-800">父母用户</p>
            <p class="text-sm text-gray-500">{{ store.connectedChildren.length > 0 ? '已连接' + store.connectedChildren.length + '位子女' : '未连接子女' }}</p>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 overflow-auto p-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">亲情连接</h2>
          <p class="text-gray-500 mt-1">与家人保持联系，分享生活点滴</p>
        </div>
        <button @click="showInviteCode = true" class="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <span class="text-xl">🔗</span>
          <span>添加子女</span>
        </button>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="store.connectedChildren.length > 0">
            <div v-for="(child, index) in store.connectedChildren" :key="index" class="bg-white rounded-xl shadow-md p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-2xl">{{ child.avatar || '👧' }}</div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ child.name || '子女' }}</h3>
                    <p class="text-sm text-gray-500">{{ child.relation || '子女' }}</p>
                  </div>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">已连接</span>
              </div>
              <div class="flex items-center gap-4">
                <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <span>📞</span>
                  <span>通话</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <span>💬</span>
                  <span>消息</span>
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-4">最近联系: {{ formatTime(child.lastContact) }}</p>
            </div>
          </div>
          <div v-else class="bg-white rounded-xl shadow-md p-6 text-center">
            <div class="text-4xl mb-3">👨‍👩‍👧</div>
            <p class="text-gray-500">暂无已连接的子女</p>
            <p class="text-sm text-gray-400">点击上方按钮获取邀请码添加子女</p>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">连接邀请码</h3>
          <div class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 text-center">
            <p class="text-gray-600 text-sm mb-3">子女可通过此邀请码连接您</p>
            <div class="text-3xl font-bold text-purple-600 tracking-wider mb-4">{{ store.inviteCode }}</div>
            <button @click="copyInviteCode" class="flex items-center justify-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors mx-auto">
              <span>📋</span>
              <span>复制邀请码</span>
            </button>
          </div>
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">
              <span class="font-medium">💡 使用说明：</span>
              <br>1. 将邀请码告诉您的子女
              <br>2. 子女在应用中输入邀请码
              <br>3. 确认连接后即可建立亲情关系
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">消息记录</h3>
          <div v-if="store.familyMessages.length > 0" class="space-y-4">
            <div v-for="(message, index) in store.familyMessages.slice(-5)" :key="index" class="flex items-start gap-3 p-4 rounded-lg" :class="message.isMe ? 'bg-orange-50 ml-auto' : 'bg-gray-50'">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="message.isMe ? 'bg-gray-200' : 'bg-orange-100'">{{ message.isMe ? '👵' : (message.avatar || '👧') }}</div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-gray-800">{{ message.isMe ? '我' : (message.name || '子女') }}</span>
                  <span class="text-sm text-gray-500">{{ formatTime(message.timestamp) }}</span>
                </div>
                <p class="text-gray-600 mt-1">{{ message.content }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-400">
            <div class="text-3xl mb-2">💬</div>
            <p>暂无消息记录</p>
            <p class="text-sm">连接子女后可以发送消息</p>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">通知设置</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">签到提醒</p>
                <p class="text-sm text-gray-500">每天早上 8:00 提醒签到</p>
              </div>
              <div class="w-12 h-6 bg-green-500 rounded-full relative">
                <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
              </div>
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">健康预警</p>
                <p class="text-sm text-gray-500">异常情况自动通知子女</p>
              </div>
              <div class="w-12 h-6 bg-green-500 rounded-full relative">
                <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
              </div>
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">消息通知</p>
                <p class="text-sm text-gray-500">接收子女发来的消息</p>
              </div>
              <div class="w-12 h-6 bg-green-500 rounded-full relative">
                <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
              </div>
            </div>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">饮食提醒</p>
                <p class="text-sm text-gray-500">三餐时间提醒</p>
              </div>
              <div class="w-12 h-6 bg-gray-300 rounded-full relative">
                <div class="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div v-if="showInviteCode" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">添加子女</h3>
        <div class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 text-center mb-4">
          <p class="text-gray-600 text-sm mb-3">您的邀请码</p>
          <div class="text-3xl font-bold text-purple-600 tracking-wider">{{ store.inviteCode }}</div>
        </div>
        <p class="text-gray-500 text-sm mb-4">将此邀请码告诉您的子女，子女在应用中输入邀请码即可建立连接。</p>
        <button @click="showInviteCode = false" class="w-full py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const showInviteCode = ref(false)

const navItems = [
  { path: '/desktop', name: 'DesktopHome', icon: '🏠', label: '首页' },
  { path: '/desktop/memories', name: 'DesktopMemories', icon: '📖', label: '回忆录' },
  { path: '/desktop/diet', name: 'DesktopDiet', icon: '🍜', label: '饮食管理' },
  { path: '/desktop/safety', name: 'DesktopSafety', icon: '✅', label: '平安签到' },
  { path: '/desktop/family', name: 'DesktopFamily', icon: '👨‍👩‍👧', label: '亲情连接' },
  { path: '/parent', name: 'Home', icon: '📱', label: '父母移动端' }
]

const formatTime = (timestamp) => {
  if (!timestamp) return '暂无联系'
  const date = new Date(timestamp)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const copyInviteCode = () => {
  navigator.clipboard.writeText(store.inviteCode).then(() => {
    alert('邀请码已复制到剪贴板')
  })
}

onMounted(() => {
  store.loadConnectedChildren()
  store.loadFamilyMessages()
})
</script>