<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="sos" size="lg" class="text-red-500" /> 紧急求助
      </h1>
      <p class="text-gray-500">一键求助，快速联系家人</p>
    </header>

    <!-- SOS大按钮 -->
    <div class="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white mb-6 text-center">
      <button @click="triggerSOS" class="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-105 transition-transform active:scale-95">
        <span class="text-6xl text-red-600 font-bold">SOS</span>
      </button>
      <p class="text-lg font-bold">点击立即求助</p>
      <p class="text-red-200 text-sm mt-2">将自动通知所有已连接的子女</p>
    </div>

    <!-- 快速联系 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">快速联系家人</h3>
      <div v-if="store.connectedChildren.length > 0" class="space-y-3">
        <div v-for="(child, index) in store.connectedChildren" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-xl">{{ child.avatar || '👧' }}</div>
            <div>
              <p class="font-medium text-gray-800">{{ child.name || '子女' }}</p>
              <p class="text-sm text-gray-500">{{ child.relation || '子女' }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="callChild(child)" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">📞 通话</button>
            <button @click="messageChild(child)" class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">💬 消息</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">👨‍👩‍👧</div>
        <p>暂无已连接的子女</p>
        <p class="text-sm">请先在亲情连接中添加子女</p>
      </div>
    </div>

    <!-- 紧急联系人 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">紧急联系人</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🏥</span>
            <div>
              <p class="font-medium text-gray-800">急救电话</p>
              <p class="text-sm text-gray-500">120</p>
            </div>
          </div>
          <button @click="callEmergency('120')" class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">拨打</button>
        </div>
        <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex items-center gap-3">
            <span class="text-2xl">👮</span>
            <div>
              <p class="font-medium text-gray-800">报警电话</p>
              <p class="text-sm text-gray-500">110</p>
            </div>
          </div>
          <button @click="callEmergency('110')" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">拨打</button>
        </div>
      </div>
    </div>

    <!-- 求助记录 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">求助记录</h3>
      <div v-if="store.sosRecords.length > 0" class="space-y-3">
        <div v-for="(record, index) in store.sosRecords.slice(-5)" :key="index" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-3">
            <span class="text-red-500 text-xl">🚨</span>
            <div>
              <p class="text-gray-700">{{ record.type }}</p>
              <p class="text-xs text-gray-400">{{ record.status }}</p>
            </div>
          </div>
          <span class="text-gray-400 text-sm">{{ formatTime(record.timestamp) }}</span>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <p>暂无求助记录</p>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-3">🛡️ 安全提示</h3>
      <div class="space-y-2 text-sm">
        <p>• 遇到紧急情况请保持冷静</p>
        <p>• 优先拨打急救电话 120</p>
        <p>• 同时通知家人前来协助</p>
        <p>• 准备好医保卡和病历资料</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()
const toast = useToastStore()

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const triggerSOS = () => {
  if (confirm('确认发送紧急求助通知给所有子女？')) {
    store.addSOSRecord({
      type: '紧急求助',
      status: '已发送',
      timestamp: new Date().toISOString()
    })
    toast.warning('🚨 紧急求助已发送！子女将收到通知。', 4000)
  }
}

const callChild = (child) => {
  toast.info('📞 正在呼叫: ' + (child.name || '子女'), 2500)
}

const messageChild = (child) => {
  toast.info('💬 发送消息给: ' + (child.name || '子女'), 2500)
}

const callEmergency = (number) => {
  if (confirm('确认拨打 ' + number + '？')) {
    toast.error('📞 正在拨打: ' + number + '（模拟）', 3000)
  }
}

onMounted(() => {
  store.loadConnectedChildren()
  store.loadSOSRecords()
})
</script>