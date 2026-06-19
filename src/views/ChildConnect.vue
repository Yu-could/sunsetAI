<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <LinkIcon class="w-7 h-7 text-blue-500" />
        连接管理
      </h1>
      <p class="text-gray-500">管理与父母的连接</p>
    </header>
    <div v-if="store.connectedParents.length > 0" class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">我的连接</h3>
      <div class="space-y-3">
        <div v-for="(parent, index) in store.connectedParents" :key="index" class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xl">
              <UserIcon class="w-6 h-6" />
            </div>
            <div>
              <p class="font-bold text-gray-800">{{ parent.name }}</p>
              <p class="text-sm text-gray-500">{{ parent.relation }}</p>
            </div>
          </div>
          <span :class="parent.online ? 'text-green-500' : 'text-gray-400'" class="text-sm">{{ parent.online ? '在线' : '离线' }}</span>
        </div>
      </div>
    </div>
    <div v-else class="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
      <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <LinkIcon class="w-8 h-8 text-blue-500" />
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">我的连接</h3>
      <p class="text-gray-400">还没有连接父母</p>
      <p class="text-sm text-gray-400">请输入邀请码添加连接</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">添加新连接</h3>
      <div class="mb-4">
        <label class="block text-gray-600 mb-2">输入邀请码</label>
        <input v-model="inviteCode" type="text" placeholder="请输入父母端的邀请码" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-lg">
      </div>
      <button @click="connect" class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow">确认连接</button>
      <p class="text-center text-gray-400 text-sm mt-4">父母端在亲情连接页面获取邀请码</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import { LinkIcon, UserIcon } from '@heroicons/vue/24/solid'

const store = useAppStore()
const inviteCode = ref('')

const connect = () => {
  if (inviteCode.value) {
    const success = store.connectWithCode(inviteCode.value)
    if (success) {
      alert('连接成功！')
      inviteCode.value = ''
    } else {
      alert('邀请码无效，请检查后重试')
    }
  } else {
    alert('请输入邀请码')
  }
}

onMounted(() => {
  store.loadConnectedParents()
})
</script>
