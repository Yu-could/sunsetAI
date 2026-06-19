<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">回忆录</h2>
        <p class="text-gray-500 mt-1">记录人生故事，留住美好回忆</p>
      </div>
      <button @click="startRecording" class="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
        <span class="text-xl">🎤</span>
        <span>{{ isRecording ? '停止录音' : '语音录入' }}</span>
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        <div v-if="store.memoryRecords.length > 0">
          <div v-for="(memory, index) in store.memoryRecords" :key="index" class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">📖</div>
                <div>
                  <h3 class="font-semibold text-gray-800">{{ memory.title || '回忆记录' }}</h3>
                  <p class="text-sm text-gray-500">{{ formatTime(memory.timestamp) }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="playMemory(memory)" class="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">🔊</button>
                <button class="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">✏️</button>
                <button @click="deleteMemory(index)" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">{{ memory.content }}</p>
            <div class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <span v-if="memory.tags" class="text-sm text-gray-500">{{ memory.tags }}</span>
              <span v-if="memory.duration" class="text-sm text-gray-400">{{ memory.duration }}</span>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-xl shadow-md p-6 text-center">
          <div class="text-4xl mb-3">📖</div>
          <p class="text-gray-500">暂无回忆录记录</p>
          <p class="text-sm text-gray-400">点击上方按钮开始语音录入</p>
        </div>
      </div>
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">分类统计</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">生活趣事</span>
              <span class="font-medium text-gray-800">{{ store.memoryRecords.length }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-500 h-2 rounded-full" :style="{ width: Math.min(store.memoryRecords.length * 10, 100) + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">最近标签</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tag, index) in recentTags" :key="index" class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">{{ tag }}</span>
            <span v-if="recentTags.length === 0" class="text-gray-400 text-sm">暂无标签</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const isRecording = ref(false)

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const recentTags = computed(() => {
  const tags = new Set()
  store.memoryRecords.forEach(memory => {
    if (memory.tags) {
      memory.tags.split('#').filter(t => t.trim()).forEach(tag => tags.add('#' + tag))
    }
  })
  return Array.from(tags).slice(0, 5)
})

const startRecording = () => {
  isRecording.value = !isRecording.value
  if (!isRecording.value) {
    const newMemory = {
      title: '新回忆记录',
      content: '这是一段新的语音录入内容...',
      timestamp: Date.now(),
      tags: '#新记录',
      duration: '2分钟'
    }
    store.addMemoryRecord(newMemory)
    alert('录音完成，回忆已保存')
  }
}

const playMemory = (memory) => {
  alert('播放回忆：' + memory.title)
}

const deleteMemory = (index) => {
  if (confirm('确定要删除这条回忆吗？')) {
    store.deleteMemoryRecord(index)
  }
}

onMounted(() => {
  store.loadMemoryRecords()
})
</script>
