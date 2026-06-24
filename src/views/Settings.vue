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
      <h3 class="text-lg font-bold text-gray-700 mb-4">语音设置</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-600 text-sm mb-2">语言/方言</label>
          <div class="relative mb-3">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索方言..." 
              class="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="lang in filteredLangOptions" 
              :key="lang.code" 
              @click="selectLanguage(lang)" 
              :class="[
                settings.language === lang.code ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600',
                !lang.supported ? 'opacity-70 relative' : ''
              ]" 
              class="py-2.5 rounded-lg text-sm font-medium transition-colors text-left px-3"
            >
              <div class="flex items-center justify-between">
                <span>{{ lang.name }}</span>
                <span v-if="!lang.supported" class="text-xs opacity-60">⚠️</span>
              </div>
              <div class="text-xs opacity-70">{{ lang.desc }}</div>
            </button>
          </div>
          <div v-if="filteredLangOptions.length === 0" class="text-center py-4 text-gray-400 text-sm">
            未找到匹配的方言
          </div>
          <div v-if="langWarning" class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p class="text-sm text-amber-700">{{ langWarning }}</p>
          </div>
        </div>
        
        <!-- 语音测试 -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span>🎤</span> 语音测试
          </h4>
          <button @click="testVoiceInput" 
            :class="isTestingVoice ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white'"
            class="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <span>{{ isTestingVoice ? '⏹️' : '🎤' }}</span>
            {{ isTestingVoice ? '停止测试' : '测试语音识别' }}
          </button>
          <div v-if="testResult" class="mt-3 p-3 bg-white rounded-lg">
            <p class="text-sm text-gray-600">识别结果：</p>
            <p class="text-lg font-medium text-gray-800 mt-1">{{ testResult }}</p>
          </div>
          <p v-if="isTestingVoice" class="text-xs text-blue-500 mt-2 animate-pulse">
            请说出任意内容进行测试...
          </p>
        </div>
        
        <div class="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
          <p class="mb-1">💡 提示：</p>
          <p>不同设备支持的方言可能不同，建议使用普通话以获得最佳识别效果。</p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import AppIcon from '../components/AppIcon.vue'
import { voiceAssistant } from '../utils/voiceAssistant'

const router = useRouter()
const store = useAppStore()

const isTestingVoice = ref(false)
const testResult = ref('')
const langWarning = ref('')
const searchQuery = ref('')

const fontSizes = [
  { label: '小', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' },
  { label: '特大', value: 'xlarge' }
]

const langOptions = voiceAssistant.getLangOptions()

const filteredLangOptions = computed(() => {
  if (!searchQuery.value) {
    return langOptions
  }
  const query = searchQuery.value.toLowerCase()
  return langOptions.filter(lang => 
    lang.name.toLowerCase().includes(query) || 
    lang.desc.toLowerCase().includes(query)
  )
})

const settings = ref({
  fontSize: 'medium',
  volume: 80,
  voiceEnabled: true,
  language: 'zh-CN'
})

const username = computed(() => store.userProfile?.username || store.loginStatus?.username || '用户')
const isVerified = computed(() => !!store.userProfile?.idCard)

const selectLanguage = (lang) => {
  settings.value.language = lang.code
  
  if (!lang.supported) {
    langWarning.value = `💡 当前浏览器暂不支持"${lang.name}"方言的语音识别，系统会尝试使用普通话进行识别。建议使用普通话以获得最佳效果。`
  } else {
    langWarning.value = ''
  }
  
  voiceAssistant.setLang(lang.code)
}

const saveSettings = () => {
  store.saveAppSettings(settings.value)
  
  // 立即应用字体大小
  document.documentElement.className = 'font-' + settings.value.fontSize
  
  // 立即应用语言设置
  voiceAssistant.setLang(settings.value.language)
  
  // 提示用户
  alert('设置已保存！')
  
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
      voiceEnabled: store.appSettings.voiceEnabled !== false,
      language: store.appSettings.language || 'zh-CN'
    }
  }
  
  voiceAssistant.addCallback(handleVoiceTestEvent)
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleVoiceTestEvent)
  voiceAssistant.stopListening()
  isTestingVoice.value = false
})

const testVoiceInput = () => {
  if (isTestingVoice.value) {
    isTestingVoice.value = false
    voiceAssistant.stopListening()
  } else {
    if (!voiceAssistant.isSupported()) {
      testResult.value = '您的浏览器不支持语音识别'
      return
    }
    // 先应用当前选择的语言
    voiceAssistant.setLang(settings.value.language)
    isTestingVoice.value = true
    testResult.value = ''
    voiceAssistant.startListening()
  }
}

const handleVoiceTestEvent = (event, data) => {
  switch (event) {
    case 'result':
      testResult.value = data
      isTestingVoice.value = false
      break
    case 'error':
      isTestingVoice.value = false
      if (data === 'browser-not-supported') {
        testResult.value = '您的浏览器不支持语音识别'
      } else if (typeof data === 'object') {
        testResult.value = '语音识别出错：' + data.message
      } else {
        testResult.value = '语音识别出错：' + data
      }
      break
    case 'dialect-not-supported':
      isTestingVoice.value = false
      testResult.value = data.message
      break
    case 'end':
      if (isTestingVoice.value) {
        isTestingVoice.value = false
        if (!testResult.value) {
          testResult.value = '未检测到语音输入'
        }
      }
      break
  }
}
</script>