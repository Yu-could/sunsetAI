<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">🍜 饮食管理</h1>
      <p class="text-gray-500">记录三餐，营养评估</p>
    </header>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-700">今日饮食</h2>
        <span class="text-sm text-gray-400">{{ today }}</span>
      </div>
      <div class="space-y-4">
        <div v-for="(meal, key) in mealTypes" :key="key" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">{{ meal.icon }}</span>
            <span class="font-bold text-gray-700">{{ meal.name }}</span>
            <button @click="showAddMeal(key)" class="ml-auto text-orange-500 text-sm hover:text-orange-600">+ 添加</button>
          </div>
          <div v-if="getMealItems(key).length > 0" class="flex flex-wrap gap-2">
            <span v-for="(item, index) in getMealItems(key)" :key="index" class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{{ item.content }}</span>
          </div>
          <div v-else class="text-gray-400 text-sm">还没有记录</div>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-3">今日营养统计</h3>
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl font-bold">{{ todayCalories }}</p>
          <p class="text-sm text-green-100">热量</p>
        </div>
        <div>
          <p class="text-2xl font-bold">-</p>
          <p class="text-sm text-green-100">蛋白质</p>
        </div>
        <div>
          <p class="text-2xl font-bold">-</p>
          <p class="text-sm text-green-100">脂肪</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-green-100 text-center">{{ todayRecords.length > 0 ? '继续保持！' : '记录饮食后查看营养统计' }}</p>
    </div>
    <div>
      <h2 class="text-lg font-bold text-gray-700 mb-3">推荐菜谱</h2>
      <div class="space-y-3">
        <div v-for="recipe in recipes" :key="recipe.name" class="bg-white rounded-xl shadow-md p-4 flex items-center gap-4">
          <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">{{ recipe.icon }}</div>
          <div class="flex-1">
            <h4 class="font-bold text-gray-800">{{ recipe.name }}</h4>
            <p class="text-sm text-gray-500">制作时间: {{ recipe.time }} | 营养: {{ recipe.nutrition }}</p>
          </div>
          <button class="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600">查看</button>
        </div>
      </div>
    </div>
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">添加食物</h3>
        <input v-model="newFood" type="text" placeholder="请输入食物名称" class="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:border-orange-500">
        <div class="flex gap-3">
          <button @click="showAddModal = false" class="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="addFood" class="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()

const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
const showAddModal = ref(false)
const currentMealType = ref('breakfast')
const newFood = ref('')

const recipes = [
  { name: '西红柿营养汤', icon: '🍜', time: '20分钟', nutrition: '营养均衡' },
  { name: '鸡肉蘑菇蒸片', icon: '🍗', time: '30分钟', nutrition: '蛋白质丰富' },
  { name: '青菜炒香菇', icon: '🥬', time: '15分钟', nutrition: '维生素丰富' }
]

const mealTypes = {
  breakfast: { type: 'breakfast', name: '早餐', icon: '🍳' },
  lunch: { type: 'lunch', name: '午餐', icon: '🍲' },
  dinner: { type: 'dinner', name: '晚餐', icon: '🥗' }
}

const todayRecords = computed(() => {
  const todayStr = new Date().toDateString()
  return store.dietRecords.filter(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  })
})

const getMealItems = (mealType) => {
  return todayRecords.value.filter(r => r.mealType === mealTypes[mealType].name)
}

const todayCalories = computed(() => {
  return todayRecords.value.reduce((sum, r) => sum + (r.calories || 0), 0)
})

const showAddMeal = (type) => { 
  currentMealType.value = type 
  showAddModal.value = true 
}

const addFood = () => {
  if (newFood.value.trim()) {
    store.addDietRecord({
      mealType: mealTypes[currentMealType.value].name,
      content: newFood.value.trim(),
      calories: 0,
      timestamp: new Date().toISOString()
    })
    newFood.value = ''
    showAddModal.value = false
  }
}

onMounted(() => {
  store.loadDietRecords()
})
</script>
