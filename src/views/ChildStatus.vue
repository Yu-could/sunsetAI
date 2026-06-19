<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <HeartIcon class="w-7 h-7 text-red-500" />
        健康状态
      </h1>
      <p class="text-gray-500">查看父母健康数据</p>
    </header>
    <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white mb-6 text-center">
      <div class="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
        <HeartIcon class="w-10 h-10" />
      </div>
      <h3 class="text-lg font-bold">健康评分</h3>
      <p class="text-green-100 mt-2">暂无数据</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
      <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <CheckCircleIcon class="w-8 h-8 text-green-500" />
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">签到记录</h3>
      <p class="text-gray-400">连接父母后可查看签到记录</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
      <div class="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <ReceiptPercentIcon class="w-8 h-8 text-orange-500" />
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">饮食记录</h3>
      <p class="text-gray-400">连接父母后可查看饮食记录</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6 text-center">
      <div class="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <ClockIcon class="w-8 h-8 text-indigo-500" />
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">最近活动</h3>
      <p class="text-gray-400">连接父母后可查看活动记录</p>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon, CheckCircleIcon, ReceiptPercentIcon, ClockIcon } from '@heroicons/vue/24/solid'
</script>
