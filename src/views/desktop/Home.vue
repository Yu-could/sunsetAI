<template>
  <div class="p-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800">欢迎回来</h2>
      <p class="text-gray-500 mt-1">今天是美好的一天，祝您身体健康</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">健康评分</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">等待数据</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">❤️</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">本月签到</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">{{ store.signInRecords.length }}</p>
            <p class="text-gray-400 text-sm mt-1">天</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日热量</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">千卡</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🍜</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">已连接子女</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">{{ store.connectedChildren.length }}</p>
            <p class="text-gray-400 text-sm mt-1">人</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">👨‍👩‍👧</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">最近活动</h3>
        <div v-if="store.signInRecords.length > 0 || store.dietRecords.length > 0" class="space-y-4">
          <div v-for="(record, index) in allActivities.slice(-5)" :key="index" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{{ record.icon }}</div>
            <div class="flex-1">
              <p class="font-medium text-gray-800">{{ record.title }}</p>
              <p class="text-sm text-gray-500">{{ formatTime(record.timestamp) }}</p>
            </div>
            <p class="text-gray-600">{{ record.detail }}</p>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="text-3xl mb-2">📋</div>
          <p>暂无活动记录</p>
          <p class="text-sm">开始使用后会显示在这里</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">快捷功能</h3>
        <div class="grid grid-cols-2 gap-4">
          <button @click="goToPage('/desktop/memories')" class="flex flex-col items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <span class="text-3xl mb-2">🎤</span>
            <span class="text-sm font-medium text-gray-700">语音录入</span>
          </button>
          <button @click="goToPage('/desktop/safety')" class="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <span class="text-3xl mb-2">✅</span>
            <span class="text-sm font-medium text-gray-700">平安签到</span>
          </button>
          <button @click="goToPage('/desktop/family')" class="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <span class="text-3xl mb-2">📞</span>
            <span class="text-sm font-medium text-gray-700">联系子女</span>
          </button>
          <button class="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <span class="text-3xl mb-2">⚙️</span>
            <span class="text-sm font-medium text-gray-700">设置</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/appStore'

const router = useRouter()
const store = useAppStore()

const goToPage = (path) => {
  router.push(path)
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const allActivities = computed(() => {
  const activities = []
  store.signInRecords.forEach(record => {
    activities.push({
      icon: '✅',
      title: '平安签到',
      detail: '已完成',
      timestamp: record.timestamp
    })
  })
  store.dietRecords.forEach(record => {
    activities.push({
      icon: '🍜',
      title: '饮食记录',
      detail: record.content,
      timestamp: record.timestamp
    })
  })
  return activities.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
})

onMounted(() => {
  store.loadSignInRecords()
  store.loadDietRecords()
  store.loadConnectedChildren()
})
</script>
