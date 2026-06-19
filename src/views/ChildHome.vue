<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
        <UsersIcon class="w-8 h-8" />
        子女端
      </h1>
      <p class="text-gray-500 text-lg">SunsetAI</p>
      <p class="text-gray-600 mt-2">随时关注父母健康</p>
    </header>
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white mb-6 text-center">
      <div class="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
        <UsersIcon class="w-10 h-10" />
      </div>
      <h2 class="text-xl font-bold">尚未连接父母</h2>
      <p class="text-blue-100 mt-2">请先添加父母连接</p>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95">
        <div class="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
          <HeartIcon class="w-7 h-7 text-red-500" />
        </div>
        <h3 class="font-bold text-gray-800">健康状态</h3>
        <p class="text-sm text-gray-500">查看父母健康</p>
      </div>
      <div @click="goToPage('/child/messages')" class="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95">
        <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
          <ChatBubbleLeftIcon class="w-7 h-7 text-green-500" />
        </div>
        <h3 class="font-bold text-gray-800">消息通知</h3>
        <p class="text-sm text-gray-500">暂无消息</p>
      </div>
      <div @click="goToPage('/child/connect')" class="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95">
        <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
          <LinkIcon class="w-7 h-7 text-blue-500" />
        </div>
        <h3 class="font-bold text-gray-800">连接管理</h3>
        <p class="text-sm text-gray-500">管理家人连接</p>
      </div>
      <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95">
        <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
          <ChartBarIcon class="w-7 h-7 text-purple-500" />
        </div>
        <h3 class="font-bold text-gray-800">数据统计</h3>
        <p class="text-sm text-gray-500">查看周报月报</p>
      </div>
    </div>
    <div @click="goToPage('/child/status')" class="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer active:scale-95">
      <div class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <ClipboardDocumentIcon class="w-8 h-8 text-indigo-500" />
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">今日摘要</h3>
      <p class="text-gray-400">连接父母后可查看今日数据</p>
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
