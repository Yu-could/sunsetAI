<template>
  <div class="px-4 py-6 max-w-md mx-auto pb-24">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="settings" size="lg" class="text-gray-500" /> 个人设置
      </h1>
      <p class="text-gray-500">管理个人信息和应用设置</p>
    </header>

    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">显示设置</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-600 text-sm mb-2">字体大小</label>
          <div class="flex gap-2">
            <button 
              v-for="size in fontSizes" 
              :key="size.value" 
              @click="settings.fontSize = size.value" 
              :class="settings.fontSize === size.value ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" 
              class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {{ size.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="block text-gray-600 text-sm mb-2">应用音量: {{ settings.volume }}%</label>
          <input v-model="settings.volume" type="range" min="0" max="100" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-gray-600">语音播报</span>
          <button 
            @click="settings.voiceEnabled = !settings.voiceEnabled" 
            :class="settings.voiceEnabled ? 'bg-orange-500' : 'bg-gray-300'"
            class="w-12 h-6 rounded-full relative transition-colors"
          >
            <span 
              :class="settings.voiceEnabled ? 'translate-x-6' : 'translate-x-1'"
              class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">账号设置</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b">
          <span class="text-gray-600">用户名</span>
          <span class="text-gray-800 font-medium">{{ username }}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b">
          <span class="text-gray-600">实名认证</span>
          <span :class="isVerified ? 'text-green-500' : 'text-gray-400'">{{ isVerified ? '✓ 已认证' : '未认证' }}</span>
        </div>
        <button @click="goToRealName" class="w-full text-left py-2 text-orange-500 font-medium">
          {{ isVerified ? '修改实名信息' : '前往实名认证' }} →
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <button @click="saveSettings" class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
        保存设置
      </button>
      <button @click="logout" class="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
        退出登录
      </button>
    </div>

    <div class="mt-6 text-center text-sm text-gray-400">
      <p>夕阳智语 v1.0.0</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import AppIcon from '../components/AppIcon.vue'

const router = useRouter()
const store = useAppStore()

const fontSizes = [
  { label: '小', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' },
  { label: '特大', value: 'xlarge' }
]

const settings = ref({
  fontSize: 'medium',
  volume: 80,
  voiceEnabled: true
})

const username = computed(() => store.userProfile?.username || store.loginStatus?.username || '用户')
const isVerified = computed(() => !!store.userProfile?.idCard)

const saveSettings = () => {
  store.saveAppSettings(settings.value)
  
  // 立即应用字体大小
  document.documentElement.className = 'font-' + settings.value.fontSize
  
  // 提示用户
  alert('设置已保存，字体大小已更新！')
  
  // 跳转到主页（不刷新页面）
  const role = store.loginStatus?.role || ''
  const routes = {
    'parent-mobile': '/parent',
    'parent-desktop': '/desktop',
    'child-mobile': '/child',
    'child-desktop': '/desktop/child'
  }
  const targetRoute = routes[role] || '/parent'
  router.push(targetRoute)
}

const goToRealName = () => {
  router.push('/realname')
}

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    store.logout()
    router.push('/')
  }
}

onMounted(() => {
  store.loadUserProfile()
  store.loadAppSettings()
  store.loadLoginStatus()
  
  if (store.appSettings) {
    settings.value = {
      fontSize: store.appSettings.fontSize || 'medium',
      volume: store.appSettings.volume || 80,
      voiceEnabled: store.appSettings.voiceEnabled !== false
    }
  }
})
</script>