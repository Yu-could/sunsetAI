<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">饮食管理</h2>
        <p class="text-gray-500 mt-1">记录每日饮食，营养评估，菜谱推荐</p>
      </div>
      <div class="flex gap-3">
        <button @click="openRecordModal" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span class="text-xl">📝</span>
          <span>记录饮食</span>
        </button>
        <button @click="scrollToRecipes" class="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <span class="text-xl">👨‍🍳</span>
          <span>查看菜谱</span>
        </button>
      </div>
    </div>

    <!-- 营养统计卡片 -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日热量</p>
            <p class="text-3xl font-bold text-orange-500 mt-2">{{ todayCalories }}</p>
            <p class="text-gray-400 text-sm mt-1">目标: 2,000千卡</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🔥</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-orange-500 h-3 rounded-full transition-all" :style="{ width: Math.min(todayCalories / 2000 * 100, 100) + '%' }"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">蛋白质</p>
            <p class="text-3xl font-bold text-blue-500 mt-2">{{ todayProtein }}g</p>
            <p class="text-gray-400 text-sm mt-1">目标: 70g</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🥩</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-blue-500 h-3 rounded-full transition-all" :style="{ width: Math.min(todayProtein / 70 * 100, 100) + '%' }"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">碳水化合物</p>
            <p class="text-3xl font-bold text-green-500 mt-2">{{ todayCarbs }}g</p>
            <p class="text-gray-400 text-sm mt-1">目标: 300g</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🍚</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-green-500 h-3 rounded-full transition-all" :style="{ width: Math.min(todayCarbs / 300 * 100, 100) + '%' }"></div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">脂肪</p>
            <p class="text-3xl font-bold text-yellow-500 mt-2">{{ todayFat }}g</p>
            <p class="text-gray-400 text-sm mt-1">目标: 65g</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">🥑</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div class="bg-yellow-500 h-3 rounded-full transition-all" :style="{ width: Math.min(todayFat / 65 * 100, 100) + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 今日饮食记录 -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>📋</span> 今日饮食记录
        </h3>
        <div v-if="todayRecords.length > 0" class="space-y-3 max-h-96 overflow-y-auto">
          <div v-for="(record, index) in todayRecords" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">{{ getMealIcon(record.mealType) }}</div>
              <div>
                <p class="font-medium text-gray-800">{{ record.mealType }}</p>
                <p class="text-sm text-gray-500">{{ formatTime(record.timestamp) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-800">{{ record.content }}</p>
              <p class="text-sm text-orange-500">{{ record.calories || 0 }}千卡</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="text-4xl mb-3">🍜</div>
          <p>暂无饮食记录</p>
          <p class="text-sm">点击上方按钮记录饮食</p>
        </div>
      </div>

      <!-- 食品营养查询 -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span> 食品营养查询
        </h3>
        <div class="relative mb-4">
          <input v-model="foodSearchQuery" type="text" placeholder="搜索食品营养信息..." 
            class="w-full border border-gray-200 rounded-lg p-3 pr-10 focus:border-green-500">
          <button @click="searchFood" class="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
            🔍
          </button>
        </div>
        <div v-if="searchedFoods.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
          <div v-for="food in searchedFoods" :key="food.name" 
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            @click="selectFood(food)">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ food.icon }}</span>
              <div>
                <p class="font-medium text-gray-800">{{ food.name }}</p>
                <p class="text-xs text-gray-500">{{ food.category }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-orange-500">{{ food.calories }}卡/100g</p>
              <p class="text-xs text-gray-400">蛋白{{ food.protein }}g</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-400">
          <p class="text-sm">输入食品名称搜索营养信息</p>
        </div>
        <div class="mt-4 flex gap-2">
          <button v-for="cat in foodCategories" :key="cat" @click="filterByCategory(cat)"
            class="bg-gray-50 rounded-lg px-3 py-1 text-sm hover:bg-green-50 transition-colors">
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- 推荐菜谱 -->
      <div ref="recipeSection" class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>👨‍🍳</span> 推荐菜谱
          </h3>
          <button @click="refreshRecipes" class="text-green-500 text-sm hover:text-green-600 flex items-center gap-1">
            <span>🔄</span> 刷新
          </button>
        </div>
        <div class="space-y-3 max-h-80 overflow-y-auto">
          <div v-for="recipe in displayRecipes" :key="recipe.id" 
            class="border border-gray-100 rounded-lg p-3 hover:border-green-200 transition-colors cursor-pointer"
            @click="viewRecipe(recipe)">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center text-2xl">
                {{ recipe.icon }}
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ recipe.name }}</p>
                <p class="text-xs text-gray-500">{{ recipe.time }} | {{ recipe.difficulty }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-orange-500">{{ recipe.calories }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 营养建议 -->
    <div class="mt-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
        <span>💡</span> 今日营养建议
      </h3>
      <p class="text-green-100">{{ nutritionAdvice }}</p>
    </div>

    <!-- 记录饮食弹窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-gray-800 mb-4">记录饮食</h3>
        
        <!-- 语音输入按钮 -->
        <button @click="toggleVoiceInput" 
          :class="isVoiceInput ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-white'"
          class="w-full py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 transition-all">
          <span class="text-xl">{{ isVoiceInput ? '⏹️' : '🎤' }}</span>
          {{ isVoiceInput ? '停止语音输入' : '语音输入' }}
        </button>
        <p v-if="isVoiceInput" class="text-center text-green-500 text-sm mb-4 animate-pulse">
          请说出您吃的食物，如"一碗米饭"或"两个鸡蛋"
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 mb-2">餐别</label>
            <select v-model="newRecord.mealType" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500">
              <option value="早餐">早餐 🍳</option>
              <option value="午餐">午餐 🍲</option>
              <option value="晚餐">晚餐 🥗</option>
              <option value="加餐">加餐 🍰</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-600 mb-2">食物内容</label>
            <input v-model="newRecord.content" type="text" placeholder="请输入食物内容" 
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500">
          </div>
          
          <!-- 快速选择常见食物 -->
          <div>
            <p class="text-sm text-gray-500 mb-2">快速选择：</p>
            <div class="flex flex-wrap gap-2">
              <button v-for="food in commonFoods" :key="food.name" 
                @click="quickAddFood(food)"
                class="bg-gray-50 rounded-lg px-3 py-1 text-sm hover:bg-green-50 transition-colors">
                {{ food.name }}
              </button>
            </div>
          </div>
          
          <!-- 营养信息显示 -->
          <div v-if="selectedFoodInfo" class="bg-green-50 rounded-lg p-3">
            <p class="text-sm font-medium text-gray-800 mb-2">{{ selectedFoodInfo.name }} 营养信息</p>
            <div class="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <p class="font-bold text-orange-500">{{ selectedFoodInfo.calories }}卡</p>
                <p class="text-gray-500">热量</p>
              </div>
              <div>
                <p class="font-bold text-blue-500">{{ selectedFoodInfo.protein }}g</p>
                <p class="text-gray-500">蛋白</p>
              </div>
              <div>
                <p class="font-bold text-yellow-500">{{ selectedFoodInfo.fat }}g</p>
                <p class="text-gray-500">脂肪</p>
              </div>
              <div>
                <p class="font-bold text-green-500">{{ selectedFoodInfo.carbs }}g</p>
                <p class="text-gray-500">碳水</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button @click="showModal = false" class="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">取消</button>
          <button @click="saveRecord" class="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">保存</button>
        </div>
      </div>
    </div>

    <!-- 菜谱详情弹窗 -->
    <div v-if="showRecipeModal && currentRecipe" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <!-- 菜谱头部 -->
        <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white sticky top-0 z-10">
          <div class="flex items-center justify-between mb-4">
            <button @click="closeRecipeModal" class="text-white/80 hover:text-white">
              ✕ 关闭
            </button>
            <button @click="speakRecipe" class="text-white/80 hover:text-white flex items-center gap-1">
              <span>{{ isSpeaking ? '⏹️' : '🔊' }}</span> {{ isSpeaking ? '停止播报' : '语音播报' }}
            </button>
          </div>
          <div class="text-center">
            <div class="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-5xl">
              {{ currentRecipe.icon }}
            </div>
            <h2 class="text-2xl font-bold mb-2">{{ currentRecipe.name }}</h2>
            <p class="text-orange-200">{{ currentRecipe.description }}</p>
            <div class="flex justify-center gap-4 mt-4 text-sm">
              <span class="flex items-center gap-1">
                <span>⏱️</span> {{ currentRecipe.time }}
              </span>
              <span class="flex items-center gap-1">
                <span>🔥</span> {{ currentRecipe.calories }}
              </span>
              <span class="flex items-center gap-1">
                <span>📊</span> {{ currentRecipe.difficulty }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 菜谱内容 -->
        <div class="p-6">
          <!-- 食材准备 -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🥗</span> 食材准备
            </h3>
            <div class="bg-green-50 rounded-lg p-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div v-for="ingredient in currentRecipe.ingredients" :key="ingredient.name" 
                  class="flex items-center gap-2 bg-white rounded-lg p-2">
                  <span class="text-xl">{{ ingredient.icon }}</span>
                  <span class="text-sm text-gray-700">{{ ingredient.name }} {{ ingredient.amount }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 制作步骤 -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>📝</span> 制作步骤
            </h3>
            <div class="space-y-4">
              <div v-for="(step, index) in currentRecipe.steps" :key="index" 
                class="border border-gray-100 rounded-lg p-4">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-800 mb-2">{{ step.description }}</p>
                    <div v-if="step.image" class="bg-gray-50 rounded-lg p-3 text-center inline-block">
                      <span class="text-3xl">{{ step.image }}</span>
                    </div>
                    <div v-if="step.tip" class="mt-2 bg-yellow-50 rounded-lg p-2 text-sm text-yellow-700">
                      💡 {{ step.tip }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 制作视频 -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🎬</span> 制作视频
            </h3>
            <div class="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div class="text-center text-white">
                <div class="text-6xl mb-4">🎬</div>
                <p class="text-lg font-medium mb-2">{{ currentRecipe.name }} 制作教程</p>
                <button @click="playVideo" class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  ▶ 播放视频
                </button>
                <p class="text-xs text-gray-400 mt-2">视频时长：{{ currentRecipe.videoDuration || '5分钟' }}</p>
              </div>
            </div>
          </div>
          
          <!-- 营养价值 -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>📊</span> 营养价值
            </h3>
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p class="text-xl font-bold text-orange-500">{{ currentRecipe.nutrition?.calories }}卡</p>
                  <p class="text-xs text-gray-500">热量</p>
                </div>
                <div>
                  <p class="text-xl font-bold text-green-500">{{ currentRecipe.nutrition?.protein }}g</p>
                  <p class="text-xs text-gray-500">蛋白质</p>
                </div>
                <div>
                  <p class="text-xl font-bold text-yellow-500">{{ currentRecipe.nutrition?.fat }}g</p>
                  <p class="text-xs text-gray-500">脂肪</p>
                </div>
                <div>
                  <p class="text-xl font-bold text-blue-500">{{ currentRecipe.nutrition?.carbs }}g</p>
                  <p class="text-xs text-gray-500">碳水</p>
                </div>
              </div>
              <div class="mt-3 text-sm text-gray-600">
                <p>{{ currentRecipe.nutrition?.benefit }}</p>
              </div>
            </div>
          </div>
          
          <!-- 小贴士 -->
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <h4 class="font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>💡</span> 小贴士
            </h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li v-for="tip in currentRecipe.tips" :key="tip">• {{ tip }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { useToastStore } from '../../stores/toastStore'
import { voiceAssistant } from '../../utils/voiceAssistant'

const store = useAppStore()
const toast = useToastStore()

const showModal = ref(false)
const showRecipeModal = ref(false)
const isVoiceInput = ref(false)
const selectedFoodInfo = ref(null)
const currentRecipe = ref(null)
const recipeSeed = ref(0)
const recipeSection = ref(null)

const newRecord = ref({
  mealType: '早餐',
  content: '',
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0
})

// 食品搜索
const foodSearchQuery = ref('')
const searchedFoods = ref([])
const foodCategories = ['主食', '蔬菜', '肉类', '水果', '豆类', '奶类']

// 常见食物快速选择
const commonFoods = [
  { name: '米饭', calories: 116, protein: 2.6, fat: 0.3, carbs: 25.9 },
  { name: '面条', calories: 110, protein: 3.2, fat: 0.6, carbs: 24.8 },
  { name: '鸡蛋', calories: 144, protein: 13.3, fat: 8.8, carbs: 2.8 },
  { name: '牛奶', calories: 54, protein: 3.0, fat: 3.2, carbs: 3.4 },
  { name: '馒头', calories: 221, protein: 7.0, fat: 1.1, carbs: 45.8 },
  { name: '粥', calories: 46, protein: 1.1, fat: 0.3, carbs: 9.9 }
]

// 食品营养知识库
const nutritionDatabase = [
  { name: '米饭', category: '主食', icon: '🍚', calories: 116, protein: 2.6, fat: 0.3, carbs: 25.9 },
  { name: '面条', category: '主食', icon: '🍜', calories: 110, protein: 3.2, fat: 0.6, carbs: 24.8 },
  { name: '馒头', category: '主食', icon: '🥟', calories: 221, protein: 7.0, fat: 1.1, carbs: 45.8 },
  { name: '粥', category: '主食', icon: '🥣', calories: 46, protein: 1.1, fat: 0.3, carbs: 9.9 },
  { name: '面包', category: '主食', icon: '🍞', calories: 265, protein: 8.3, fat: 3.2, carbs: 50.0 },
  { name: '西红柿', category: '蔬菜', icon: '🍅', calories: 15, protein: 0.9, fat: 0.2, carbs: 3.3 },
  { name: '黄瓜', category: '蔬菜', icon: '🥒', calories: 15, protein: 0.8, fat: 0.2, carbs: 2.9 },
  { name: '白菜', category: '蔬菜', icon: '🥬', calories: 13, protein: 1.2, fat: 0.2, carbs: 2.4 },
  { name: '菠菜', category: '蔬菜', icon: '🥬', calories: 23, protein: 2.6, fat: 0.3, carbs: 3.6 },
  { name: '土豆', category: '蔬菜', icon: '🥔', calories: 77, protein: 2.0, fat: 0.1, carbs: 17.2 },
  { name: '胡萝卜', category: '蔬菜', icon: '🥕', calories: 25, protein: 1.0, fat: 0.2, carbs: 6.0 },
  { name: '西兰花', category: '蔬菜', icon: '🥦', calories: 34, protein: 2.8, fat: 0.4, carbs: 6.8 },
  { name: '猪肉', category: '肉类', icon: '🥩', calories: 143, protein: 20.3, fat: 6.2, carbs: 0 },
  { name: '牛肉', category: '肉类', icon: '🥩', calories: 125, protein: 20.0, fat: 4.0, carbs: 0 },
  { name: '鸡肉', category: '肉类', icon: '🍗', calories: 167, protein: 19.3, fat: 9.4, carbs: 0 },
  { name: '鱼', category: '海鲜', icon: '🐟', calories: 104, protein: 18.0, fat: 2.5, carbs: 0 },
  { name: '虾', category: '海鲜', icon: '🦐', calories: 87, protein: 18.6, fat: 0.8, carbs: 2.8 },
  { name: '鸡蛋', category: '蛋奶', icon: '🥚', calories: 144, protein: 13.3, fat: 8.8, carbs: 2.8 },
  { name: '牛奶', category: '蛋奶', icon: '🥛', calories: 54, protein: 3.0, fat: 3.2, carbs: 3.4 },
  { name: '豆腐', category: '豆类', icon: '🧈', calories: 81, protein: 8.1, fat: 3.7, carbs: 4.2 },
  { name: '苹果', category: '水果', icon: '🍎', calories: 52, protein: 0.3, fat: 0.2, carbs: 13.8 },
  { name: '香蕉', category: '水果', icon: '🍌', calories: 89, protein: 1.1, fat: 0.3, carbs: 22.8 },
  { name: '橙子', category: '水果', icon: '🍊', calories: 47, protein: 0.9, fat: 0.1, carbs: 11.8 }
]

// 菜谱知识库
const recipeDatabase = [
  {
    id: 1,
    name: '西红柿鸡蛋汤',
    icon: '🍅',
    description: '经典家常汤品，酸甜可口，营养丰富',
    time: '15分钟',
    calories: '120卡',
    difficulty: '简单',
    ingredients: [
      { name: '西红柿', amount: '2个', icon: '🍅' },
      { name: '鸡蛋', amount: '2个', icon: '🥚' },
      { name: '葱花', amount: '适量', icon: '🌿' },
      { name: '盐', amount: '少许', icon: '🧂' }
    ],
    steps: [
      { description: '西红柿洗净切块，鸡蛋打散备用', image: '🍅🥚', tip: '西红柿切块不要太小' },
      { description: '锅中加水烧开，放入西红柿煮3分钟', image: '🔥', tip: '水开后转小火' },
      { description: '慢慢倒入蛋液，形成蛋花', image: '🥣', tip: '边倒边搅拌，蛋花更漂亮' },
      { description: '加入盐调味，撒上葱花即可', image: '🌿', tip: '可以加一点香油提香' }
    ],
    nutrition: { calories: 120, protein: 8, fat: 6, carbs: 8, benefit: '富含维生素C和蛋白质，适合老年人食用' },
    tips: ['西红柿先去皮口感更好', '蛋液要慢慢倒入', '可以加一点糖调味'],
    videoDuration: '5分钟'
  },
  {
    id: 2,
    name: '清蒸鲈鱼',
    icon: '🐟',
    description: '清淡鲜美，保留鱼肉原味，营养不流失',
    time: '20分钟',
    calories: '150卡',
    difficulty: '中等',
    ingredients: [
      { name: '鲈鱼', amount: '1条', icon: '🐟' },
      { name: '姜丝', amount: '适量', icon: '🌿' },
      { name: '葱丝', amount: '适量', icon: '🌿' },
      { name: '蒸鱼豉油', amount: '2勺', icon: '🫗' }
    ],
    steps: [
      { description: '鲈鱼洗净，在鱼身上划几刀', image: '🐟', tip: '划刀便于入味' },
      { description: '鱼身铺上姜丝，放入蒸锅', image: '🔥', tip: '水开后再放鱼' },
      { description: '大火蒸8-10分钟', image: '⏱️', tip: '时间不宜过长' },
      { description: '取出撒上葱丝，淋上蒸鱼豉油', image: '🥢', tip: '可以淋一点热油' }
    ],
    nutrition: { calories: 150, protein: 18, fat: 5, carbs: 2, benefit: '富含优质蛋白和DHA，有益心脑血管健康' },
    tips: ['鱼要新鲜', '蒸的时间要控制好', '姜丝可以去腥'],
    videoDuration: '8分钟'
  },
  {
    id: 3,
    name: '蒜蓉西兰花',
    icon: '🥦',
    description: '清脆爽口，营养丰富，抗氧化佳品',
    time: '10分钟',
    calories: '80卡',
    difficulty: '简单',
    ingredients: [
      { name: '西兰花', amount: '1颗', icon: '🥦' },
      { name: '蒜末', amount: '适量', icon: '🧄' },
      { name: '盐', amount: '少许', icon: '🧂' },
      { name: '油', amount: '适量', icon: '🫗' }
    ],
    steps: [
      { description: '西兰花洗净切小朵', image: '🥦', tip: '大小要均匀' },
      { description: '锅中烧水，西兰花焯水2分钟', image: '🔥', tip: '焯水保持翠绿' },
      { description: '热锅下油，爆香蒜末', image: '🧄', tip: '蒜末不要炒焦' },
      { description: '放入西兰花翻炒，加盐调味', image: '🥢', tip: '快速翻炒即可' }
    ],
    nutrition: { calories: 80, protein: 4, fat: 3, carbs: 6, benefit: '富含维生素C和抗氧化物质，增强免疫力' },
    tips: ['焯水时间不宜过长', '蒜末要新鲜', '可以加一点蚝油'],
    videoDuration: '5分钟'
  },
  {
    id: 4,
    name: '香菇鸡汤',
    icon: '🍄',
    description: '滋补汤品，清香鲜美，增强体质',
    time: '45分钟',
    calories: '180卡',
    difficulty: '简单',
    ingredients: [
      { name: '鸡肉', amount: '500g', icon: '🍗' },
      { name: '香菇', amount: '8朵', icon: '🍄' },
      { name: '姜片', amount: '3片', icon: '🌿' },
      { name: '枸杞', amount: '适量', icon: '🔴' }
    ],
    steps: [
      { description: '鸡肉洗净切块，焯水去腥', image: '🍗', tip: '冷水下锅' },
      { description: '香菇洗净泡发', image: '🍄', tip: '温水泡发更快' },
      { description: '锅中加水，放入鸡肉和姜片', image: '🔥', tip: '水要一次加够' },
      { description: '大火烧开转小火炖30分钟', image: '⏱️', tip: '小火慢炖' },
      { description: '加入香菇和枸杞，再炖10分钟', image: '🥣', tip: '最后加盐调味' }
    ],
    nutrition: { calories: 180, protein: 20, fat: 8, carbs: 5, benefit: '富含蛋白质和多种氨基酸，滋补养生' },
    tips: ['鸡肉要新鲜', '香菇要泡发好', '炖的时间要够'],
    videoDuration: '8分钟'
  },
  {
    id: 5,
    name: '蒸蛋羹',
    icon: '🥚',
    description: '软嫩滑润，入口即化，老少皆宜',
    time: '15分钟',
    calories: '100卡',
    difficulty: '简单',
    ingredients: [
      { name: '鸡蛋', amount: '2个', icon: '🥚' },
      { name: '温水', amount: '适量', icon: '🫗' },
      { name: '盐', amount: '少许', icon: '🧂' },
      { name: '葱花', amount: '适量', icon: '🌿' }
    ],
    steps: [
      { description: '鸡蛋打散，加温水搅匀', image: '🥚', tip: '水和蛋比例1:1' },
      { description: '加盐调味，过滤蛋液', image: '🥣', tip: '过滤更细腻' },
      { description: '盖上保鲜膜，蒸锅蒸10分钟', image: '🔥', tip: '保鲜膜要扎孔' },
      { description: '出锅撒上葱花即可', image: '🌿', tip: '可以淋一点酱油' }
    ],
    nutrition: { calories: 100, protein: 8, fat: 6, carbs: 2, benefit: '富含蛋白质，软嫩易消化，适合老年人' },
    tips: ['温水更好', '要过滤蛋液', '蒸的时间要控制'],
    videoDuration: '5分钟'
  },
  {
    id: 6,
    name: '宫保鸡丁',
    icon: '🍗',
    category: 'meat',
    tags: ['经典川菜', '下饭神器', '香辣可口'],
    description: '川菜经典，鸡肉嫩滑，花生酥脆，香辣可口',
    time: '30分钟',
    calories: '280卡',
    difficulty: '中等',
    ingredients: [
      { name: '鸡胸肉', amount: '300g', icon: '🍗' },
      { name: '花生米', amount: '50g', icon: '🥜' },
      { name: '干辣椒', amount: '适量', icon: '🌶️' },
      { name: '葱姜蒜', amount: '适量', icon: '🧄' },
      { name: '生抽', amount: '2勺', icon: '🫗' },
      { name: '白糖', amount: '1勺', icon: '🍬' }
    ],
    steps: [
      { description: '鸡肉切丁，用盐、料酒、淀粉腌制10分钟', image: '🍗', tip: '腌制更入味' },
      { description: '花生米炸至金黄，干辣椒切段', image: '🥜🌶️', tip: '花生不要炸焦' },
      { description: '锅中放油，鸡丁滑炒至变色盛出', image: '🔥', tip: '大火快炒' },
      { description: '锅中留油，爆香葱姜蒜和干辣椒', image: '🧄', tip: '不要炒糊' },
      { description: '放入鸡丁和花生，加调料翻炒均匀', image: '🥢', tip: '快速翻炒' }
    ],
    nutrition: { calories: 280, protein: 20, fat: 15, carbs: 10, benefit: '蛋白质丰富，下饭可口' },
    tips: ['鸡肉要腌够时间', '花生最后放保持酥脆', '干辣椒不要炒糊'],
    videoDuration: '8分钟'
  },
  {
    id: 7,
    name: '麻婆豆腐',
    icon: '🧈',
    category: 'vegetable',
    tags: ['经典川菜', '麻辣鲜香', '下饭神器'],
    description: '川菜经典，麻辣鲜香，豆腐嫩滑，下饭首选',
    time: '20分钟',
    calories: '180卡',
    difficulty: '中等',
    ingredients: [
      { name: '嫩豆腐', amount: '300g', icon: '🧈' },
      { name: '肉末', amount: '100g', icon: '🥩' },
      { name: '豆瓣酱', amount: '2勺', icon: '🫘' },
      { name: '花椒粉', amount: '适量', icon: '🫘' },
      { name: '葱姜蒜', amount: '适量', icon: '🧄' }
    ],
    steps: [
      { description: '豆腐切块，焯水备用', image: '🧈', tip: '焯水去豆腥味' },
      { description: '锅中放油，炒香肉末至变色', image: '🥩', tip: '炒至金黄' },
      { description: '加入豆瓣酱炒出红油', image: '🫘', tip: '小火慢炒' },
      { description: '加入豆腐，轻轻翻炒', image: '🔥', tip: '不要炒碎豆腐' },
      { description: '撒上花椒粉和葱花，出锅', image: '🌿', tip: '花椒粉提香' }
    ],
    nutrition: { calories: 180, protein: 12, fat: 10, carbs: 8, benefit: '豆腐富含蛋白质，麻辣开胃' },
    tips: ['豆腐要嫩豆腐', '豆瓣酱要炒出红油', '翻炒要轻'],
    videoDuration: '6分钟'
  },
  {
    id: 8,
    name: '糖醋里脊',
    icon: '🍖',
    category: 'meat',
    tags: ['酸甜可口', '外酥里嫩', '经典名菜'],
    description: '酸甜适中，外酥里嫩，老少皆宜',
    time: '35分钟',
    calories: '350卡',
    difficulty: '中等',
    ingredients: [
      { name: '猪里脊', amount: '300g', icon: '🥩' },
      { name: '面粉', amount: '适量', icon: '🍞' },
      { name: '淀粉', amount: '适量', icon: '🍘' },
      { name: '醋', amount: '3勺', icon: '🫗' },
      { name: '白糖', amount: '3勺', icon: '🍬' },
      { name: '番茄酱', amount: '2勺', icon: '🍅' }
    ],
    steps: [
      { description: '里脊肉切条，用盐、料酒腌制10分钟', image: '🥩', tip: '切均匀大小' },
      { description: '裹上面粉和淀粉，油炸至金黄', image: '🔥', tip: '油温六成热' },
      { description: '调糖醋汁：醋、糖、番茄酱混合', image: '🍅', tip: '酸甜比例调好' },
      { description: '锅中放糖醋汁，小火熬至粘稠', image: '🥣', tip: '熬到起大泡' },
      { description: '放入里脊翻炒，裹匀酱汁', image: '🥢', tip: '快速翻炒' }
    ],
    nutrition: { calories: 350, protein: 18, fat: 18, carbs: 15, benefit: '酸甜开胃，口感酥脆' },
    tips: ['肉条要切均匀', '炸两遍更酥脆', '糖醋比例要调好'],
    videoDuration: '10分钟'
  },
  {
    id: 9,
    name: '酸菜鱼',
    icon: '🐟',
    category: 'seafood',
    tags: ['川菜经典', '酸辣开胃', '鱼肉鲜嫩'],
    description: '川菜经典，鱼肉鲜嫩，酸辣开胃',
    time: '45分钟',
    calories: '220卡',
    difficulty: '中等',
    ingredients: [
      { name: '草鱼', amount: '1条', icon: '🐟' },
      { name: '酸菜', amount: '200g', icon: '🥬' },
      { name: '干辣椒', amount: '适量', icon: '🌶️' },
      { name: '花椒', amount: '适量', icon: '🫘' },
      { name: '葱姜蒜', amount: '适量', icon: '🧄' }
    ],
    steps: [
      { description: '鱼肉切片，用盐、料酒、淀粉腌制', image: '🐟', tip: '腌制更入味' },
      { description: '酸菜切碎，炒香备用', image: '🥬', tip: '炒出酸味' },
      { description: '锅中加水，放入酸菜和鱼骨熬汤', image: '🔥', tip: '熬至汤色变白' },
      { description: '放入鱼片，煮至变色', image: '🐟', tip: '鱼片不要煮老' },
      { description: '撒上干辣椒和花椒，淋热油', image: '🌶️', tip: '热油激香' }
    ],
    nutrition: { calories: 220, protein: 20, fat: 10, carbs: 8, benefit: '鱼肉富含优质蛋白，酸辣开胃' },
    tips: ['鱼片要薄', '酸菜要炒香', '最后淋热油激香'],
    videoDuration: '10分钟'
  },
  {
    id: 10,
    name: '可乐鸡翅',
    icon: '🍗',
    category: 'meat',
    tags: ['简单易做', '酸甜可口', '小朋友最爱'],
    description: '简单易做，酸甜可口，小朋友最爱',
    time: '30分钟',
    calories: '250卡',
    difficulty: '简单',
    ingredients: [
      { name: '鸡翅', amount: '500g', icon: '🍗' },
      { name: '可乐', amount: '300ml', icon: '🥤' },
      { name: '生抽', amount: '2勺', icon: '🫗' },
      { name: '姜片', amount: '适量', icon: '🌿' }
    ],
    steps: [
      { description: '鸡翅焯水去腥', image: '🍗', tip: '冷水下锅' },
      { description: '锅中放油，煎鸡翅至两面金黄', image: '🔥', tip: '煎至金黄' },
      { description: '加入可乐和生抽', image: '🥤', tip: '可乐要没过鸡翅' },
      { description: '小火炖20分钟', image: '⏱️', tip: '小火慢炖' },
      { description: '大火收汁即可', image: '🥢', tip: '汁要浓稠' }
    ],
    nutrition: { calories: 250, protein: 18, fat: 12, carbs: 10, benefit: '酸甜可口，小朋友喜欢' },
    tips: ['鸡翅要煎金黄', '可乐要没过鸡翅', '收汁要浓稠'],
    videoDuration: '6分钟'
  },
  {
    id: 11,
    name: '蒜蓉大虾',
    icon: '🦐',
    category: 'seafood',
    tags: ['鲜美可口', '简单易做', '高蛋白'],
    description: '蒜香浓郁，虾肉鲜嫩，简单易做',
    time: '20分钟',
    calories: '150卡',
    difficulty: '简单',
    ingredients: [
      { name: '大虾', amount: '500g', icon: '🦐' },
      { name: '蒜末', amount: '大量', icon: '🧄' },
      { name: '生抽', amount: '2勺', icon: '🫗' },
      { name: '蚝油', amount: '1勺', icon: '🫗' },
      { name: '葱花', amount: '适量', icon: '🌿' }
    ],
    steps: [
      { description: '大虾剪去虾须，开背去虾线', image: '🦐', tip: '开背更入味' },
      { description: '锅中放油，爆香蒜末', image: '🧄', tip: '蒜末要多' },
      { description: '放入大虾翻炒至变红', image: '🔥', tip: '两面都要变红' },
      { description: '加入生抽和蚝油调味', image: '🫗', tip: '快速翻炒' },
      { description: '撒上葱花即可出锅', image: '🌿', tip: '可以加一点糖' }
    ],
    nutrition: { calories: 150, protein: 20, fat: 5, carbs: 3, benefit: '高蛋白低脂肪，鲜美可口' },
    tips: ['虾要新鲜', '蒜末要多', '大火快炒'],
    videoDuration: '6分钟'
  },
  {
    id: 12,
    name: '芒果西米露',
    icon: '🥭',
    category: 'dessert',
    tags: ['夏日甜品', '清凉解暑', '简单易做'],
    description: '清凉解暑，香甜可口，夏日必备',
    time: '20分钟',
    calories: '150卡',
    difficulty: '简单',
    ingredients: [
      { name: '西米', amount: '100g', icon: '🍚' },
      { name: '芒果', amount: '2个', icon: '🥭' },
      { name: '牛奶', amount: '200ml', icon: '🥛' },
      { name: '椰浆', amount: '50ml', icon: '🥥' },
      { name: '冰糖', amount: '适量', icon: '🍬' }
    ],
    steps: [
      { description: '西米煮至透明，过凉水', image: '🍚', tip: '煮到中间有小白点时关火焖' },
      { description: '芒果切块', image: '🥭', tip: '一部分打泥一部分切块' },
      { description: '锅中放牛奶和椰浆，加冰糖煮开', image: '🥛', tip: '冰糖要化开' },
      { description: '加入西米和芒果泥', image: '🍚', tip: '搅拌均匀' },
      { description: '冷藏后食用，放上芒果块', image: '❄️', tip: '冷藏更美味' }
    ],
    nutrition: { calories: 150, protein: 3, fat: 4, carbs: 25, benefit: '清凉解暑，香甜可口' },
    tips: ['西米要煮到透明', '冷藏更美味', '芒果要熟的'],
    videoDuration: '5分钟'
  },
  {
    id: 13,
    name: '焦糖布丁',
    icon: '🍮',
    category: 'dessert',
    tags: ['法式甜品', '香浓可口', '精致'],
    description: '法式经典，焦糖香浓，布丁嫩滑',
    time: '30分钟',
    calories: '200卡',
    difficulty: '中等',
    ingredients: [
      { name: '鸡蛋', amount: '3个', icon: '🥚' },
      { name: '牛奶', amount: '250ml', icon: '🥛' },
      { name: '白糖', amount: '60g', icon: '🍬' },
      { name: '香草精', amount: '少许', icon: '🌿' }
    ],
    steps: [
      { description: '白糖加水熬成焦糖，倒入模具', image: '🍬', tip: '熬到琥珀色' },
      { description: '鸡蛋打散，加牛奶和白糖搅匀', image: '🥚', tip: '要过筛' },
      { description: '加入香草精，过筛后倒入模具', image: '🌿', tip: '过筛更细腻' },
      { description: '蒸锅蒸15分钟', image: '⏱️', tip: '水开后再蒸' },
      { description: '冷藏后倒扣脱模', image: '❄️', tip: '冷藏更美味' }
    ],
    nutrition: { calories: 200, protein: 8, fat: 8, carbs: 18, benefit: '香浓可口，精致甜品' },
    tips: ['焦糖不要熬糊', '蛋液要过筛', '蒸的时间要控制'],
    videoDuration: '8分钟'
  },
  {
    id: 14,
    name: '葱油拌面',
    icon: '🍜',
    category: 'easy',
    tags: ['简单快手', '香浓可口', '早餐'],
    description: '简单快手，葱油香浓，面条劲道',
    time: '10分钟',
    calories: '200卡',
    difficulty: '简单',
    ingredients: [
      { name: '面条', amount: '200g', icon: '🍜' },
      { name: '葱', amount: '适量', icon: '🌿' },
      { name: '生抽', amount: '2勺', icon: '🫗' },
      { name: '老抽', amount: '1勺', icon: '🫗' },
      { name: '白糖', amount: '1勺', icon: '🍬' }
    ],
    steps: [
      { description: '面条煮熟，过凉水', image: '🍜', tip: '过凉更劲道' },
      { description: '葱切段，锅中放油炸葱油', image: '🌿', tip: '炸到葱金黄' },
      { description: '倒入生抽、老抽、白糖', image: '🫗', tip: '搅拌均匀' },
      { description: '倒入面条，拌匀即可', image: '🥢', tip: '快速拌匀' }
    ],
    nutrition: { calories: 200, protein: 6, fat: 5, carbs: 30, benefit: '简单快手，香浓可口' },
    tips: ['面条要过凉', '葱油要炸香', '调料要拌匀'],
    videoDuration: '4分钟'
  },
  {
    id: 15,
    name: '番茄牛腩',
    icon: '🥩',
    category: 'meat',
    tags: ['经典美味', '软烂入味', '下饭'],
    description: '经典美味，牛腩软烂，番茄入味',
    time: '90分钟',
    calories: '300卡',
    difficulty: '中等',
    ingredients: [
      { name: '牛腩', amount: '500g', icon: '🥩' },
      { name: '西红柿', amount: '3个', icon: '🍅' },
      { name: '胡萝卜', amount: '1根', icon: '🥕' },
      { name: '土豆', amount: '1个', icon: '🥔' },
      { name: '姜片', amount: '适量', icon: '🌿' }
    ],
    steps: [
      { description: '牛腩切块，焯水去腥', image: '🥩', tip: '冷水下锅' },
      { description: '西红柿切块', image: '🍅', tip: '可以去皮' },
      { description: '锅中放油，炒西红柿出汁', image: '🍅', tip: '炒到软烂' },
      { description: '加入牛腩和水，小火炖60分钟', image: '⏱️', tip: '小火慢炖' },
      { description: '加入胡萝卜和土豆，再炖20分钟', image: '🥕🥔', tip: '炖至软烂' }
    ],
    nutrition: { calories: 300, protein: 20, fat: 15, carbs: 15, benefit: '蛋白质丰富，软烂入味' },
    tips: ['牛腩要炖够时间', '西红柿要炒出汁', '土豆要后放'],
    videoDuration: '12分钟'
  }
]

const displayRecipes = computed(() => {
  let recipes = [...recipeDatabase]
  recipes.sort((a, b) => {
    const seed = recipeSeed.value || 1
    const hashA = (a.id * seed) % 100
    const hashB = (b.id * seed) % 100
    return hashA - hashB
  })
  return recipes.slice(0, 5)
})

const todayRecords = computed(() => {
  const todayStr = new Date().toDateString()
  return store.dietRecords.filter(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  })
})

const todayCalories = computed(() => todayRecords.value.reduce((sum, r) => sum + (r.calories || 0), 0))
const todayProtein = computed(() => todayRecords.value.reduce((sum, r) => sum + (r.protein || 0), 0))
const todayFat = computed(() => todayRecords.value.reduce((sum, r) => sum + (r.fat || 0), 0))
const todayCarbs = computed(() => todayRecords.value.reduce((sum, r) => sum + (r.carbs || 0), 0))

const nutritionAdvice = computed(() => {
  const calories = todayCalories.value
  if (calories === 0) return '记录饮食后查看营养建议'
  if (calories < 1000) return '今日摄入较少，建议适当增加营养'
  if (calories < 1500) return '今日摄入适中，继续保持'
  if (calories < 2000) return '今日摄入充足，注意均衡'
  return '今日摄入较多，建议适当控制'
})

const getMealIcon = (mealType) => {
  const icons = { '早餐': '🍳', '午餐': '🍲', '晚餐': '🥗', '加餐': '🍰' }
  return icons[mealType] || '🍜'
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const openRecordModal = () => {
  newRecord.value = { mealType: '早餐', content: '', calories: 0, protein: 0, fat: 0, carbs: 0 }
  selectedFoodInfo.value = null
  showModal.value = true
}

const toggleVoiceInput = () => {
  if (isVoiceInput.value) {
    isVoiceInput.value = false
    voiceAssistant.stopListening()
    toast.success('语音输入已停止', 1500)
  } else {
    if (!voiceAssistant.isSupported()) {
      toast.warning('您的浏览器不支持语音识别', 2000)
      return
    }
    isVoiceInput.value = true
    toast.info('开始语音输入，请说出您吃的食物...', 2000)
    voiceAssistant.startListening()
  }
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      parseFoodData(data)
      break
    case 'error':
      isVoiceInput.value = false
      toast.warning('语音识别出错', 2000)
      break
    case 'end':
      if (isVoiceInput.value) {
        isVoiceInput.value = false
        toast.success('语音输入已完成', 1500)
      }
      break
  }
}

const parseFoodData = (text) => {
  if (!text) return
  for (const food of nutritionDatabase) {
    if (text.includes(food.name)) {
      newRecord.value.content = food.name
      selectedFoodInfo.value = food
      toast.success(`识别到：${food.name}`, 2000)
      return
    }
  }
  newRecord.value.content = text
  toast.success(`识别到：${text}`, 2000)
}

const quickAddFood = (food) => {
  newRecord.value.content = food.name
  selectedFoodInfo.value = food
}

const selectFood = (food) => {
  newRecord.value.content = food.name
  selectedFoodInfo.value = food
  showModal.value = true
}

const saveRecord = () => {
  if (newRecord.value.content.trim()) {
    const foodInfo = selectedFoodInfo.value || nutritionDatabase.find(f => f.name === newRecord.value.content)
    store.addDietRecord({
      mealType: newRecord.value.mealType,
      content: newRecord.value.content,
      calories: foodInfo?.calories || newRecord.value.calories || 0,
      protein: foodInfo?.protein || 0,
      fat: foodInfo?.fat || 0,
      carbs: foodInfo?.carbs || 0,
      timestamp: new Date().toISOString()
    })
    showModal.value = false
    toast.success('饮食记录已保存', 1500)
  }
}

const searchFood = () => {
  if (!foodSearchQuery.value.trim()) {
    searchedFoods.value = []
    return
  }
  searchedFoods.value = nutritionDatabase.filter(f => 
    f.name.includes(foodSearchQuery.value) || f.category.includes(foodSearchQuery.value)
  )
}

const filterByCategory = (cat) => {
  foodSearchQuery.value = cat
  searchFood()
}

const refreshRecipes = () => {
  recipeSeed.value = Math.floor(Math.random() * 1000) + 1
  toast.success('菜谱已刷新', 1500)
}

const scrollToRecipes = () => {
  recipeSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const viewRecipe = (recipe) => {
  currentRecipe.value = recipe
  showRecipeModal.value = true
}

const closeRecipeModal = () => {
  if (isSpeaking.value) {
    voiceAssistant.stopSpeaking()
    isSpeaking.value = false
  }
  showRecipeModal.value = false
}

const isSpeaking = ref(false)

const speakRecipe = () => {
  if (!currentRecipe.value) return
  
  if (isSpeaking.value) {
    voiceAssistant.stopSpeaking()
    isSpeaking.value = false
    toast.info('已停止播报', 1000)
  } else {
    const text = `${currentRecipe.value.name}，${currentRecipe.value.description}。制作时间${currentRecipe.value.time}。`
    voiceAssistant.speak(text)
    isSpeaking.value = true
    toast.success('正在播报菜谱信息...', 1500)
  }
}

const playVideo = () => {
  toast.info(`正在播放${currentRecipe.value?.name}制作教程视频...`, 2000)
}

onMounted(() => {
  store.loadDietRecords()
  voiceAssistant.addCallback(handleVoiceEvent)
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleVoiceEvent)
  voiceAssistant.stopListening()
  voiceAssistant.stopSpeaking()
})
</script>