<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">紧急求助</h2>
        <p class="text-gray-500 mt-1">一键求助家人，快速联系紧急服务</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <div class="text-center mb-8">
          <button @click="triggerSOS" class="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white text-4xl hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
            🚨 SOS
          </button>
          <p class="text-gray-500 mt-3">点击按钮紧急求助，将同时通知家人和紧急联系人</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button @click="callEmergency('120')" class="flex items-center gap-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl">🚑</div>
            <div class="text-left">
              <p class="font-bold text-gray-800">急救电话</p>
              <p class="text-lg font-bold text-red-500">120</p>
            </div>
          </button>
          <button @click="callEmergency('110')" class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">🚓</div>
            <div class="text-left">
              <p class="font-bold text-gray-800">报警电话</p>
              <p class="text-lg font-bold text-blue-500">110</p>
            </div>
          </button>
          <button @click="callEmergency('119')" class="flex items-center gap-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">🚒</div>
            <div class="text-left">
              <p class="font-bold text-gray-800">火警电话</p>
              <p class="text-lg font-bold text-orange-500">119</p>
            </div>
          </button>
          <button @click="callEmergency('12320')" class="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">🏥</div>
            <div class="text-left">
              <p class="font-bold text-gray-800">健康咨询热线</p>
              <p class="text-lg font-bold text-green-500">12320</p>
            </div>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">快速联系家人</h3>
        <div v-if="familyContacts.length > 0" class="space-y-3">
          <div v-for="(contact, index) in familyContacts" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">{{ contact.icon }}</div>
              <div>
                <p class="font-bold text-gray-800">{{ contact.name }}</p>
                <p class="text-sm text-gray-500">{{ contact.relation }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="callContact(contact.phone)" class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200">📞</button>
              <button @click="sendMessage(contact)" class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200">💬</button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <span class="text-3xl mb-2">👨‍👩‍👧</span>
          <p>暂无家人联系人</p>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">当前位置</h3>
      <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">📍</div>
          <div>
            <p class="font-bold text-gray-800">北京市朝阳区</p>
            <p class="text-sm text-gray-500">经度: 116.4074, 纬度: 39.9042</p>
          </div>
        </div>
        <button @click="refreshLocation" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">刷新位置</button>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">健康档案快速访问</h3>
        <div class="grid grid-cols-2 gap-3">
          <button @click="goToPage('/desktop/health')" class="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <span class="text-2xl mb-2">📊</span>
            <span class="text-sm font-medium text-gray-700">健康数据</span>
          </button>
          <button @click="goToPage('/desktop/medicine')" class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <span class="text-2xl mb-2">💊</span>
            <span class="text-sm font-medium text-gray-700">用药记录</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <span class="text-2xl mb-2">⚠️</span>
            <span class="text-sm font-medium text-gray-700">过敏信息</span>
          </button>
          <button class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <span class="text-2xl mb-2">📋</span>
            <span class="text-sm font-medium text-gray-700">病历摘要</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">求助记录</h3>
        <div v-if="helpRecords.length > 0" class="space-y-3">
          <div v-for="(record, index) in helpRecords" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm" :class="record.type === 'sos' ? 'bg-red-100' : 'bg-blue-100'">
                {{ record.icon }}
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ record.title }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(record.timestamp) }}</p>
              </div>
            </div>
            <span :class="record.status === '已处理' ? 'text-green-500' : 'text-amber-500'" class="text-sm">{{ record.status }}</span>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <span class="text-3xl mb-2">📋</span>
          <p>暂无求助记录</p>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">⚠️</div>
        <div>
          <h4 class="font-bold text-gray-800">安全提示</h4>
          <p class="text-sm text-gray-600 mt-1">紧急情况处理指南：保持冷静，拨打紧急电话时清晰说明位置和情况。平时请随身携带手机，确保电量充足。定期检查紧急联系人信息是否准确。</p>
        </div>
      </div>
    </div>

    <div v-if="showSOSConfirm" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div class="bg-white w-full max-w-md rounded-2xl p-6">
        <div class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">🚨</div>
          <h4 class="text-xl font-bold text-gray-800 mb-2">确认紧急求助？</h4>
          <p class="text-gray-500 mb-6">点击确认后将立即通知所有紧急联系人</p>
          <div class="flex gap-4">
            <button @click="showSOSConfirm = false" class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300">取消</button>
            <button @click="confirmSOS" class="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">确认求助</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showSOSConfirm = ref(false)

const familyContacts = ref([
  { name: '儿子', relation: '长子', phone: '13800138001', icon: '👦' },
  { name: '女儿', relation: '长女', phone: '13900139002', icon: '👧' },
  { name: '老伴', relation: '配偶', phone: '13700137003', icon: '👵' }
])

const helpRecords = ref([
  { type: 'sos', icon: '🚨', title: '紧急求助', timestamp: Date.now() - 86400000, status: '已处理' },
  { type: 'call', icon: '📞', title: '联系子女', timestamp: Date.now() - 172800000, status: '已处理' }
])

const triggerSOS = () => {
  showSOSConfirm.value = true
}

const confirmSOS = () => {
  showSOSConfirm.value = false
  alert('紧急求助已发送！家人和紧急联系人将收到通知。')
}

const callEmergency = (phone) => {
  window.location.href = `tel:${phone}`
}

const callContact = (phone) => {
  window.location.href = `tel:${phone}`
}

const sendMessage = (contact) => {
  alert(`正在给 ${contact.name} 发送消息...`)
}

const refreshLocation = () => {
  alert('正在获取位置信息...')
}

const goToPage = (path) => {
  router.push(path)
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
</script>
