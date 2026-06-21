<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="sos" size="lg" class="text-red-500" /> 紧急求助
      </h1>
      <p class="text-gray-500">一键求助，快速联系家人</p>
    </header>

    <!-- SOS大按钮 -->
    <div class="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-8 text-white mb-6 text-center">
      <button @click="triggerSOS" class="w-36 h-36 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl hover:scale-105 transition-transform active:scale-95">
        <span class="text-5xl font-bold text-red-600">SOS</span>
      </button>
      <p class="text-xl font-bold mb-2">点击立即求助</p>
      <p class="text-red-200 text-sm mb-3">将自动通知所有已连接的子女</p>
      
      <!-- 语音触发说明 -->
      <div class="bg-white/10 rounded-xl p-4 mb-3">
        <p class="text-sm text-red-200 flex items-center justify-center gap-2">
          <span>🎤</span> 也可以说"救命"、"紧急求助"触发
        </p>
        <button @click="toggleVoiceListening" 
          :class="isVoiceListening ? 'bg-red-400 animate-pulse' : 'bg-white/20'"
          class="mt-3 px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 mx-auto">
          <span>{{ isVoiceListening ? '⏹️' : '🎤' }}</span>
          {{ isVoiceListening ? '停止语音监听' : '开启语音监听' }}
        </button>
      </div>
      
      <div class="mt-4 flex items-center justify-center gap-2 text-sm text-red-200">
        <span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span>设备在线</span>
      </div>
    </div>

    <!-- 快速联系家人 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📞</span> 快速联系家人
      </h3>
      <div v-if="store.connectedChildren.length > 0" class="space-y-3">
        <div v-for="(child, index) in store.connectedChildren" :key="index" 
          class="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
              {{ child.avatar || '👧' }}
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-gray-800">{{ child.name || '家人' }}</h4>
              <p class="text-sm text-gray-500">{{ child.relation || '子女' }}</p>
              <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                {{ child.phone || '未设置电话' }}
              </p>
            </div>
          </div>
          <div class="flex gap-3 mt-4">
            <button @click="callChild(child)" class="flex-1 bg-blue-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <span>📞</span> 通话
            </button>
            <button @click="messageChild(child)" class="flex-1 bg-green-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <span>💬</span> 消息
            </button>
            <button @click="videoCall(child)" class="flex-1 bg-purple-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
              <span>📹</span> 视频
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-10 text-gray-400">
        <div class="text-5xl mb-4">👨‍👩‍👧</div>
        <p class="text-lg mb-2">暂无已连接的家人</p>
        <p class="text-sm">请先在亲情连接中添加家人</p>
        <button @click="goToFamily" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
          去添加家人
        </button>
      </div>
    </div>

    <!-- 紧急联系人 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>🏥</span> 紧急联系电话
      </h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl text-white">🚑</div>
            <div>
              <p class="font-bold text-gray-800">急救电话</p>
              <p class="text-2xl font-bold text-red-600">120</p>
            </div>
          </div>
          <button @click="callEmergency('120', '急救')" class="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
            拨打
          </button>
        </div>
        <div class="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl text-white">🚓</div>
            <div>
              <p class="font-bold text-gray-800">报警电话</p>
              <p class="text-2xl font-bold text-blue-600">110</p>
            </div>
          </div>
          <button @click="callEmergency('110', '报警')" class="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
            拨打
          </button>
        </div>
        <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200 hover:bg-yellow-100 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl text-white">🚒</div>
            <div>
              <p class="font-bold text-gray-800">火警电话</p>
              <p class="text-2xl font-bold text-yellow-600">119</p>
            </div>
          </div>
          <button @click="callEmergency('119', '火警')" class="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors">
            拨打
          </button>
        </div>
        <div class="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl text-white">🏥</div>
            <div>
              <p class="font-bold text-gray-800">健康咨询热线</p>
              <p class="text-lg font-bold text-green-600">12320</p>
            </div>
          </div>
          <button @click="callEmergency('12320', '健康咨询')" class="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
            拨打
          </button>
        </div>
      </div>
    </div>

    <!-- 当前位置 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📍</span> 当前位置
      </h3>
      <div v-if="location" class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-start gap-3">
          <span class="text-2xl">📍</span>
          <div>
            <p class="font-medium text-gray-800">{{ location.address || '正在获取位置...' }}</p>
            <p class="text-sm text-gray-500 mt-1">经度: {{ location.longitude?.toFixed(6) }}</p>
            <p class="text-sm text-gray-500">纬度: {{ location.latitude?.toFixed(6) }}</p>
          </div>
        </div>
        <button @click="refreshLocation" class="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
          <span>🔄</span> 刷新位置
        </button>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <p class="text-sm">正在获取位置...</p>
        <button @click="refreshLocation" class="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
          获取位置
        </button>
      </div>
    </div>

    <!-- 健康档案快速访问 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📋</span> 健康档案
      </h3>
      <div class="grid grid-cols-2 gap-3">
        <button @click="showHealthProfile = true" class="bg-red-50 rounded-xl p-4 text-center border border-red-100 hover:bg-red-100 transition-colors">
          <span class="text-3xl">🩺</span>
          <p class="text-sm font-medium text-gray-700 mt-2">健康数据</p>
        </button>
        <button @click="showMedicineProfile = true" class="bg-purple-50 rounded-xl p-4 text-center border border-purple-100 hover:bg-purple-100 transition-colors">
          <span class="text-3xl">💊</span>
          <p class="text-sm font-medium text-gray-700 mt-2">用药记录</p>
        </button>
        <button @click="showAllergies = true" class="bg-orange-50 rounded-xl p-4 text-center border border-orange-100 hover:bg-orange-100 transition-colors">
          <span class="text-3xl">⚠️</span>
          <p class="text-sm font-medium text-gray-700 mt-2">过敏信息</p>
        </button>
        <button @click="showEmergencyInfo = true" class="bg-blue-50 rounded-xl p-4 text-center border border-blue-100 hover:bg-blue-100 transition-colors">
          <span class="text-3xl">📄</span>
          <p class="text-sm font-medium text-gray-700 mt-2">病历摘要</p>
        </button>
      </div>
    </div>

    <!-- 求助记录 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📝</span> 求助记录
      </h3>
      <div v-if="store.sosRecords.length > 0" class="space-y-3">
        <div v-for="(record, index) in recentSOSRecords" :key="index" 
          class="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-start gap-3">
            <div :class="record.status === '已发送' ? 'bg-red-100' : 'bg-green-100'" class="w-10 h-10 rounded-full flex items-center justify-center">
              <span class="text-lg">{{ record.status === '已发送' ? '🚨' : '✓' }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-gray-800">{{ record.type }}</h4>
                <span :class="record.status === '已发送' ? 'text-red-600' : 'text-green-600'" class="text-sm font-medium">
                  {{ record.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ formatTime(record.timestamp) }}</p>
              <p v-if="record.location" class="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <span>📍</span> {{ record.location }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">📝</div>
        <p>暂无求助记录</p>
        <p class="text-sm">SOS求助记录将显示在这里</p>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🛡️</span> 安全提示
      </h3>
      <div class="space-y-3">
        <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3">
          <span class="text-xl">💡</span>
          <div>
            <p class="font-medium">遇到紧急情况请保持冷静</p>
            <p class="text-sm text-green-200 mt-1">深呼吸，拨打紧急电话或点击SOS按钮</p>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3">
          <span class="text-xl">📞</span>
          <div>
            <p class="font-medium">优先拨打急救电话 120</p>
            <p class="text-sm text-green-200 mt-1">说明症状、位置和病史</p>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3">
          <span class="text-xl">👨‍👩‍👧</span>
          <div>
            <p class="font-medium">同时通知家人前来协助</p>
            <p class="text-sm text-green-200 mt-1">家人可以提供帮助和陪伴</p>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-white/10 rounded-lg p-3">
          <span class="text-xl">📋</span>
          <div>
            <p class="font-medium">准备好医保卡和病历资料</p>
            <p class="text-sm text-green-200 mt-1">方便医护人员了解情况</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 健康小贴士 -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>💡</span> 日常健康建议
      </h3>
      <div class="space-y-3">
        <div v-for="(tip, i) in healthTips" :key="i" class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
          <span class="text-xl">{{ tip.icon }}</span>
          <div>
            <p class="font-medium text-gray-800 text-sm">{{ tip.title }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SOS确认弹窗 -->
    <div v-if="showSOSConfirm" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl p-8 w-full max-w-sm text-center">
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <span class="text-6xl">🚨</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">确认发送求助？</h3>
        <p class="text-gray-500 mb-6">将通知所有家人：{{ store.connectedChildren.length }} 人</p>
        <div class="flex gap-3">
          <button @click="showSOSConfirm = false" class="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            取消
          </button>
          <button @click="confirmSOS" class="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
            确认发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import { voiceAssistant } from '../utils/voiceAssistant'
import AppIcon from '../components/AppIcon.vue'

const router = useRouter()
const store = useAppStore()
const toast = useToastStore()

const showSOSConfirm = ref(false)
const showHealthProfile = ref(false)
const showMedicineProfile = ref(false)
const showAllergies = ref(false)
const showEmergencyInfo = ref(false)
const location = ref(null)
const isVoiceListening = ref(false)

const healthTips = [
  { icon: '🌅', title: '起床要慢', desc: '醒来后先躺一会儿再慢慢坐起' },
  { icon: '💧', title: '多喝温水', desc: '每天1500-2000毫升' },
  { icon: '🚶', title: '适度运动', desc: '每天散步30分钟' },
  { icon: '😴', title: '规律作息', desc: '早睡早起，保证7-8小时睡眠' }
]

const recentSOSRecords = computed(() => {
  return store.sosRecords.slice(-5).reverse()
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const triggerSOS = () => {
  showSOSConfirm.value = true
}

const confirmSOS = () => {
  const sosRecord = {
    type: '紧急求助',
    status: '已发送',
    timestamp: new Date().toISOString(),
    location: location.value ? location.value.address : '位置未知'
  }
  
  store.addSOSRecord(sosRecord)
  showSOSConfirm.value = false
  
  toast.warning('🚨 紧急求助已发送！', 4000)
  
  if (store.connectedChildren.length > 0) {
    const names = store.connectedChildren.map(c => c.name || '家人').join('、')
    toast.info(`已通知: ${names}`, 3000)
  }
  
  if (location.value) {
    toast.info(`当前位置已发送`, 3000)
  }
}

const callChild = (child) => {
  if (child.phone) {
    toast.info(`📞 正在呼叫: ${child.name || '家人'}...`, 2500)
  } else {
    toast.warning('该家人未设置电话号码', 2500)
  }
}

const messageChild = (child) => {
  toast.info(`💬 发送消息给: ${child.name || '家人'}`, 2500)
}

const videoCall = (child) => {
  toast.info(`📹 视频通话请求已发送`, 2500)
}

const callEmergency = (number, type) => {
  if (confirm(`确认拨打 ${type}电话 ${number} 吗？`)) {
    toast.error(`📞 正在拨打: ${number}（模拟）`, 3000)
  }
}

const goToFamily = () => {
  router.push('/family')
}

const refreshLocation = () => {
  if (navigator.geolocation) {
    toast.info('正在获取位置...', 1500)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: '当前位置'
        }
        toast.success('位置已更新', 1500)
      },
      (error) => {
        toast.error('无法获取位置', 2500)
      }
    )
  } else {
    toast.error('浏览器不支持定位功能', 2500)
  }
}

onMounted(() => {
  store.loadConnectedChildren()
  store.loadSOSRecords()
  voiceAssistant.addCallback(handleVoiceEvent)
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: '当前位置'
        }
      }
    )
  }
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleVoiceEvent)
  voiceAssistant.stopListening()
  isVoiceListening.value = false
})

