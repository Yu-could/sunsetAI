<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">欢迎回来</h2>
      <p class="text-gray-500 text-sm mt-1">今天是美好的一天，祝您身体健康</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">健康评分</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">-</p>
            <p class="text-gray-400 text-xs mt-0.5">等待数据</p>
          </div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">❤️</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">本月签到</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">{{ store.signInRecords.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">天</p>
          </div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">今日热量</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">-</p>
            <p class="text-gray-400 text-xs mt-0.5">千卡</p>
          </div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">🍜</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">已连接子女</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">{{ store.connectedChildren.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">人</p>
          </div>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">👨‍👩‍👧</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
        <h3 class="text-base font-semibold text-gray-800 mb-3">最近活动</h3>
        <div v-if="store.signInRecords.length > 0 || store.dietRecords.length > 0" class="space-y-3">
          <div v-for="(record, index) in allActivities.slice(-5)" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">{{ record.icon }}</div>
            <div class="flex-1">
              <p class="font-medium text-gray-800 text-sm">{{ record.title }}</p>
              <p class="text-xs text-gray-500">{{ formatTime(record.timestamp) }}</p>
            </div>
            <p class="text-gray-600 text-sm">{{ record.detail }}</p>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-400">
          <div class="text-2xl mb-1">📋</div>
          <p class="text-sm">暂无活动记录</p>
          <p class="text-xs">开始使用后会显示在这里</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <h3 class="text-base font-semibold text-gray-800 mb-3">快捷功能</h3>
        <div class="grid grid-cols-2 gap-3">
          <button @click="goToPage('/desktop/memories')" class="flex flex-col items-center justify-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <span class="text-2xl mb-1">🎤</span>
            <span class="text-xs font-medium text-gray-700">语音录入</span>
          </button>
          <button @click="goToPage('/desktop/safety')" class="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <span class="text-2xl mb-1">✅</span>
            <span class="text-xs font-medium text-gray-700">平安签到</span>
          </button>
          <button @click="goToPage('/desktop/family')" class="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <span class="text-2xl mb-1">📞</span>
            <span class="text-xs font-medium text-gray-700">联系子女</span>
          </button>
          <button class="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <span class="text-2xl mb-1">⚙️</span>
            <span class="text-xs font-medium text-gray-700">设置</span>
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