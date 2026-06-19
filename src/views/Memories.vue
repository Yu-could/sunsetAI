<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">📖 回忆录</h1>
      <p class="text-gray-500">语音记录人生故事，AI帮你整理</p>
    </header>
    <button @click="startRecording" class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl p-6 mb-6 flex items-center justify-center gap-3 hover:shadow-lg transition-shadow">
      <span class="text-3xl">{{ isRecording ? '⏹️' : '🎤' }}</span>
      <div class="text-left">
        <p class="font-bold text-lg">{{ isRecording ? '停止录制' : '开始录制' }}</p>
        <p class="text-sm text-orange-100">{{ isRecording ? '正在记录您的故事...' : '点击开始讲述您的回忆' }}</p>
      </div>
    </button>
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-gray-700">我的回忆</h2>
      <div v-for="memory in memories" :key="memory.id" class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        <div class="flex items-start justify-between mb-2">
          <span class="text-sm text-gray-400">{{ memory.date }}</span>
          <button class="text-gray-400 hover:text-red-500">🗑️</button>
        </div>
        <h3 class="font-bold text-gray-800 mb-2">{{ memory.title }}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">{{ memory.content }}</p>
        <div class="mt-3 flex gap-2">
          <button class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200">语音听</button>
          <button class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm hover:bg-orange-200">编辑</button>
        </div>
      </div>
      <div v-if="memories.length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
        <div class="text-5xl mb-4">📝</div>
        <p class="text-gray-500">还没有记录</p>
        <p class="text-gray-400 text-sm mt-2">点击上方按钮开始记录您的第一个回忆</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
const isRecording = ref(false)

const memories = computed(() => {
  return store.memoryRecords.map((record, index) => ({
    id: index,
    date: record.timestamp ? new Date(record.timestamp).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    title: record.title || '回忆记录',
    content: record.content || ''
  }))
})

const startRecording = () => {
  if (isRecording.value) {
    isRecording.value = false
    store.addMemoryRecord({
      title: '新回忆记录',
      content: 'AI已将您的语音转换为文字内容...',
      tags: '#新记录',
      duration: '2分钟'
    })
    alert('录音完成，回忆已保存')
  } else {
    isRecording.value = true
  }
}

onMounted(() => {
  store.loadMemoryRecords()
})
</script>
