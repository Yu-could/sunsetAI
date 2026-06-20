<template>
  <div class="animate-pulse">
    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div class="space-y-2">
        <div class="h-3 bg-gray-100 rounded"></div>
        <div class="h-3 bg-gray-100 rounded w-5/6"></div>
        <div class="h-3 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 mb-4">
      <div v-for="i in count" :key="i" class="bg-white rounded-xl shadow-sm p-3">
        <div class="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2"></div>
        <div class="h-3 bg-gray-100 rounded w-2/3 mx-auto mb-1"></div>
        <div class="h-2 bg-gray-50 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 4 }
})
</script>
