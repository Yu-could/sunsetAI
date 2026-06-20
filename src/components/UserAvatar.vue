<template>
  <!-- 自定义头像图片 -->
  <img
    v-if="customAvatar"
    :src="customAvatar"
    :class="['rounded-full object-cover flex-shrink-0 border-2 border-white/30 shadow-sm', sizeClass]"
    alt="头像"
  />
  <!-- 有姓名无图片 → 显示文字 -->
  <div
    v-else
    :class="[
      'rounded-full flex items-center justify-center font-bold flex-shrink-0',
      sizeClass,
      hasName ? colorBgClass : 'bg-white/20',
      hasName ? '' : 'border-2 border-white/30'
    ]"
  >
    <span v-if="hasName" :class="[textSizeClass, 'text-white']">{{ displayChar }}</span>
    <AppIcon v-else :name="roleIcon" :size="iconSize" class="text-white" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  role: { type: String, default: 'parent' },
  size: { type: String, default: 'md' }
})

const store = useAppStore()

const customAvatar = computed(() => {
  return store.realNameInfo?.avatar || store.userProfile?.avatar || null
})

const hasName = computed(() => {
  return !!(store.realNameInfo?.realName || store.userProfile?.realName)
})

const displayChar = computed(() => {
  const name = store.realNameInfo?.realName || store.userProfile?.realName || ''
  if (name.length >= 2) return name[name.length - 1]
  return name[0] || '?'
})

const roleIcon = computed(() => props.role === 'parent' ? 'parent' : 'child_icon')

const colorBgClass = computed(() => {
  return props.role === 'parent'
    ? 'bg-gradient-to-br from-parent to-parent-hover'
    : 'bg-gradient-to-br from-child to-child-hover'
})

const sizeClass = computed(() => ({
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16'
}[props.size] || 'w-10 h-10'))

const textSizeClass = computed(() => ({
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
  '2xl': 'text-xl'
}[props.size] || 'text-sm'))

const iconSize = computed(() => ({
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl'
}[props.size] || 'md'))
</script>
