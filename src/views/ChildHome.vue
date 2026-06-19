<template>
  <div class="px-4 py-4 max-w-md mx-auto">
    <header class="text-center mb-4">
      <h1 class="text-2xl font-bold text-primary flex items-center justify-center gap-2">
        <UsersIcon class="w-6 h-6" />
        子女端
      </h1>
      <p class="text-gray-500 text-sm mt-1">SunsetAI</p>
    </header>

    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white mb-4 text-center">
      <div class="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
        <UsersIcon class="w-7 h-7" />
      </div>
      <h2 class="text-lg font-bold">尚未连接父母</h2>
      <p class="text-blue-100 text-xs mt-1">请先添加父母连接</p>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-sm p-3 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
        <div class="w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <HeartIcon class="w-6 h-6 text-red-500" />
        </div>
        <h3 class="text-base font-bold text-gray-800">健康状态</h3>
        <p class="text-xs text-gray-500">查看父母健康</p>
      </div>
      <div @click="goToPage('/child/messages')" class="bg-white rounded-xl shadow-sm p-3 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
        <div class="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <ChatBubbleLeftIcon class="w-6 h-6 text-green-500" />
        </div>
        <h3 class="text-base font-bold text-gray-800">消息通知</h3>
        <p class="text-xs text-gray-500">暂无消息</p>
      </div>
      <div @click="goToPage('/child/connect')" class="bg-white rounded-xl shadow-sm p-3 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
        <div class="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <LinkIcon class="w-6 h-6 text-blue-500" />
        </div>
        <h3 class="text-base font-bold text-gray-800">连接管理</h3>
        <p class="text-xs text-gray-500">管理家人连接</p>
      </div>
      <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-sm p-3 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
        <div class="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <ChartBarIcon class="w-6 h-6 text-purple-500" />
        </div>
        <h3 class="text-base font-bold text-gray-800">数据统计</h3>
        <p class="text-xs text-gray-500">查看周报月报</p>
      </div>
    </div>

    <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
      <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
        <ClipboardDocumentIcon class="w-6 h-6 text-indigo-500" />
      </div>
      <h3 class="text-base font-bold text-gray-700">今日摘要</h3>
      <p class="text-xs text-gray-400 mt-1">连接父母后可查看今日数据</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { UsersIcon, HeartIcon, ChatBubbleLeftIcon, LinkIcon, ChartBarIcon, ClipboardDocumentIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const goToPage = (route) => {
  router.push(route)
}
</script>