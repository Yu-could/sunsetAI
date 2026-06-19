<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">饮食管理</h2>
        <p class="text-gray-500 mt-1">记录每日饮食，关注营养健康</p>
      </div>
      <button @click="openRecordModal" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        <span class="text-xl">📝</span>
        <span>记录饮食</span>
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日热量</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">目标: 2,000千卡</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🔥</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-orange-500 h-3 rounded-full" style="width: 0%"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">蛋白质</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">目标: 70g</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🥩</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-blue-500 h-3 rounded-full" style="width: 0%"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">碳水化合物</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">目标: 300g</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🍚</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-green-500 h-3 rounded-full" style="width: 0%"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">脂肪</p>
            <p class="text-3xl font-bold text-gray-400 mt-2">-</p>
            <p class="text-gray-400 text-sm mt-1">目标: 65g</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🥑</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-yellow-500 h-3 rounded-full" style="width: 0%"></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">今日饮食记录</h3>
        <div v-if="store.dietRecords.length > 0" class="space-y-4">
          <div v-for="(record, index) in store.dietRecords.slice(-5)" :key="index" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">🍜</div>
              <div>
                <p class="font-medium text-gray-800">{{ record.mealType || '饮食' }}</p>
                <p class="text-sm text-gray-500">{{ formatTime(record.timestamp) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-800">{{ record.calories || '-' }}千卡</p>
              <p class="text-sm text-gray-500">{{ record.content }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="text-3xl mb-2">🍜</div>
          <p>暂无饮食记录</p>
          <p class="text-sm">点击上方按钮记录饮食</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">营养建议</h3>
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="flex items-start gap-3">
              <span class="text-xl">💡</span>
              <div>
                <p class="font-medium text-gray-800">开始记录</p>
                <p class="text-sm text-gray-600">记录您的饮食后，系统会提供个性化营养建议。</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div class="flex items-start gap-3">
              <span class="text-xl">💧</span>
              <div>
                <p class="font-medium text-blue-800">饮水提醒</p>
                <p class="text-sm text-blue-600">建议每天保持 2000ml 左右饮水量。</p>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mt-6 mb-4">推荐菜谱</h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="w-full h-20 bg-green-100 rounded-lg mb-2 flex items-center justify-center text-3xl">🍲</div>
            <p class="font-medium text-gray-800 text-sm">清蒸鲈鱼</p>
            <p class="text-gray-500 text-xs">蛋白质丰富</p>
          </div>
          <div class="p-3 bg-gray-50 rounded-lg">
            <div class="w-full h-20 bg-orange-100 rounded-lg mb-2 flex items-center justify-center text-3xl">🥘</div>
            <p class="font-medium text-gray-800 text-sm">杂粮粥</p>
            <p class="text-gray-500 text-xs">膳食纤维</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">记录饮食</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 mb-2">餐别</label>
            <select v-model="newRecord.mealType" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500">
              <option value="早餐">早餐</option>
              <option value="午餐">午餐</option>
              <option value="晚餐">晚餐</option>
              <option value="加餐">加餐</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-600 mb-2">食物内容</label>
            <input v-model="newRecord.content" type="text" placeholder="请输入食物内容" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500">
          </div>
          <div>
            <label class="block text-gray-600 mb-2">热量 (千卡)</label>
            <input v-model="newRecord.calories" type="number" placeholder="请输入热量" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500">
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showModal = false" class="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">取消</button>
          <button @click="saveRecord" class="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const showModal = ref(false)
const newRecord = ref({
  mealType: '早餐',
  content: '',
  calories: ''
})

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const openRecordModal = () => {
  showModal.value = true
}

const saveRecord = () => {
  if (newRecord.value.content.trim()) {
    store.addDietRecord({
      mealType: newRecord.value.mealType,
      content: newRecord.value.content,
      calories: parseInt(newRecord.value.calories) || 0,
      timestamp: Date.now()
    })
    showModal.value = false
    newRecord.value = { mealType: '早餐', content: '', calories: '' }
    alert('饮食记录已保存')
  } else {
    alert('请输入食物内容')
  }
}

onMounted(() => {
  store.loadDietRecords()
})
</script>