const toggleVoiceListening = () => {
  if (isVoiceListening.value) {
    isVoiceListening.value = false
    voiceAssistant.stopListening()
    toast.success('语音监听已停止', 1500)
  } else {
    if (!voiceAssistant.isSupported()) {
      toast.warning('您的浏览器不支持语音识别', 2000)
      return
    }
    isVoiceListening.value = true
    toast.info('开启语音监听，说"救命"或"紧急求助"可触发SOS', 3000)
    voiceAssistant.startListening()
  }
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      checkEmergencyKeywords(data)
      break
    case 'error':
      isVoiceListening.value = false
      if (data === 'browser-not-supported') {
        toast.warning('您的浏览器不支持语音识别', 2000)
      } else {
        toast.warning('语音识别出错：' + data, 2000)
      }
      break
    case 'end':
      if (isVoiceListening.value) {
        // 自动重新开始监听
        setTimeout(() => {
          if (isVoiceListening.value) {
            voiceAssistant.startListening()
          }
        }, 500)
      }
      break
  }
}

const checkEmergencyKeywords = (text) => {
  if (!text) return
  
  const emergencyKeywords = [
    '救命', '救命啊', '救命呀', '紧急', '紧急求助', '求助',
    '不舒服', '难受', '疼', '心痛', '头晕', '摔倒',
    '帮帮我', '快来', '出事了', '不好了'
  ]
  
  for (const keyword of emergencyKeywords) {
    if (text.includes(keyword)) {
      toast.error(`🚨 检测到紧急关键词：${keyword}`, 3000)
      triggerSOS()
      isVoiceListening.value = false
      voiceAssistant.stopListening()
      return
    }
  }
  
  // 如果没有检测到紧急关键词，继续监听
  if (isVoiceListening.value) {
    toast.info(`语音识别：${text}`, 1500)
  }
}
</script>
