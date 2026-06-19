<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <ChatBubbleLeftIcon class="w-7 h-7 text-green-500" />
        消息通知
      </h1>
      <p class="text-gray-500">接收父母的消息和提醒</p>
    </header>
    <div class="text-center py-12">
      <div class="w-24 h-24 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <ChatBubbleLeftIcon class="w-12 h-12 text-green-500" />
      </div>
      <h3 class="text-xl font-bold text-gray-700 mb-2">暂无消息</h3>
      <p class="text-gray-400">连接父母后可接收消息通知</p>
    </div>
  </div>
</template>

<script setup>
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/solid'
</script>
