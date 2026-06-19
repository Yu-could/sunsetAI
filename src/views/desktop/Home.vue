<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="bg-gradient-to-br from-parent to-parent-hover rounded-2xl p-5 text-white mb-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-orange-100 text-sm">{{ greeting }}</p>
          <h2 class="text-2xl font-bold mt-1">欢迎回来</h2>
          <p class="text-orange-100 text-xs mt-1">今天是美好的一天，祝您身体健康</p>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">👵</div>
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
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">❤️</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">本月签到</p>
            <p class="text-2xl font-bold text-green-500 mt-1">{{ store.signInRecords.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">天</p>
          </div>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">今日热量</p>
            <p class="text-2xl font-bold text-gray-400 mt-1">-</p>
            <p class="text-gray-400 text-xs mt-0.5">千卡</p>
          </div>
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">🍜</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">已连接子女</p>
            <p class="text-2xl font-bold text-blue-500 mt-1">{{ store.connectedChildren.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">人</p>
          </div>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">👨‍👩‍👧</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">待服药物</p>
            <p class="text-2xl font-bold text-purple-500 mt-1">{{ pendingMedicine }}</p>
            <p class="text-gray-400 text-xs mt-0.5">种</p>
          </div>
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">💊</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs">健康记录</p>
            <p class="text-2xl font-bold text-indigo-500 mt-1">{{ store.healthRecords.length }}</p>
            <p class="text-gray-400 text-xs mt-0.5">条</p>
          </div>
          <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">📊</div>
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
        <div v-if="todayMedicines.length > 0" class="space-y-2">
          <div v-for="(med, index) in todayMedicines" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">💊</div>
              <div>
                <p class="text-sm font-medium text-gray-800">{{ med.name }}</p>
                <p class="text-xs text-gray-500">{{ med.dose }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold" :class="med.taken ? 'text-green-500' : 'text-gray-400'">{{ med.time }}</p>
              <span v-if="med.taken" class="text-xs text-green-500">已服用</span>
              <span v-else class="text-xs text-amber-500">待服用</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-gray-400 text-sm">今日暂无用药计划</div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-base font-semibold text-gray-800">健康小贴士</h3>
          <button @click="refreshTip" class="text-xs text-parent hover:text-parent-hover">换一个</button>
        </div>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
          <div class="flex items-start gap-2">
            <span class="text-xl">🌿</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/appStore'

const router = useRouter()
const store = useAppStore()

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
  return [
    { name: '降压药', dose: '1粒/次', time: '08:00', taken: true },
    { name: '钙片', dose: '1粒/次', time: '12:00', taken: false },
    { name: '维生素', dose: '1粒/次', time: '20:00', taken: false }
  ]
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

onMounted(() => {
  store.loadSignInRecords()
  store.loadDietRecords()
  store.loadConnectedChildren()
})
</script>