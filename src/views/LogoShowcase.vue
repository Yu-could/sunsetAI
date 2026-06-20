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
            <div class="w-48 h-48">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sunGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#F97316"/>
                    <stop offset="100%" stop-color="#EA580C"/>
                  </linearGradient>
                </defs>
                <circle cx="100" cy="150" r="50" fill="url(#sunGrad1)"/>
                <path d="M100 100 L100 30 M100 100 L60 50 M100 100 L140 50 M100 100 L45 75 M100 100 L155 75" stroke="#FDBA74" stroke-width="4" stroke-linecap="round"/>
                <path d="M65 25 L65 8 M80 20 L85 5 M95 18 L100 2 M115 18 L120 2 M130 20 L135 5 M145 25 L145 8" stroke="#FEF3C7" stroke-width="3" stroke-linecap="round"/>
                <circle cx="70" cy="60" r="4" fill="#EA580C"/>
                <circle cx="130" cy="60" r="4" fill="#EA580C"/>
                <circle cx="85" cy="35" r="3" fill="#F97316"/>
                <circle cx="115" cy="35" r="3" fill="#F97316"/>
                <path d="M70 60 L85 35 L100 2 L115 35 L130 60" stroke="#FDBA74" stroke-width="2" fill="none"/>
                <path d="M90 110 L85 130 L95 130 L92 145 L100 138 L108 145 L105 130 L115 130 L110 110 Z" fill="#92400E"/>
                <circle cx="95" cy="100" r="8" fill="#FEF3C7"/>
                <circle cx="105" cy="100" r="8" fill="#FEF3C7"/>
                <circle cx="97" cy="98" r="2" fill="#1F2937"/>
                <circle cx="107" cy="98" r="2" fill="#1F2937"/>
              </svg>
            </div>
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
            <div class="w-48 h-48">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FACC15"/>
                    <stop offset="100%" stop-color="#F59E0B"/>
                  </linearGradient>
                </defs>
                <path d="M40 120 Q40 70 70 70 L130 70 Q160 70 160 120 L160 130 Q160 150 130 150 L70 150 Q40 150 40 130 Z" fill="url(#bubbleGrad)"/>
                <path d="M160 120 L180 135 L160 150" fill="url(#bubbleGrad)"/>
                <path d="M55 90 L145 90" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                <path d="M65 105 L135 105" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                <path d="M75 120 L125 120" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
                <path d="M70 70 L65 55 L75 65 L80 50" stroke="#FBBF24" stroke-width="2" fill="none"/>
                <path d="M130 70 L135 55 L125 65 L120 50" stroke="#FBBF24" stroke-width="2" fill="none"/>
                <path d="M40 130 L25 135 L35 145 L20 150" stroke="#FBBF24" stroke-width="2" fill="none"/>
                <path d="M160 130 L175 135 L165 145 L180 150" stroke="#FBBF24" stroke-width="2" fill="none"/>
                <circle cx="55" cy="85" r="5" fill="#92400E"/>
                <circle cx="145" cy="85" r="5" fill="#92400E"/>
                <circle cx="55" cy="145" r="5" fill="#92400E"/>
                <circle cx="145" cy="145" r="5" fill="#92400E"/>
                <path d="M55 85 L55 145 L145 145 L145 85" stroke="#F59E0B" stroke-width="2" fill="none"/>
              </svg>
            </div>
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
            <div class="w-48 h-48">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sunGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#F87171"/>
                    <stop offset="50%" stop-color="#F97316"/>
                    <stop offset="100%" stop-color="#EA580C"/>
                  </linearGradient>
                </defs>
                <path d="M30 150 Q30 100 80 100 L120 100 Q170 100 170 150" fill="none" stroke="url(#sunGrad3)" stroke-width="20" stroke-linecap="round"/>
                <path d="M90 100 Q110 90 130 100 Q150 110 170 100" fill="none" stroke="#FCA5A5" stroke-width="8" stroke-linecap="round"/>
                <path d="M85 120 Q105 110 125 120 Q145 130 170 120" fill="none" stroke="#FDBA74" stroke-width="6" stroke-linecap="round"/>
                <path d="M80 140 Q100 130 120 140 Q140 150 170 140" fill="none" stroke="#FCD34D" stroke-width="4" stroke-linecap="round"/>
                <circle cx="60" cy="110" r="6" fill="#92400E"/>
                <circle cx="90" cy="95" r="5" fill="#B45309"/>
                <circle cx="120" cy="105" r="5" fill="#B45309"/>
                <circle cx="150" cy="95" r="6" fill="#92400E"/>
                <circle cx="75" cy="130" r="4" fill="#F97316"/>
                <circle cx="135" cy="130" r="4" fill="#F97316"/>
                <path d="M60 110 L90 95 L120 105 L150 95" stroke="#F87171" stroke-width="2" fill="none"/>
                <path d="M90 95 L75 130 L135 130 L120 105" stroke="#F97316" stroke-width="2" fill="none"/>
                <path d="M75 130 L60 110" stroke="#FCA5A5" stroke-width="2" fill="none"/>
                <path d="M135 130 L150 95" stroke="#FCA5A5" stroke-width="2" fill="none"/>
                <path d="M95 100 L90 120 L100 120 L98 135 L105 128 L112 135 L110 120 L120 120 L115 100 Z" fill="#FEF3C7" opacity="0.6"/>
              </svg>
            </div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
</script>
