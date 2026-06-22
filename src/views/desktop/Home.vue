<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="bg-gradient-to-br from-parent to-parent-hover rounded-2xl p-5 text-white mb-6 shadow-md">
      <div class="flex items-start justify-between mb-4">
        <div class="min-w-0 flex-1">
          <p class="text-white/80 text-sm">{{ greeting }}，{{ userName }}</p>
          <h2 class="text-2xl font-bold mt-1 whitespace-nowrap">{{ weatherData.current.icon }} 夕阳智语</h2>
        </div>
        <router-link to="/realname" class="cursor-pointer hover:scale-105 transition-transform flex-shrink-0 ml-4">
          <UserAvatar role="parent" size="xl" />
        </router-link>
      </div>

      <div class="bg-white/10 rounded-xl p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-3xl flex-shrink-0">{{ weatherData.current.icon }}</span>
            <div class="flex items-baseline gap-2 min-w-0">
              <span class="text-2xl font-bold">{{ weatherData.current.temp }}°</span>
              <span class="text-base">{{ weatherData.current.condition }}</span>
            </div>
            <span class="text-sm text-white/70 flex-shrink-0">{{ weatherData.city }}</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button @click="toggleWeatherExpand" class="text-white/80 hover:text-white text-sm px-3 py-1.5 bg-white/10 rounded-lg">
              {{ isWeatherExpanded ? '收起 ▾' : '详情 ▴' }}
            </button>
            <button @click="speakWeather" class="bg-white/20 hover:bg-white/30 rounded-lg px-4 py-1.5 text-sm flex items-center gap-1 transition-colors">
              {{ isSpeakingWeather ? '⏹️ 停止' : '🔊 播报' }}
            </button>
            <button @click="searchWeather" class="bg-white text-parent rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors">
              🔍 城市
            </button>
          </div>
        </div>

        <div v-if="isWeatherExpanded" class="mt-3 space-y-3">
          <div class="grid grid-cols-4 gap-3">
            <div class="bg-white/10 rounded-lg p-2.5">
              <p class="text-xs text-white/70">紫外线</p>
              <p class="text-sm font-medium">{{ weatherData.current.uv }}</p>
            </div>
            <div class="bg-white/10 rounded-lg p-2.5">
              <p class="text-xs text-white/70">空气质量</p>
              <p class="text-sm font-medium">{{ weatherData.current.airQuality }}</p>
            </div>
            <div class="bg-white/10 rounded-lg p-2.5">
              <p class="text-xs text-white/70 mb-1">📋 注意事项</p>
              <p class="text-xs text-white/90">{{ weatherData.tips }}</p>
            </div>
            <div class="bg-white/10 rounded-lg p-2.5">
              <p class="text-xs text-white/70 mb-1">🚶 出行建议</p>
              <p class="text-xs text-white/90">{{ weatherData.suggestion }}</p>
            </div>
          </div>

          <div class="bg-white/10 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-medium">📅 日程联动建议</p>
              <span class="text-xs text-white/70">根据今日天气自动生成</span>
            </div>
            <div class="space-y-1.5">
              <div v-for="(schedule, index) in weatherScheduleSuggestions" :key="index" class="flex items-center gap-2 text-xs">
                <span class="text-base">{{ schedule.icon }}</span>
                <span class="text-white/90">{{ schedule.time }} - {{ schedule.activity }}</span>
                <span :class="schedule.recommended ? 'text-green-300' : 'text-amber-300'" class="text-xs ml-auto">
                  {{ schedule.recommended ? '✓ 适宜' : '⚠ 注意' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-start gap-6 mt-3 pt-3 border-t border-white/10">
          <div v-for="(day, index) in weatherData.forecast" :key="day.day" class="text-center">
            <p class="text-xs text-white/70">{{ day.day }}·{{ getForecastDate(index) }}</p>
            <p class="text-xl">{{ day.icon }}</p>
            <p class="text-xs">{{ day.high }}°/{{ day.low }}°</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">健康评分</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">-</p>
            <p class="text-gray-400 text-xs mt-0.5">等待数据</p>
          </div>
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AppIcon name="heart" size="sm" class="text-red-500" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">本月签到</p>
            <p class="text-2xl font-bold text-green-500 mt-1">{{ store.signInRecords.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">天</p>
          </div>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <AppIcon name="signin" size="sm" class="text-green-500" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">今日热量</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">-</p>
            <p class="text-gray-400 text-xs mt-0.5">千卡</p>
          </div>
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <AppIcon name="diet" size="sm" class="text-orange-500" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">已连接子女</p>
            <p class="text-2xl font-bold text-blue-500 mt-1">{{ store.connectedChildren.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">人</p>
          </div>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <AppIcon name="family" size="sm" class="text-blue-500" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">待服药物</p>
            <p class="text-2xl font-bold text-purple-500 mt-1">{{ pendingMedicine }}</p>
            <p class="text-gray-400 text-xs mt-0.5">种</p>
          </div>
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <AppIcon name="medicine" size="sm" class="text-purple-500" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">健康记录</p>
            <p class="text-2xl font-bold text-indigo-500 mt-1">{{ store.healthRecords.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">条</p>
          </div>
          <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <AppIcon name="chart" size="sm" class="text-indigo-500" />
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <button @click="goToPage('/desktop/health')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">❤️</div>
          <div>
            <h3 class="font-bold text-gray-800">健康监测</h3>
            <p class="text-xs text-gray-500">血压血糖心率</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/medicine')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💊</div>
          <div>
            <h3 class="font-bold text-gray-800">用药提醒</h3>
            <p class="text-xs text-gray-500">定时提醒吃药</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/memories')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📖</div>
          <div>
            <h3 class="font-bold text-gray-800">回忆录</h3>
            <p class="text-xs text-gray-500">语音记录人生</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/diet')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🍽️</div>
          <div>
            <h3 class="font-bold text-gray-800">饮食管理</h3>
            <p class="text-xs text-gray-500">营养评估菜谱</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/safety')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">✅</div>
          <div>
            <h3 class="font-bold text-gray-800">平安签到</h3>
            <p class="text-xs text-gray-500">自动提醒家人</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/family')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">👨‍👩‍👧</div>
          <div>
            <h3 class="font-bold text-gray-800">亲情连接</h3>
            <p class="text-xs text-gray-500">与子女同步</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/schedule')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📅</div>
          <div>
            <h3 class="font-bold text-gray-800">日程提醒</h3>
            <p class="text-xs text-gray-500">重要日期提醒</p>
          </div>
        </div>
      </button>
      <button @click="goToPage('/desktop/sos')" class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all text-left group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🚨</div>
          <div>
            <h3 class="font-bold text-gray-800">紧急求助</h3>
            <p class="text-xs text-gray-500">一键求助家人</p>
          </div>
        </div>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-gray-800">今日用药</h3>
          <button @click="goToPage('/desktop/medicine')" class="text-xs text-parent hover:text-parent-hover">查看全部</button>
        </div>
        <div class="text-center py-4 text-gray-400 text-sm">今日暂无用药计划</div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-gray-800">健康小贴士</h3>
          <button @click="refreshTip" class="text-xs text-parent hover:text-parent-hover">换一个</button>
        </div>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
          <div class="flex items-start gap-2">
            <AppIcon name="sparkles" size="lg" class="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-gray-800">{{ currentTip.title }}</p>
              <p class="text-xs text-gray-600 mt-1">{{ currentTip.content }}</p>
            </div>
          </div>
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
          <button @click="goToPage('/settings')" class="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <span class="text-2xl mb-1">⚙️</span>
            <span class="text-xs font-medium text-gray-700">设置</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-sm p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-base font-semibold text-gray-800">最近活动</h3>
        <button @click="goToPage('/desktop/safety')" class="text-xs text-parent hover:text-parent-hover">查看更多</button>
      </div>
      <div v-if="allActivities.length > 0" class="space-y-3">
        <div v-for="(record, index) in allActivities.slice(-6)" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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

    <div v-if="showCitySearch" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click.self="showCitySearch = false">
      <div class="bg-white w-full max-w-md rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-bold text-gray-800">🔍 搜索城市</h4>
          <button @click="showCitySearch = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <input v-model="citySearchQuery" type="text" placeholder="输入城市名称..." class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div class="grid grid-cols-3 gap-2">
          <button v-for="city in cityList" :key="city" @click="getCityWeather(city)" class="bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
            {{ city }}
          </button>
        </div>
        <div v-if="citySearchQuery" class="mt-4">
          <button @click="getCityWeather(citySearchQuery)" class="w-full bg-blue-500 text-white py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors">
            查询 {{ citySearchQuery }} 天气
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/appStore'
import AppIcon from '../../components/AppIcon.vue'
import UserAvatar from '../../components/UserAvatar.vue'

const router = useRouter()
const store = useAppStore()

const isWeatherExpanded = ref(false)
const showCitySearch = ref(false)
const citySearchQuery = ref('')
const isSpeakingWeather = ref(false)

const userName = computed(() => {
  const info = store.realNameInfo
  if (info && info.name) {
    return info.name
  }
  return '用户***'
})

const weatherScheduleSuggestions = computed(() => {
  const condition = weatherData.value.current.condition
  const temp = weatherData.value.current.temp
  const uv = weatherData.value.current.uv
  const airQuality = weatherData.value.current.airQuality
  
  const suggestions = []
  
  // 晨练建议
  if (condition.includes('雨') || condition.includes('雾') || airQuality === '差') {
    suggestions.push({ icon: '🏃', time: '06:00-07:00', activity: '晨练', recommended: false })
  } else if (temp < 5 || temp > 30) {
    suggestions.push({ icon: '🏃', time: '06:00-07:00', activity: '晨练', recommended: false })
  } else {
    suggestions.push({ icon: '🏃', time: '06:00-07:00', activity: '晨练', recommended: true })
  }
  
  // 买菜/外出建议
  if (condition.includes('雨') || condition.includes('雪')) {
    suggestions.push({ icon: '🛒', time: '09:00-10:00', activity: '买菜/购物', recommended: false })
  } else if (temp > 35 || uv === '强') {
    suggestions.push({ icon: '🛒', time: '09:00-10:00', activity: '买菜/购物', recommended: false })
  } else {
    suggestions.push({ icon: '🛒', time: '09:00-10:00', activity: '买菜/购物', recommended: true })
  }
  
  // 散步建议
  if (condition.includes('晴') && temp >= 15 && temp <= 28 && uv !== '强') {
    suggestions.push({ icon: '🚶', time: '16:00-17:00', activity: '公园散步', recommended: true })
  } else if (condition.includes('雨') || condition.includes('雪') || temp < 0 || temp > 35) {
    suggestions.push({ icon: '🚶', time: '16:00-17:00', activity: '公园散步', recommended: false })
  } else {
    suggestions.push({ icon: '🚶', time: '16:00-17:00', activity: '公园散步', recommended: true })
  }
  
  // 用药提醒联动
  if (condition.includes('雨') || temp < 10) {
    suggestions.push({ icon: '💊', time: '饭后', activity: '按时服药（注意保暖）', recommended: true })
  } else {
    suggestions.push({ icon: '💊', time: '饭后', activity: '按时服药', recommended: true })
  }
  
  // 社交活动建议
  if (airQuality === '差' || condition.includes('雾') || condition.includes('霾')) {
    suggestions.push({ icon: '📞', time: '全天', activity: '室内活动/视频通话', recommended: true })
  } else if (condition.includes('晴') && temp >= 20 && temp <= 30) {
    suggestions.push({ icon: '👥', time: '14:00-16:00', activity: '亲友聚会', recommended: true })
  } else {
    suggestions.push({ icon: '📞', time: '全天', activity: '室内活动/视频通话', recommended: true })
  }
  
  return suggestions
})

const getForecastDate = (offset) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const weatherData = ref({
  city: '北京',
  current: {
    icon: '☀️',
    temp: 28,
    condition: '晴',
    humidity: 65,
    wind: '东南风3级',
    uv: '中等',
    airQuality: '优'
  },
  forecast: [
    { day: '今天', icon: '☀️', high: 30, low: 22 },
    { day: '明天', icon: '⛅', high: 29, low: 21 },
    { day: '后天', icon: '🌧️', high: 25, low: 19 },
    { day: '周五', icon: '☁️', high: 27, low: 20 },
    { day: '周六', icon: '☀️', high: 31, low: 23 }
  ],
  tips: '今日紫外线中等，外出建议涂防晒霜。气温适宜，但早晚温差较大，请注意增减衣物。',
  suggestion: '适合户外活动，建议上午10点前或下午4点后外出。如果有晨练习惯，可以正常进行。'
})

const hour = new Date().getHours()
const greeting = computed(() => {
  if (hour < 6) return '夜深了，注意休息'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  if (hour < 22) return '晚上好'
  return '夜深了，注意休息'
})

const pendingMedicine = computed(() => {
  return store.medicineRecords.filter(m => !m.takenToday).length
})

const healthTips = [
  { title: '多喝水', content: '每天建议喝1500-2000毫升水，可以帮助身体代谢，促进健康。' },
  { title: '适当运动', content: '每天进行30分钟的散步或太极拳，有助于保持身体活力。' },
  { title: '按时吃药', content: '请按时服用医生开的药物，不要随意增减剂量。' },
  { title: '保持心情', content: '保持愉快的心情对身体健康很重要，多和家人朋友聊天。' },
  { title: '注意饮食', content: '饮食要清淡，多吃蔬菜水果，少吃油腻和辛辣食物。' },
  { title: '定期体检', content: '建议每年进行一次全面体检，及时发现健康问题。' },
  { title: '充足睡眠', content: '每天保证7-8小时的睡眠，有助于身体恢复和免疫力提升。' },
  { title: '晒太阳', content: '每天适当晒太阳可以帮助身体合成维生素D，促进钙吸收。' }
]

const currentTip = ref(healthTips[0])

const refreshTip = () => {
  const randomIndex = Math.floor(Math.random() * healthTips.length)
  currentTip.value = healthTips[randomIndex]
}

const todayMedicines = computed(() => {
  return []
})

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

const toggleWeatherExpand = () => {
  isWeatherExpanded.value = !isWeatherExpanded.value
}

const speakWeather = () => {
  import('../../utils/voiceAssistant').then(({ voiceAssistant }) => {
    if (isSpeakingWeather.value) {
      voiceAssistant.stopSpeaking()
      isSpeakingWeather.value = false
      return
    }
    const w = weatherData.value
    const text = `${w.city}今天${w.current.condition}，温度${w.current.temp}度，湿度${w.current.humidity}%。${w.tips}。出行建议：${w.suggestion}`
    voiceAssistant.speak(text)
    isSpeakingWeather.value = true
  })
}

const searchWeather = () => {
  showCitySearch.value = true
}

const getCityWeather = (city) => {
  const cityWeatherData = {
    '北京': {
      current: { icon: '☀️', temp: 28, condition: '晴', humidity: 65, wind: '东南风3级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 30, low: 22 }, { day: '明天', icon: '⛅', high: 29, low: 21 }, { day: '后天', icon: '🌧️', high: 25, low: 19 }, { day: '周五', icon: '☁️', high: 27, low: 20 }, { day: '周六', icon: '☀️', high: 31, low: 23 }],
      tips: '今日紫外线中等，外出建议涂防晒霜。气温适宜，但早晚温差较大，请注意增减衣物。',
      suggestion: '适合户外活动，建议上午10点前或下午4点后外出。如果有晨练习惯，可以正常进行。'
    },
    '上海': {
      current: { icon: '⛅', temp: 30, condition: '多云', humidity: 80, wind: '东风2级', uv: '较弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '⛅', high: 32, low: 25 }, { day: '明天', icon: '🌧️', high: 28, low: 24 }, { day: '后天', icon: '🌧️', high: 26, low: 23 }, { day: '周五', icon: '☁️', high: 29, low: 24 }, { day: '周六', icon: '☀️', high: 31, low: 25 }],
      tips: '今日湿度较高，注意防暑降温。未来两天有降雨，出门记得带伞。',
      suggestion: '今天适合室内活动，避免午后高温时段外出。明天出门请携带雨具。'
    },
    '广州': {
      current: { icon: '🌧️', temp: 26, condition: '小雨', humidity: 90, wind: '南风3级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 28, low: 24 }, { day: '明天', icon: '☔', high: 27, low: 24 }, { day: '后天', icon: '⛅', high: 29, low: 25 }, { day: '周五', icon: '☀️', high: 32, low: 26 }, { day: '周六', icon: '☀️', high: 33, low: 27 }],
      tips: '今日有小雨，路面湿滑，出门请慢行。空气湿度大，注意防潮防霉。',
      suggestion: '出门请携带雨伞，穿防滑鞋。不适合晨练，建议在室内活动。'
    },
    '深圳': {
      current: { icon: '☁️', temp: 27, condition: '阴天', humidity: 85, wind: '东北风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 29, low: 25 }, { day: '明天', icon: '🌧️', high: 28, low: 24 }, { day: '后天', icon: '☔', high: 26, low: 23 }, { day: '周五', icon: '⛅', high: 28, low: 24 }, { day: '周六', icon: '☀️', high: 30, low: 26 }],
      tips: '今日天气阴凉，适合户外活动。但明天起有降雨，请提前做好准备。',
      suggestion: '今天可以外出散步或买菜。明天出门请带伞，注意安全。'
    },
    '成都': {
      current: { icon: '🌫️', temp: 24, condition: '雾霾', humidity: 75, wind: '无风', uv: '弱', airQuality: '差' },
      forecast: [{ day: '今天', icon: '🌫️', high: 26, low: 19 }, { day: '明天', icon: '☁️', high: 25, low: 18 }, { day: '后天', icon: '☀️', high: 28, low: 20 }, { day: '周五', icon: '☀️', high: 30, low: 21 }, { day: '周六', icon: '⛅', high: 29, low: 20 }],
      tips: '今日空气质量较差，建议减少外出。出门请佩戴口罩，做好防护。',
      suggestion: '尽量待在室内，避免户外活动。可以在室内做一些简单的健身运动。'
    },
    '杭州': {
      current: { icon: '☀️', temp: 32, condition: '晴', humidity: 55, wind: '西南风3级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 34, low: 24 }, { day: '明天', icon: '☀️', high: 35, low: 25 }, { day: '后天', icon: '⛅', high: 33, low: 24 }, { day: '周五', icon: '🌧️', high: 29, low: 23 }, { day: '周六', icon: '☁️', high: 30, low: 24 }],
      tips: '今日紫外线很强，外出请做好防晒措施。气温较高，注意防暑降温。',
      suggestion: '避免中午11点到下午3点外出。可以选择早晨或傍晚出门散步。'
    },
    '南京': {
      current: { icon: '⛅', temp: 29, condition: '多云', humidity: 70, wind: '东南风2级', uv: '中等', airQuality: '良' },
      forecast: [{ day: '今天', icon: '⛅', high: 31, low: 23 }, { day: '明天', icon: '☀️', high: 33, low: 24 }, { day: '后天', icon: '☀️', high: 34, low: 25 }, { day: '周五', icon: '🌧️', high: 28, low: 22 }, { day: '周六', icon: '⛅', high: 30, low: 23 }],
      tips: '今日天气舒适，适合户外活动。注意补充水分，预防中暑。',
      suggestion: '适合晨练和傍晚散步，中午时段避免长时间户外活动。'
    },
    '武汉': {
      current: { icon: '🌧️', temp: 25, condition: '中雨', humidity: 88, wind: '北风3级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 27, low: 22 }, { day: '明天', icon: '☔', high: 26, low: 21 }, { day: '后天', icon: '⛅', high: 29, low: 23 }, { day: '周五', icon: '☀️', high: 32, low: 24 }, { day: '周六', icon: '☀️', high: 33, low: 25 }],
      tips: '今日有中雨，出门请携带雨具。路面湿滑，注意安全。',
      suggestion: '减少外出，适合在家休息或进行室内活动。注意关好门窗。'
    },
    '西安': {
      current: { icon: '☀️', temp: 30, condition: '晴', humidity: 45, wind: '西风2级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 32, low: 20 }, { day: '明天', icon: '☀️', high: 33, low: 21 }, { day: '后天', icon: '⛅', high: 31, low: 20 }, { day: '周五', icon: '🌧️', high: 26, low: 18 }, { day: '周六', icon: '☁️', high: 28, low: 19 }],
      tips: '今日天气干燥，注意补水。紫外线较强，外出做好防晒。',
      suggestion: '适合户外活动，但需注意防晒和补水。早晚温差较大。'
    },
    '重庆': {
      current: { icon: '☁️', temp: 26, condition: '阴天', humidity: 82, wind: '微风', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 28, low: 23 }, { day: '明天', icon: '🌧️', high: 27, low: 22 }, { day: '后天', icon: '🌧️', high: 26, low: 21 }, { day: '周五', icon: '⛅', high: 29, low: 23 }, { day: '周六', icon: '☀️', high: 31, low: 24 }],
      tips: '今日湿度较大，体感闷热。注意防暑降温，多补充水分。',
      suggestion: '适合室内活动，如需外出请携带雨具，穿透气衣物。'
    },
    '天津': {
      current: { icon: '⛅', temp: 27, condition: '多云', humidity: 60, wind: '北风3级', uv: '中等', airQuality: '良' },
      forecast: [{ day: '今天', icon: '⛅', high: 29, low: 21 }, { day: '明天', icon: '☀️', high: 30, low: 22 }, { day: '后天', icon: '☀️', high: 31, low: 23 }, { day: '周五', icon: '🌧️', high: 26, low: 19 }, { day: '周六', icon: '⛅', high: 28, low: 20 }],
      tips: '今日天气适宜，风力稍大。外出注意防风，适时增减衣物。',
      suggestion: '适合户外活动和晨练，注意防风保暖。'
    },
    '苏州': {
      current: { icon: '🌧️', temp: 24, condition: '小雨', humidity: 85, wind: '东风2级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 26, low: 22 }, { day: '明天', icon: '⛅', high: 28, low: 23 }, { day: '后天', icon: '☀️', high: 30, low: 24 }, { day: '周五', icon: '☀️', high: 32, low: 25 }, { day: '周六', icon: '⛅', high: 31, low: 24 }],
      tips: '今日有小雨，空气湿润。出门携带雨具，注意路面湿滑。',
      suggestion: '适合室内品茶、阅读。雨后空气清新，适合傍晚散步。'
    },
    '长沙': {
      current: { icon: '☀️', temp: 33, condition: '晴', humidity: 50, wind: '南风2级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 35, low: 26 }, { day: '明天', icon: '☀️', high: 36, low: 27 }, { day: '后天', icon: '⛅', high: 34, low: 26 }, { day: '周五', icon: '🌧️', high: 30, low: 24 }, { day: '周六', icon: '☁️', high: 32, low: 25 }],
      tips: '今日高温炎热，注意防暑降温。避免中午时段外出。',
      suggestion: '多喝水，少外出。如需外出请做好防晒措施，携带遮阳伞。'
    },
    '郑州': {
      current: { icon: '🌫️', temp: 22, condition: '轻雾', humidity: 78, wind: '东风1级', uv: '弱', airQuality: '差' },
      forecast: [{ day: '今天', icon: '🌫️', high: 24, low: 18 }, { day: '明天', icon: '☁️', high: 26, low: 19 }, { day: '后天', icon: '⛅', high: 28, low: 20 }, { day: '周五', icon: '☀️', high: 30, low: 21 }, { day: '周六', icon: '☀️', high: 32, low: 22 }],
      tips: '今日有轻雾，能见度较低。空气质量差，减少户外活动。',
      suggestion: '外出请佩戴口罩，注意交通安全。适合室内活动。'
    },
    '沈阳': {
      current: { icon: '☀️', temp: 18, condition: '晴', humidity: 40, wind: '西北风3级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 20, low: 10 }, { day: '明天', icon: '☀️', high: 22, low: 11 }, { day: '后天', icon: '⛅', high: 21, low: 10 }, { day: '周五', icon: '🌧️', high: 17, low: 8 }, { day: '周六', icon: '☁️', high: 19, low: 9 }],
      tips: '今日天气凉爽，风力较大。注意防风保暖，适时增减衣物。',
      suggestion: '适合户外活动，但需注意防风。早晚较凉，建议穿外套。'
    },
    '青岛': {
      current: { icon: '⛅', temp: 23, condition: '多云', humidity: 75, wind: '东南风4级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '⛅', high: 25, low: 19 }, { day: '明天', icon: '🌧️', high: 24, low: 18 }, { day: '后天', icon: '🌧️', high: 23, low: 18 }, { day: '周五', icon: '☁️', high: 25, low: 19 }, { day: '周六', icon: '☀️', high: 27, low: 20 }],
      tips: '今日海风较大，湿度较高。外出注意防风，携带薄外套。',
      suggestion: '适合海边散步，但需注意防风。雨后空气清新，适合户外活动。'
    },
    '宁波': {
      current: { icon: '🌧️', temp: 25, condition: '阵雨', humidity: 88, wind: '东风3级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '🌧️', high: 27, low: 22 }, { day: '明天', icon: '⛅', high: 29, low: 23 }, { day: '后天', icon: '☀️', high: 31, low: 24 }, { day: '周五', icon: '☀️', high: 32, low: 25 }, { day: '周六', icon: '⛅', high: 31, low: 24 }],
      tips: '今日有阵雨，出门请携带雨具。湿度大，注意防潮。',
      suggestion: '适合室内活动，雨停后可外出散步。注意关好门窗。'
    },
    '东莞': {
      current: { icon: '☁️', temp: 28, condition: '阴天', humidity: 80, wind: '南风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 30, low: 25 }, { day: '明天', icon: '🌧️', high: 29, low: 24 }, { day: '后天', icon: '🌧️', high: 28, low: 24 }, { day: '周五', icon: '⛅', high: 30, low: 25 }, { day: '周六', icon: '☀️', high: 32, low: 26 }],
      tips: '今日天气闷热，注意防暑。可能有降雨，出门携带雨具。',
      suggestion: '适合室内活动，如需外出请携带雨具和遮阳伞。'
    },
    '昆明': {
      current: { icon: '☀️', temp: 22, condition: '晴', humidity: 35, wind: '西南风2级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 24, low: 14 }, { day: '明天', icon: '☀️', high: 25, low: 15 }, { day: '后天', icon: '☀️', high: 26, low: 15 }, { day: '周五', icon: '⛅', high: 24, low: 14 }, { day: '周六', icon: '☀️', high: 25, low: 14 }],
      tips: '今日天气晴朗，紫外线强。气候干燥，注意补水和防晒。',
      suggestion: '适合户外活动，四季如春。注意防晒，早晚稍凉需加衣。'
    },
    '大连': {
      current: { icon: '⛅', temp: 20, condition: '多云', humidity: 65, wind: '北风4级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '⛅', high: 22, low: 15 }, { day: '明天', icon: '☀️', high: 23, low: 16 }, { day: '后天', icon: '☀️', high: 24, low: 16 }, { day: '周五', icon: '🌧️', high: 20, low: 13 }, { day: '周六', icon: '☁️', high: 21, low: 14 }],
      tips: '今日海风较大，天气凉爽。外出注意防风，携带薄外套。',
      suggestion: '适合海边散步，但需注意防风保暖。早晚较凉。'
    },
    '厦门': {
      current: { icon: '☀️', temp: 29, condition: '晴', humidity: 70, wind: '东风3级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 31, low: 24 }, { day: '明天', icon: '☀️', high: 32, low: 25 }, { day: '后天', icon: '⛅', high: 30, low: 24 }, { day: '周五', icon: '🌧️', high: 27, low: 23 }, { day: '周六', icon: '☁️', high: 29, low: 24 }],
      tips: '今日阳光充足，紫外线强。海边风大，注意防晒和防风。',
      suggestion: '适合海边游玩，做好防晒措施。早晚海风较大。'
    },
    '合肥': {
      current: { icon: '🌧️', temp: 24, condition: '雷阵雨', humidity: 85, wind: '北风3级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '🌧️', high: 26, low: 21 }, { day: '明天', icon: '⛅', high: 28, low: 22 }, { day: '后天', icon: '☀️', high: 30, low: 23 }, { day: '周五', icon: '☀️', high: 32, low: 24 }, { day: '周六', icon: '⛅', high: 31, low: 23 }],
      tips: '今日有雷阵雨，注意防雷避雨。出门携带雨具，注意安全。',
      suggestion: '减少外出，避免在树下避雨。雨停后可进行户外活动。'
    },
    '佛山': {
      current: { icon: '☁️', temp: 29, condition: '阴天', humidity: 78, wind: '南风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 31, low: 25 }, { day: '明天', icon: '🌧️', high: 30, low: 24 }, { day: '后天', icon: '🌧️', high: 29, low: 24 }, { day: '周五', icon: '⛅', high: 31, low: 25 }, { day: '周六', icon: '☀️', high: 33, low: 26 }],
      tips: '今日天气闷热，注意防暑降温。可能有降雨，出门带伞。',
      suggestion: '适合室内活动，如需外出请携带雨具，多喝水。'
    },
    '福州': {
      current: { icon: '🌧️', temp: 27, condition: '小雨', humidity: 88, wind: '东风3级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 29, low: 24 }, { day: '明天', icon: '⛅', high: 30, low: 24 }, { day: '后天', icon: '☀️', high: 32, low: 25 }, { day: '周五', icon: '☀️', high: 33, low: 26 }, { day: '周六', icon: '⛅', high: 32, low: 25 }],
      tips: '今日有小雨，湿度大。出门携带雨具，注意防潮防霉。',
      suggestion: '适合室内品茶、阅读。雨停后空气清新，适合散步。'
    },
    '哈尔滨': {
      current: { icon: '☀️', temp: 15, condition: '晴', humidity: 35, wind: '西北风3级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 17, low: 5 }, { day: '明天', icon: '☀️', high: 18, low: 6 }, { day: '后天', icon: '⛅', high: 16, low: 4 }, { day: '周五', icon: '🌧️', high: 12, low: 3 }, { day: '周六', icon: '☁️', high: 14, low: 4 }],
      tips: '今日天气凉爽，早晚较冷。注意保暖，适时增减衣物。',
      suggestion: '适合户外活动，但早晚较冷需穿外套。注意防风。'
    },
    '济南': {
      current: { icon: '☀️', temp: 26, condition: '晴', humidity: 40, wind: '南风2级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 28, low: 18 }, { day: '明天', icon: '☀️', high: 29, low: 19 }, { day: '后天', icon: '⛅', high: 27, low: 18 }, { day: '周五', icon: '🌧️', high: 23, low: 15 }, { day: '周六', icon: '☁️', high: 25, low: 16 }],
      tips: '今日天气干燥，紫外线强。注意补水防晒，多饮水。',
      suggestion: '适合户外活动，但需注意防晒。气候干燥，多喝水。'
    },
    '温州': {
      current: { icon: '🌧️', temp: 26, condition: '中雨', humidity: 90, wind: '东风4级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 28, low: 23 }, { day: '明天', icon: '☔', high: 27, low: 22 }, { day: '后天', icon: '⛅', high: 29, low: 23 }, { day: '周五', icon: '☀️', high: 31, low: 24 }, { day: '周六', icon: '☀️', high: 32, low: 25 }],
      tips: '今日有中雨，风力较大。出门携带雨具，注意防风。',
      suggestion: '减少外出，注意防风防雨。雨停后可进行户外活动。'
    },
    '长春': {
      current: { icon: '⛅', temp: 16, condition: '多云', humidity: 50, wind: '北风3级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '⛅', high: 18, low: 7 }, { day: '明天', icon: '☀️', high: 19, low: 8 }, { day: '后天', icon: '☀️', high: 20, low: 8 }, { day: '周五', icon: '🌧️', high: 15, low: 5 }, { day: '周六', icon: '☁️', high: 17, low: 6 }],
      tips: '今日天气凉爽，风力较大。注意防风保暖，适时增减衣物。',
      suggestion: '适合户外活动，但需注意防风。早晚较凉，建议穿外套。'
    },
    '石家庄': {
      current: { icon: '🌫️', temp: 20, condition: '雾霾', humidity: 65, wind: '南风1级', uv: '弱', airQuality: '差' },
      forecast: [{ day: '今天', icon: '🌫️', high: 22, low: 14 }, { day: '明天', icon: '☁️', high: 24, low: 15 }, { day: '后天', icon: '⛅', high: 26, low: 16 }, { day: '周五', icon: '☀️', high: 28, low: 17 }, { day: '周六', icon: '☀️', high: 29, low: 18 }],
      tips: '今日空气质量差，有雾霾。减少外出，出门佩戴口罩。',
      suggestion: '尽量待在室内，避免户外活动。可在室内进行简单运动。'
    },
    '南宁': {
      current: { icon: '☁️', temp: 28, condition: '阴天', humidity: 82, wind: '南风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 30, low: 24 }, { day: '明天', icon: '🌧️', high: 29, low: 23 }, { day: '后天', icon: '🌧️', high: 28, low: 23 }, { day: '周五', icon: '⛅', high: 30, low: 24 }, { day: '周六', icon: '☀️', high: 32, low: 25 }],
      tips: '今日天气闷热，湿度大。注意防暑降温，多补充水分。',
      suggestion: '适合室内活动，如需外出请携带雨具，穿透气衣物。'
    },
    '常州': {
      current: { icon: '⛅', temp: 27, condition: '多云', humidity: 72, wind: '东风2级', uv: '中等', airQuality: '良' },
      forecast: [{ day: '今天', icon: '⛅', high: 29, low: 22 }, { day: '明天', icon: '☀️', high: 31, low: 23 }, { day: '后天', icon: '☀️', high: 32, low: 24 }, { day: '周五', icon: '🌧️', high: 27, low: 21 }, { day: '周六', icon: '☁️', high: 29, low: 22 }],
      tips: '今日天气舒适，适合户外活动。注意补充水分，预防中暑。',
      suggestion: '适合晨练和傍晚散步，中午时段避免长时间户外活动。'
    },
    '泉州': {
      current: { icon: '☀️', temp: 30, condition: '晴', humidity: 68, wind: '东北风3级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 32, low: 25 }, { day: '明天', icon: '☀️', high: 33, low: 26 }, { day: '后天', icon: '⛅', high: 31, low: 25 }, { day: '周五', icon: '🌧️', high: 28, low: 24 }, { day: '周六', icon: '☁️', high: 30, low: 25 }],
      tips: '今日阳光充足，紫外线强。注意防晒，多补充水分。',
      suggestion: '适合海边游玩，做好防晒措施。海风较大，注意防风。'
    },
    '南通': {
      current: { icon: '🌧️', temp: 25, condition: '小雨', humidity: 85, wind: '东风3级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '🌧️', high: 27, low: 21 }, { day: '明天', icon: '⛅', high: 29, low: 22 }, { day: '后天', icon: '☀️', high: 31, low: 23 }, { day: '周五', icon: '☀️', high: 32, low: 24 }, { day: '周六', icon: '⛅', high: 31, low: 23 }],
      tips: '今日有小雨，湿度大。出门携带雨具，注意防潮。',
      suggestion: '适合室内活动，雨停后可外出散步。注意关好门窗。'
    },
    '金华': {
      current: { icon: '☀️', temp: 31, condition: '晴', humidity: 55, wind: '西风2级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 33, low: 23 }, { day: '明天', icon: '☀️', high: 34, low: 24 }, { day: '后天', icon: '⛅', high: 32, low: 23 }, { day: '周五', icon: '🌧️', high: 28, low: 21 }, { day: '周六', icon: '☁️', high: 30, low: 22 }],
      tips: '今日高温炎热，紫外线强。注意防暑防晒，多补充水分。',
      suggestion: '避免中午时段外出，如需外出请做好防晒措施。'
    },
    '徐州': {
      current: { icon: '⛅', temp: 26, condition: '多云', humidity: 60, wind: '北风3级', uv: '中等', airQuality: '良' },
      forecast: [{ day: '今天', icon: '⛅', high: 28, low: 19 }, { day: '明天', icon: '☀️', high: 29, low: 20 }, { day: '后天', icon: '☀️', high: 30, low: 21 }, { day: '周五', icon: '🌧️', high: 25, low: 17 }, { day: '周六', icon: '☁️', high: 27, low: 18 }],
      tips: '今日天气适宜，风力稍大。外出注意防风，适时增减衣物。',
      suggestion: '适合户外活动和晨练，注意防风保暖。'
    },
    '太原': {
      current: { icon: '☀️', temp: 24, condition: '晴', humidity: 35, wind: '西北风2级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 26, low: 14 }, { day: '明天', icon: '☀️', high: 27, low: 15 }, { day: '后天', icon: '☀️', high: 28, low: 15 }, { day: '周五', icon: '⛅', high: 24, low: 13 }, { day: '周六', icon: '☁️', high: 25, low: 14 }],
      tips: '今日天气干燥，紫外线强。气候干燥，注意补水防晒。',
      suggestion: '适合户外活动，但需注意防晒。早晚温差较大。'
    },
    '珠海': {
      current: { icon: '☁️', temp: 29, condition: '阴天', humidity: 80, wind: '东南风3级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 31, low: 26 }, { day: '明天', icon: '🌧️', high: 30, low: 25 }, { day: '后天', icon: '🌧️', high: 29, low: 25 }, { day: '周五', icon: '⛅', high: 31, low: 26 }, { day: '周六', icon: '☀️', high: 33, low: 27 }],
      tips: '今日天气闷热，湿度大。可能有降雨，出门携带雨具。',
      suggestion: '适合室内活动，如需外出请携带雨具，多喝水。'
    },
    '烟台': {
      current: { icon: '⛅', temp: 22, condition: '多云', humidity: 70, wind: '北风4级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '⛅', high: 24, low: 17 }, { day: '明天', icon: '☀️', high: 25, low: 18 }, { day: '后天', icon: '☀️', high: 26, low: 18 }, { day: '周五', icon: '🌧️', high: 21, low: 15 }, { day: '周六', icon: '☁️', high: 23, low: 16 }],
      tips: '今日海风较大，天气凉爽。外出注意防风，携带薄外套。',
      suggestion: '适合海边散步，但需注意防风保暖。早晚较凉。'
    },
    '海口': {
      current: { icon: '☀️', temp: 32, condition: '晴', humidity: 75, wind: '南风3级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 34, low: 27 }, { day: '明天', icon: '☀️', high: 35, low: 28 }, { day: '后天', icon: '⛅', high: 33, low: 27 }, { day: '周五', icon: '🌧️', high: 30, low: 26 }, { day: '周六', icon: '☁️', high: 32, low: 27 }],
      tips: '今日高温炎热，紫外线强。注意防暑降温，避免长时间户外活动。',
      suggestion: '多喝水，少外出。如需外出请做好防晒措施，携带遮阳伞。'
    },
    '贵阳': {
      current: { icon: '🌧️', temp: 20, condition: '小雨', humidity: 85, wind: '东风2级', uv: '弱', airQuality: '优' },
      forecast: [{ day: '今天', icon: '🌧️', high: 22, low: 16 }, { day: '明天', icon: '⛅', high: 24, low: 17 }, { day: '后天', icon: '☀️', high: 26, low: 18 }, { day: '周五', icon: '☀️', high: 27, low: 19 }, { day: '周六', icon: '⛅', high: 26, low: 18 }],
      tips: '今日有小雨，天气凉爽。出门携带雨具，注意保暖。',
      suggestion: '适合室内活动，雨停后可外出散步。气候凉爽，注意保暖。'
    },
    '乌鲁木齐': {
      current: { icon: '☀️', temp: 25, condition: '晴', humidity: 25, wind: '西北风3级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 27, low: 15 }, { day: '明天', icon: '☀️', high: 28, low: 16 }, { day: '后天', icon: '☀️', high: 29, low: 16 }, { day: '周五', icon: '⛅', high: 26, low: 14 }, { day: '周六', icon: '☁️', high: 27, low: 15 }],
      tips: '今日天气干燥，紫外线强。昼夜温差大，注意增减衣物。',
      suggestion: '适合户外活动，但需注意防晒。早晚较凉，建议穿外套。'
    },
    '兰州': {
      current: { icon: '☀️', temp: 23, condition: '晴', humidity: 30, wind: '西风2级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 25, low: 12 }, { day: '明天', icon: '☀️', high: 26, low: 13 }, { day: '后天', icon: '☀️', high: 27, low: 13 }, { day: '周五', icon: '⛅', high: 24, low: 11 }, { day: '周六', icon: '☁️', high: 25, low: 12 }],
      tips: '今日天气干燥，紫外线强。注意补水防晒，多饮水。',
      suggestion: '适合户外活动，但需注意防晒。气候干燥，多喝水。'
    },
    '绍兴': {
      current: { icon: '🌧️', temp: 24, condition: '阵雨', humidity: 88, wind: '东风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '🌧️', high: 26, low: 21 }, { day: '明天', icon: '⛅', high: 28, low: 22 }, { day: '后天', icon: '☀️', high: 30, low: 23 }, { day: '周五', icon: '☀️', high: 32, low: 24 }, { day: '周六', icon: '⛅', high: 31, low: 23 }],
      tips: '今日有阵雨，湿度大。出门携带雨具，注意防潮。',
      suggestion: '适合室内品茶、阅读。雨停后空气清新，适合散步。'
    },
    '中山': {
      current: { icon: '☁️', temp: 28, condition: '阴天', humidity: 80, wind: '南风2级', uv: '弱', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☁️', high: 30, low: 25 }, { day: '明天', icon: '🌧️', high: 29, low: 24 }, { day: '后天', icon: '🌧️', high: 28, low: 24 }, { day: '周五', icon: '⛅', high: 30, low: 25 }, { day: '周六', icon: '☀️', high: 32, low: 26 }],
      tips: '今日天气闷热，湿度大。可能有降雨，出门携带雨具。',
      suggestion: '适合室内活动，如需外出请携带雨具，多喝水。'
    },
    '台州': {
      current: { icon: '⛅', temp: 26, condition: '多云', humidity: 75, wind: '东风3级', uv: '中等', airQuality: '优' },
      forecast: [{ day: '今天', icon: '⛅', high: 28, low: 22 }, { day: '明天', icon: '☀️', high: 30, low: 23 }, { day: '后天', icon: '☀️', high: 31, low: 24 }, { day: '周五', icon: '🌧️', high: 26, low: 21 }, { day: '周六', icon: '☁️', high: 28, low: 22 }],
      tips: '今日天气舒适，适合户外活动。注意补充水分，预防中暑。',
      suggestion: '适合晨练和傍晚散步，中午时段避免长时间户外活动。'
    },
    '扬州': {
      current: { icon: '☀️', temp: 28, condition: '晴', humidity: 60, wind: '东南风2级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 30, low: 22 }, { day: '明天', icon: '☀️', high: 31, low: 23 }, { day: '后天', icon: '⛅', high: 29, low: 22 }, { day: '周五', icon: '🌧️', high: 25, low: 19 }, { day: '周六', icon: '☁️', high: 27, low: 20 }],
      tips: '今日阳光充足，紫外线强。注意防晒，多补充水分。',
      suggestion: '适合园林游玩，做好防晒措施。早晚稍凉。'
    },
    '呼和浩特': {
      current: { icon: '☀️', temp: 18, condition: '晴', humidity: 30, wind: '西北风4级', uv: '强', airQuality: '优' },
      forecast: [{ day: '今天', icon: '☀️', high: 20, low: 8 }, { day: '明天', icon: '☀️', high: 21, low: 9 }, { day: '后天', icon: '☀️', high: 22, low: 9 }, { day: '周五', icon: '⛅', high: 19, low: 7 }, { day: '周六', icon: '☁️', high: 20, low: 8 }],
      tips: '今日天气干燥，风力较大。注意防风保暖，多饮水。',
      suggestion: '适合户外活动，但需注意防风。早晚较凉，建议穿外套。'
    },
    '银川': {
      current: { icon: '☀️', temp: 22, condition: '晴', humidity: 25, wind: '北风3级', uv: '强', airQuality: '良' },
      forecast: [{ day: '今天', icon: '☀️', high: 24, low: 12 }, { day: '明天', icon: '☀️', high: 25, low: 13 }, { day: '后天', icon: '☀️', high: 26, low: 13 }, { day: '周五', icon: '⛅', high: 23, low: 11 }, { day: '周六', icon: '☁️', high: 24, low: 12 }],
      tips: '今日天气干燥，紫外线强。昼夜温差大，注意增减衣物。',
      suggestion: '适合户外活动，但需注意防晒。气候干燥，多喝水。'
    }
  }
  
  const data = cityWeatherData[city] || cityWeatherData['北京']
  weatherData.value = { ...weatherData.value, city, ...data }
  showCitySearch.value = false
}

const cityList = [
  '北京', '上海', '广州', '深圳', '成都', '杭州',
  '南京', '武汉', '西安', '重庆', '天津', '苏州',
  '长沙', '郑州', '沈阳', '青岛', '宁波', '东莞',
  '昆明', '大连', '厦门', '合肥', '佛山', '福州',
  '哈尔滨', '济南', '温州', '长春', '石家庄', '南宁',
  '常州', '泉州', '南通', '金华', '徐州', '太原',
  '珠海', '烟台', '海口', '贵阳', '乌鲁木齐', '兰州',
  '绍兴', '中山', '台州', '扬州', '呼和浩特', '银川'
]

onMounted(() => {
  store.loadSignInRecords()
  store.loadDietRecords()
  store.loadConnectedChildren()
  store.loadRealNameInfo()
})
</script>