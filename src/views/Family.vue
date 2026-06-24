﻿﻿﻿﻿﻿<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="family" size="lg" class="text-blue-500" /> 亲情连接
      </h1>
      <p class="text-gray-500">与子女同步信息</p>
    </header>
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4">🔗 邀请子女连接</h3>
      <div class="bg-white/20 rounded-xl p-4 mb-4">
        <p class="text-center text-sm text-blue-100 mb-2">您的邀请码</p>
        <p class="text-center text-3xl font-bold tracking-wider">{{ store.inviteCode }}</p>
      </div>
      <div class="flex gap-3">
        <button @click="copyInviteCode" class="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-colors">复制邀请码</button>
        <button @click="generateNewCode" class="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-colors">刷新</button>
      </div>
      <p class="text-center text-blue-100 text-sm mt-3">子女端输入此邀请码即可连接</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">连接的家人</h3>
      <div v-if="store.connectedParents.length > 0" class="space-y-3">
        <div v-for="(member, index) in store.connectedParents" :key="index" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">{{ member.avatar }}</div>
            <div><p class="font-bold text-gray-800">{{ member.name }}</p><p class="text-sm text-gray-500">{{ member.relation }}</p></div>
          </div>
          <span :class="member.online ? 'text-green-500' : 'text-gray-400'" class="text-sm">{{ member.online ? '在线' : '离线' }}</span>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <div class="text-4xl mb-3">👨‍👩‍👧</div>
        <p>还没有添加家人</p>
        <p class="text-sm">请将上方邀请码分享给子女</p>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">最近通话</h3>
      <div v-if="store.familyMessages.length > 0" class="space-y-4">
        <div v-for="(msg, index) in store.familyMessages.slice(-5)" :key="index" class="flex items-start gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{{ msg.avatar }}</div>
          <div class="flex-1 bg-gray-100 rounded-lg rounded-tl-none p-3">
            <div class="flex items-center justify-between mb-1"><span class="font-bold text-gray-700 text-sm">{{ msg.name }}</span><span class="text-gray-400 text-xs">{{ formatTime(msg.timestamp) }}</span></div>
            <p class="text-gray-600 text-sm">{{ msg.content }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <div class="text-4xl mb-3">💬</div>
        <p>还没有通话记录</p>
        <p class="text-sm">添加家人后开始通话</p>
      </div>
    </div>
    <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-4">❤️ 家人关怀</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-white/20 rounded-lg"><span>最后签到</span><span class="font-bold text-gray-300">{{ lastSignInTime }}</span></div>
        <div class="flex items-center justify-between p-3 bg-white/20 rounded-lg"><span>健康评分</span><span class="font-bold text-gray-300">{{ store.parentProfile.healthScore }}</span></div>
        <div class="flex items-center justify-between p-3 bg-white/20 rounded-lg"><span>连续签到</span><span class="font-bold text-gray-300">{{ store.parentProfile.daysSignIn }}天</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()

const lastSignInTime = computed(() => {
  if (store.signInRecords.length > 0) {
    const last = store.signInRecords[store.signInRecords.length - 1]
    return formatTime(last.timestamp)
  }
  return '暂无数据'
})

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  return date.toLocaleDateString()
}

const generateNewCode = () => {
  store.generateInviteCode()
}

const copyInviteCode = () => {
  navigator.clipboard.writeText(store.inviteCode)
  alert('邀请码已复制到剪贴板')
}

onMounted(() => {
  store.loadInviteCode()
  store.loadConnectedParents()
  store.loadSignInRecords()
  store.loadFamilyMessages()
  store.loadParentProfile()
})
</script>
