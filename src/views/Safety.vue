<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="safety" size="lg" class="text-green-500" /> 平安签到
      </h1>
      <p class="text-gray-500">每天签到，家人放心</p>
    </header>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
      <div :class="isSigned ? 'text-green-500' : 'text-orange-500'" class="text-6xl mb-4">{{ isSigned ? '✅' : '⏳' }}</div>
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ isSigned ? '今日已签到' : '请点击签到' }}</h2>
      <p class="text-gray-500 mb-6">{{ isSigned ? '感谢您的使用，家人已知晓您今日状态良好' : '点击下方按钮完成今日签到' }}</p>
      <button v-if="!isSigned" @click="handleSign" class="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow">点击签到</button>
      <div v-else class="flex justify-center gap-2"><span class="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">签到时间: {{ signTime }}</span></div>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">签到记录</h3>
      <div class="space-y-3">
        <div v-for="(record, index) in store.signInRecords.slice(-7)" :key="index" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-3">
            <span class="text-green-500 text-xl">✅</span>
            <span class="text-gray-700">{{ formatDate(record.timestamp) }}</span>
          </div>
          <span class="text-gray-400 text-sm">{{ formatTime(record.timestamp) }}</span>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-100"><p class="text-gray-500 text-sm">本月签到次数: <span class="text-green-600 font-bold text-lg">{{ store.signInRecords.length }}</span> / 30</p></div>
    </div>
    <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-4">⚠️ 异常提醒</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between"><span>超时签到提醒</span><div class="flex items-center"><input type="checkbox" checked class="w-5 h-5 rounded mr-2"><span class="text-sm">已开启</span></div></div>
        <div class="flex items-center justify-between"><span>病情提醒</span><div class="flex items-center"><input type="checkbox" class="w-5 h-5 rounded mr-2"><span class="text-sm">未开启</span></div></div>
        <div class="flex items-center justify-between"><span>连接家人</span><div class="flex items-center"><input type="checkbox" checked class="w-5 h-5 rounded mr-2"><span class="text-sm">已连接</span></div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()

const isSigned = computed(() => {
  const todayStr = new Date().toDateString()
  return store.signInRecords.some(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  })
})

const signTime = computed(() => {
  const todayStr = new Date().toDateString()
  const todayRecord = store.signInRecords.find(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  })
  if (todayRecord) {
    return new Date(todayRecord.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  return ''
})

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const handleSign = () => {
  store.addSignInRecord({})
  alert('签到成功！家人已收到通知')
}

onMounted(() => {
  store.loadSignInRecords()
})
</script>
