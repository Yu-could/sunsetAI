<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
          夕阳智语 SunsetAI
        </h1>
        <p class="text-gray-600 text-lg">AI语音助老助手 · Logo设计方案</p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">夕阳</span>
          <span class="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">老人</span>
          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">AI</span>
          <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">语音</span>
          <span class="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">暖色调</span>
        </div>
      </div>

      <!-- Logo 展示 -->
      <div class="grid md:grid-cols-3 gap-6 mb-10">
        <!-- 方案一 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="p-6 bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
            <img
              :src="logo1Url"
              alt="方案一 温暖守护"
              class="w-48 h-48 object-contain"
            />
          </div>
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-800 mb-2">方案一：温暖守护</h3>
            <p class="text-sm text-gray-600 mb-3">
              夕阳半圆散发温暖光芒，光芒渐变为声波条形，中央是简洁的老人剪影，AI电路节点点缀在光芒上。
            </p>
            <div class="flex gap-2 flex-wrap">
              <span class="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">夕阳</span>
              <span class="text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded">声波</span>
              <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">老人剪影</span>
              <span class="text-xs px-2 py-1 bg-stone-50 text-stone-600 rounded">AI节点</span>
            </div>
          </div>
        </div>

        <!-- 方案二 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="p-6 bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
            <img
              :src="logo2Url"
              alt="方案二 智能陪伴"
              class="w-48 h-48 object-contain"
            />
          </div>
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-800 mb-2">方案二：智能陪伴</h3>
            <p class="text-sm text-gray-600 mb-3">
              圆润的对话气泡内含声波线条，气泡外形如太阳带三角形光芒，四角AI节点连线，融合科技与温暖。
            </p>
            <div class="flex gap-2 flex-wrap">
              <span class="text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded">对话气泡</span>
              <span class="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">太阳光芒</span>
              <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">声波</span>
              <span class="text-xs px-2 py-1 bg-stone-50 text-stone-600 rounded">AI网络</span>
            </div>
          </div>
        </div>

        <!-- 方案三 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="p-6 bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
            <img
              :src="logo3Url"
              alt="方案三 夕阳智语"
              class="w-48 h-48 object-contain"
            />
          </div>
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-800 mb-2">方案三：夕阳智语</h3>
            <p class="text-sm text-gray-600 mb-3">
              抽象几何设计，左侧夕阳半圆渐变暖色，三条声波曲线向右流动，AI节点连成心形叠加，负空间设计。
            </p>
            <div class="flex gap-2 flex-wrap">
              <span class="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded">几何夕阳</span>
              <span class="text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded">声波曲线</span>
              <span class="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">AI心形</span>
              <span class="text-xs px-2 py-1 bg-stone-50 text-stone-600 rounded">负空间</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 设计说明 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">设计说明</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-bold text-orange-600 mb-2">元素融合</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>· <strong>夕阳</strong>：半圆/圆弧形态，象征晚年温暖与美好</li>
              <li>· <strong>老人</strong>：简洁剪影/关爱之心，体现目标用户</li>
              <li>· <strong>AI</strong>：电路节点/网络连线，表达智能科技</li>
              <li>· <strong>语音</strong>：声波纹/对话气泡，核心交互方式</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-amber-600 mb-2">色彩方案</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-orange-500"></div>
                <span class="text-sm text-gray-600">橙色 #F97316 — 温暖活力</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-amber-500"></div>
                <span class="text-sm text-gray-600">琥珀 #F59E0B — 关怀陪伴</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-red-400"></div>
                <span class="text-sm text-gray-600">暖红 #F87171 — 热情关爱</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-yellow-400"></div>
                <span class="text-sm text-gray-600">暖黄 #FACC15 — 阳光希望</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 可扩展性说明 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">可扩展性</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-orange-100 rounded-lg flex items-center justify-center mb-2">
              <span class="text-2xl">📱</span>
            </div>
            <p class="text-xs text-gray-600">App图标<br/>1024×1024</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-amber-100 rounded-lg flex items-center justify-center mb-2">
              <span class="text-2xl">🌐</span>
            </div>
            <p class="text-xs text-gray-600">网页Favicon<br/>16×16</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-red-100 rounded-lg flex items-center justify-center mb-2">
              <span class="text-2xl">💬</span>
            </div>
            <p class="text-xs text-gray-600">社交头像<br/>400×400</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
              <span class="text-2xl">📋</span>
            </div>
            <p class="text-xs text-gray-600">名片印刷<br/>矢量缩放</p>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="text-center">
        <button
          @click="goBack"
          class="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const logo1Url = computed(() => {
  const prompt = 'minimalist flat vector logo, a setting sun semicircle at bottom, radiating warm light rays upward transforming into sound wave bars, a simple elderly person silhouette standing in center, tiny AI circuit dots on rays, warm orange amber coral palette, geometric clean design, white background, app icon style'
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`
})

const logo2Url = computed(() => {
  const prompt = 'flat vector logo icon, a rounded speech bubble containing horizontal sound wave lines, the bubble shaped like a sun with small triangular rays around it, AI node circles connected by lines at corners, warm golden yellow and soft red colors, modern tech minimal style, white background, clean simple shapes'
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`
})

const logo3Url = computed(() => {
  const prompt = 'abstract geometric flat logo, half circle sunset on left side with gradient warm orange to deep red, three curved sound wave lines flowing right, small connected AI network nodes forming a heart shape overlay, warm amber terracotta and coral palette, minimalist negative space design, white background, vector icon'
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=square_hd`
})

const goBack = () => {
  router.push('/')
}
</script>
