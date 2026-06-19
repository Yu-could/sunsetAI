<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">平安签到</h2>
        <p class="text-gray-500 mt-1">每日签到，让家人放心</p>
      </div>
      <button @click="signIn" :disabled="isSignedInToday" class="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
        <span class="text-xl">✅</span>
        <span>{{ isSignedInToday ? '今日已签到' : '立即签到' }}</span>
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
        <p class="text-gray-500 text-sm">今日状态</p>
        <p :class="isSignedInToday ? 'text-green-500' : 'text-gray-400'" class="text-2xl font-bold mt-2">{{ isSignedInToday ? '已签到' : '未签到' }}</p>
        <p class="text-gray-400 text-sm mt-1">{{ lastSignInTime }}</p>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📅</div>
        <p class="text-gray-500 text-sm">连续签到</p>
        <p class="text-2xl font-bold text-gray-400 mt-2">{{ store.signInRecords.length }}</p>
        <p class="text-gray-400 text-sm mt-1">天</p>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎯</div>
        <p class="text-gray-500 text-sm">本月完成</p>
        <p class="text-2xl font-bold text-gray-400 mt-2">{{ store.signInRecords.length }}/{{ daysInMonth }}</p>
        <p class="text-gray-400 text-sm mt-1">{{ Math.round((store.signInRecords.length / daysInMonth) * 100) }}% 完成率</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">签到日历</h3>
        <div class="grid grid-cols-7 gap-2">
          <div class="text-center text-gray-500 text-sm font-medium py-2">日</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">一</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">二</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">三</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">四</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">五</div>
          <div class="text-center text-gray-500 text-sm font-medium py-2">六</div>
          <div v-for="(day, index) in calendarDays" :key="index" class="aspect-square flex items-center justify-center rounded-lg text-sm font-medium" :class="day.class">
            {{ day.date }}
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">签到记录</h3>
        <div v-if="store.signInRecords.length > 0" class="space-y-4">
          <div v-for="(record, index) in store.signInRecords.slice(-5)" :key="index" class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✅</div>
              <div>
                <p class="font-medium text-gray-800">{{ formatDate(record.timestamp) }}</p>
                <p class="text-sm text-gray-500">{{ formatTime(record.timestamp) }}</p>
              </div>
            </div>
            <span class="text-green-500 text-sm">已完成</span>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="text-3xl mb-2">📅</div>
          <p>暂无签到记录</p>
          <p class="text-sm">点击上方按钮开始签到</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const daysInMonth = computed(() => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
})

const isSignedInToday = computed(() => {
  const today = new Date().toDateString()
  return store.signInRecords.some(record => {
    return new Date(record.timestamp).toDateString() === today
  })
})

const lastSignInTime = computed(() => {
  if (store.signInRecords.length === 0) return '等待签到'
  const lastRecord = store.signInRecords[store.signInRecords.length - 1]
  const date = new Date(lastRecord.timestamp)
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  return '等待签到'
})

const calendarDays = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const today = now.getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = daysInMonth.value
  
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: '', class: 'text-gray-200' })
  }
  
  for (let i = 1; i <= totalDays; i++) {
    let cls = 'text-gray-600'
    const recordDate = new Date(year, month, i).toDateString()
    const hasRecord = store.signInRecords.some(record => {
      return new Date(record.timestamp).toDateString() === recordDate
    })
    
    if (hasRecord) {
      cls = 'bg-green-100 text-green-700'
    }
    if (i === today) {
      cls = hasRecord ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700'
    }
    
    days.push({ date: i, class: cls })
  }
  
  return days
})

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return '今日签到'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨日签到'
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const signIn = () => {
  if (!isSignedInToday.value) {
    store.addSignInRecord({
      timestamp: Date.now()
    })
    alert('签到成功！家人已收到通知')
  }
}

onMounted(() => {
  store.loadSignInRecords()
})
</script>
