<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="memories" size="lg" class="text-blue-500" /> 回忆录
      </h1>
      <p class="text-gray-500">记录生活点滴，珍藏人生故事</p>
    </header>

    <!-- 标签切换 -->
    <div class="bg-white rounded-xl shadow-sm p-1 mb-6 flex">
      <button @click="activeTab = 'diary'" 
        :class="activeTab === 'diary' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'"
        class="flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
        <span>📔</span> 日记
      </button>
      <button @click="activeTab = 'memoir'" 
        :class="activeTab === 'memoir' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'"
        class="flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
        <span>📖</span> 回忆录
      </button>
      <button @click="activeTab = 'photos'" 
        :class="activeTab === 'photos' ? 'bg-purple-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'"
        class="flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
        <span>🖼️</span> 相册
      </button>
    </div>

    <!-- 日记模块 -->
    <div v-if="activeTab === 'diary'">
      <!-- 快速写日记 -->
      <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white mb-6">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span>📝</span> 今天发生了什么？
        </h3>
        <p class="text-blue-200 text-sm mb-4">记录每一天的点滴，留住美好时光</p>
        <button @click="openDiaryModal" class="w-full bg-white text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <span>✏️</span> 写日记
        </button>
      </div>

      <!-- 心情统计 -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span>📊</span> 本月心情
        </h3>
        <div class="flex justify-around">
          <div v-for="(mood, i) in moodStats" :key="i" class="text-center">
            <span class="text-2xl">{{ mood.icon }}</span>
            <p class="text-xs text-gray-500 mt-1">{{ mood.label }}</p>
            <p class="text-lg font-bold" :class="mood.color">{{ mood.count }}</p>
          </div>
        </div>
      </div>

      <!-- 日记列表 -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
            <span>📔</span> 我的日记
          </h3>
          <span class="text-sm text-gray-400">{{ diaryList.length }} 篇</span>
        </div>
        
        <div v-if="diaryList.length > 0" class="space-y-4">
          <div v-for="(diary, index) in diaryList" :key="index" 
            class="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                {{ diary.mood }}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-gray-800">{{ diary.title }}</h4>
                  <span class="text-xs text-gray-400">{{ formatDate(diary.date) }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-2 line-clamp-3">{{ diary.content }}</p>
                <div class="flex gap-2 mt-3">
                  <button @click="viewDiary(diary)" class="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
                    <span>👁️</span> 查看
                  </button>
                  <button @click="editDiary(diary, index)" class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <span>✏️</span> 编辑
                  </button>
                  <button @click="deleteDiary(index)" class="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                    <span>🗑️</span> 删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10 text-gray-400">
          <div class="text-5xl mb-4">📔</div>
          <p class="text-lg mb-2">暂无日记</p>
          <p class="text-sm">点击上方"写日记"按钮记录今天</p>
        </div>
      </div>
    </div>

    <!-- 回忆录模块 -->
    <div v-if="activeTab === 'memoir'">
      <!-- 开始录制 -->
      <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white mb-6">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span>🎤</span> 讲述您的故事
        </h3>
        <p class="text-orange-200 text-sm mb-4">用语音记录人生经历，AI帮您整理成文</p>
        <button @click="startRecording" 
          :class="isRecording ? 'bg-red-500 animate-pulse' : 'bg-white text-orange-600'"
          class="w-full py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <span class="text-2xl">{{ isRecording ? '⏹️' : '🎤' }}</span>
          {{ isRecording ? '停止录制' : '开始语音录制' }}
        </button>
        <p v-if="isRecording" class="mt-3 text-center text-orange-200 text-sm animate-pulse">
          正在聆听您的故事...
        </p>
      </div>

      <!-- AI润色说明 -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white mb-6">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span>✨</span> AI 润色
        </h3>
        <p class="text-purple-200 text-sm mb-4">让 AI 帮您优化文字，让回忆更加生动</p>
        <div class="grid grid-cols-2 gap-3">
          <button v-for="style in polishStyles" :key="style.value"
            @click="quickPolishStyle(style.value)"
            class="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
            <span class="text-2xl">{{ style.icon }}</span>
            <p class="text-sm mt-1">{{ style.label }}</p>
          </button>
        </div>
      </div>

      <!-- 回忆录列表 -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
            <span>📖</span> 我的回忆录
          </h3>
          <span class="text-sm text-gray-400">{{ memoirList.length }} 篇</span>
        </div>
        
        <div v-if="memoirList.length > 0" class="space-y-4">
          <div v-for="(memoir, index) in memoirList" :key="index" 
            class="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors">
            <div class="flex items-start justify-between mb-2">
              <span class="text-sm text-gray-400">{{ formatDate(memoir.date) }}</span>
              <span v-if="memoir.aiPolished" class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                ✨ AI润色
              </span>
            </div>
            <h4 class="font-bold text-gray-800 mb-2">{{ memoir.title }}</h4>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-4">{{ memoir.content }}</p>
            <div class="flex gap-2 mt-3">
              <button @click="viewMemoir(memoir)" class="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100">
                阅读全文
              </button>
              <button @click="polishWithAI(memoir, index)" class="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm hover:bg-purple-100">
                ✨ AI润色
              </button>
              <button @click="editMemoir(memoir, index)" class="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm hover:bg-orange-100">
                编辑
              </button>
              <button @click="deleteMemoir(index)" class="text-gray-400 hover:text-red-500 px-2 py-1">
                🗑️
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10 text-gray-400">
          <div class="text-5xl mb-4">📖</div>
          <p class="text-lg mb-2">暂无回忆录</p>
          <p class="text-sm">点击上方"开始语音录制"按钮记录您的故事</p>
        </div>
      </div>
    </div>

    <!-- 相册模块 -->
    <div v-if="activeTab === 'photos'">
      <div class="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white mb-6">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span>🖼️</span> 我的相册
        </h3>
        <p class="text-purple-200 text-sm mb-4">珍藏美好瞬间，AI帮您修复旧照片</p>
        <button @click="openPhotoUpload" class="w-full bg-white text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
          <span>📤</span> 上传照片
        </button>
      </div>

      <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white mb-6">
        <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
          <span>✨</span> AI 照片修复
        </h3>
        <p class="text-green-200 text-sm mb-4">让模糊的旧照片焕然一新</p>
        <div class="grid grid-cols-2 gap-3">
          <button v-for="style in enhanceStyles" :key="style.value"
            @click="quickEnhanceStyle(style.value)"
            class="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
            <span class="text-2xl">{{ style.icon }}</span>
            <p class="text-sm mt-1">{{ style.label }}</p>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
            <span>🖼️</span> 照片收藏
          </h3>
          <span class="text-sm text-gray-400">{{ photoList.length }} 张</span>
        </div>
        
        <div v-if="photoList.length > 0" class="grid grid-cols-3 gap-3">
          <div v-for="(photo, index) in photoList" :key="index" 
            class="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
            @click="viewPhoto(photo)">
            <img :src="photo.url" :alt="photo.title" class="w-full h-full object-cover">
            <div v-if="photo.aiEnhanced" class="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
              ✨
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p class="text-white text-xs truncate">{{ photo.title }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10 text-gray-400">
          <div class="text-5xl mb-4">🖼️</div>
          <p class="text-lg mb-2">暂无照片</p>
          <p class="text-sm">点击上方"上传照片"按钮添加您的照片</p>
        </div>
      </div>
    </div>

    <!-- 写日记弹窗 -->
    <div v-if="showDiaryModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          {{ editingDiaryIndex >= 0 ? '编辑日记' : '写日记' }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">标题</label>
            <input v-model="diaryForm.title" type="text" placeholder="今天发生了什么？" class="w-full border border-gray-200 rounded-lg p-3 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">心情</label>
            <div class="flex gap-3">
              <button v-for="mood in moods" :key="mood.value" 
                @click="diaryForm.mood = mood.value"
                :class="diaryForm.mood === mood.value ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'"
                class="flex-1 p-3 rounded-lg border-2 text-center hover:border-blue-300 transition-colors">
                <span class="text-2xl">{{ mood.icon }}</span>
                <p class="text-xs mt-1">{{ mood.label }}</p>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">内容</label>
            <div class="relative">
              <textarea v-model="diaryForm.content" :placeholder="isDiaryRecording ? '正在听您说话...' : '记录下今天的美好时刻...'" rows="5" class="w-full border border-gray-200 rounded-lg p-3 focus:border-blue-500"></textarea>
              <div class="absolute bottom-3 right-3 flex gap-2">
                <button @click="insertPhoto" class="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:opacity-90 transition-all">
                  <span>🖼️</span> 插入图片
                </button>
                <button @click="toggleDiaryRecording" 
                  :class="isDiaryRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'"
                  class="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:opacity-90 transition-all">
                  <span>{{ isDiaryRecording ? '⏹️' : '🎤' }}</span>
                  {{ isDiaryRecording ? '停止' : '语音输入' }}
                </button>
              </div>
            </div>
            <p v-if="isDiaryRecording" class="text-xs text-blue-500 mt-2 flex items-center gap-1">
              <span class="animate-pulse">●</span> 正在识别语音...
            </p>
          </div>
          <div class="flex items-center gap-2">
            <input v-model="diaryForm.isPrivate" type="checkbox" id="private" class="w-4 h-4">
            <label for="private" class="text-sm text-gray-600">仅自己可见</label>
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="optimizeDiaryWithAI" :disabled="!diaryForm.content.trim()" class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-2">
            <span>✨</span> AI优化
          </button>
        </div>
        <div class="flex gap-3 mt-2">
          <button @click="showDiaryModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="saveDiary" class="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
            {{ editingDiaryIndex >= 0 ? '保存修改' : '保存日记' }}
          </button>
        </div>
      </div>
    </div>

    <!-- AI润色弹窗 -->
    <div v-if="showPolishModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>✨</span> AI 润色
        </h3>
        
        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-2">选择润色风格</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="style in polishStyles" :key="style.value"
              @click="selectedStyle = style.value"
              :class="[
                selectedStyle === style.value ? 'bg-purple-100 border-purple-500' : 'bg-gray-50 border-gray-200',
                'p-3', 'rounded-lg', 'border-2', 'text-center', 'hover:border-purple-300', 'transition-colors'
              ]">
              <span class="text-2xl">{{ style.icon }}</span>
              <p class="text-sm font-medium mt-1">{{ style.label }}</p>
              <p class="text-xs text-gray-500">{{ style.desc }}</p>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-2">原文</label>
          <div class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 max-h-32 overflow-y-auto">
            {{ polishSource?.content }}
          </div>
        </div>

        <div v-if="polishedContent" class="mb-4">
          <label class="block text-gray-600 text-sm mb-2">润色结果</label>
          <div class="bg-purple-50 rounded-lg p-3 text-sm text-gray-700 max-h-40 overflow-y-auto">
            {{ polishedContent }}
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showPolishModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button v-if="!polishedContent" @click="doPolish" :disabled="isPolishing"
            class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50">
            {{ isPolishing ? '润色中...' : '开始润色' }}
          </button>
          <button v-else @click="applyPolish" class="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
            应用润色结果
          </button>
        </div>
      </div>
    </div>

    <!-- 查看详情弹窗 -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">{{ detailItem?.title }}</h3>
          <button @click="showDetailModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="flex items-center gap-2 mb-4">
          <span v-if="detailItem?.mood" class="text-2xl">{{ detailItem.mood }}</span>
          <span v-if="detailItem?.aiPolished" class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">✨ AI润色</span>
          <span class="text-sm text-gray-400">{{ formatDate(detailItem?.date) }}</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
          {{ detailItem?.content }}
        </div>
        <button @click="showDetailModal = false" class="w-full mt-4 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">
          关闭
        </button>
      </div>
    </div>

    <!-- 照片上传弹窗 -->
    <div v-if="showPhotoUploadModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold text-gray-800 mb-4">上传照片</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
          @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
          <span class="text-4xl mb-3 block">📷</span>
          <p class="text-gray-600 mb-2">点击或拖拽上传照片</p>
          <p class="text-sm text-gray-400">支持 JPG、PNG、GIF 格式</p>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect">
        </div>
        <div class="mt-4 flex gap-3">
          <button @click="showPhotoUploadModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="uploadPhoto" :disabled="!selectedPhoto" class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 disabled:opacity-50">上传</button>
        </div>
      </div>
    </div>

    <!-- 照片查看弹窗 -->
    <div v-if="showPhotoViewModal" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" @click="showPhotoViewModal = false">
      <div class="relative max-w-full max-h-full" @click.stop>
        <button @click="showPhotoViewModal = false" class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">&times;</button>
        <img :src="currentPhoto?.url" :alt="currentPhoto?.title" class="max-w-full max-h-[80vh] rounded-lg">
        <div class="absolute bottom-4 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h4 class="text-white font-bold">{{ currentPhoto?.title }}</h4>
          <p class="text-gray-300 text-sm">{{ formatDate(currentPhoto?.date) }}</p>
        </div>
        <div class="absolute top-4 left-4 flex gap-2">
          <button @click="enhancePhoto" v-if="!currentPhoto?.aiEnhanced" class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-green-600">
            <span>✨</span> AI修复
          </button>
          <button v-else class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1">
            <span>✅</span> 已修复
          </button>
          <button @click="deletePhoto(currentPhotoIndex)" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">🗑️ 删除</button>
        </div>
      </div>
    </div>

    <!-- 选择照片插入弹窗 -->
    <div v-if="showPhotoSelectModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">选择照片插入</h3>
        <div v-if="photoList.length > 0" class="grid grid-cols-3 gap-3">
          <div v-for="(photo, index) in photoList" :key="index" 
            class="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
            @click="selectPhotoForInsert(photo)">
            <img :src="photo.url" :alt="photo.title" class="w-full h-full object-cover">
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <div class="text-4xl mb-2">🖼️</div>
          <p>暂无照片，请先上传</p>
        </div>
        <button @click="showPhotoSelectModal = false" class="w-full mt-4 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
      </div>
    </div>

    <!-- AI照片修复弹窗 -->
    <div v-if="showEnhanceModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>✨</span> AI 照片修复
        </h3>
        
        <div class="mb-4">
          <label class="block text-gray-600 text-sm mb-2">选择修复风格</label>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="style in enhanceStyles" :key="style.value"
              @click="selectedEnhanceStyle = style.value"
              :class="[
                selectedEnhanceStyle === style.value ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-200',
                'p-3', 'rounded-lg', 'border-2', 'text-center', 'hover:border-green-300', 'transition-colors'
              ]">
              <span class="text-2xl">{{ style.icon }}</span>
              <p class="text-sm font-medium mt-1">{{ style.label }}</p>
              <p class="text-xs text-gray-500">{{ style.desc }}</p>
            </button>
          </div>
        </div>

        <div v-if="enhancingPhoto" class="text-center py-4">
          <div class="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-gray-600">AI正在修复中，请稍候...</p>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showEnhanceModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="applyEnhance" :disabled="enhancingPhoto" class="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50">
            {{ enhancingPhoto ? '修复中...' : '开始修复' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import AppIcon from '../components/AppIcon.vue'
import { voiceAssistant } from '../utils/voiceAssistant'

const store = useAppStore()
const toast = useToastStore()

const activeTab = ref('diary')
const isRecording = ref(false)
const isDiaryRecording = ref(false)
const showDiaryModal = ref(false)
const showPolishModal = ref(false)
const showDetailModal = ref(false)
const showPhotoUploadModal = ref(false)
const showPhotoViewModal = ref(false)
const showPhotoSelectModal = ref(false)
const showEnhanceModal = ref(false)
const editingDiaryIndex = ref(-1)
const editingMemoirIndex = ref(-1)
const currentPhotoIndex = ref(-1)
const enhancingPhoto = ref(false)
const fileInput = ref(null)
const selectedPhoto = ref(null)
const currentPhoto = ref(null)
const selectedEnhanceStyle = ref('sharp')
const polishSource = ref(null)
const polishedContent = ref('')
const isPolishing = ref(false)
const selectedStyle = ref('warm')
const detailItem = ref(null)

const diaryForm = ref({
  title: '',
  content: '',
  mood: '😊',
  isPrivate: false
})

const moods = [
  { value: '😊', label: '开心', color: 'text-yellow-500' },
  { value: '🥰', label: '幸福', color: 'text-pink-500' },
  { value: '😌', label: '平静', color: 'text-green-500' },
  { value: '😢', label: '难过', color: 'text-blue-500' },
  { value: '😤', label: '生气', color: 'text-red-500' },
  { value: '😴', label: '疲惫', color: 'text-purple-500' }
]

const polishStyles = [
  { value: 'warm', label: '温馨风格', icon: '🌸', desc: '温暖亲切，适合家庭回忆' },
  { value: 'formal', label: '正式风格', icon: '📜', desc: '庄重典雅，适合重要记录' },
  { value: 'poetic', label: '诗意风格', icon: '🎨', desc: '优美抒情，富有文学感' },
  { value: 'concise', label: '简洁风格', icon: '✂️', desc: '简明扼要，突出重点' }
]

const enhanceStyles = [
  { value: 'sharp', label: '清晰度增强', icon: '🖼️', desc: '提升照片清晰度' },
  { value: 'color', label: '色彩恢复', icon: '🎨', desc: '恢复褪色照片色彩' },
  { value: 'repair', label: '老照片修复', icon: '📷', desc: '修复老旧破损照片' },
  { value: 'denoise', label: '智能降噪', icon: '✨', desc: '去除照片噪点' }
]

// AI润色模拟
const polishTemplates = {
  warm: (text) => {
    const intros = ['回想起那段时光，心中总是充满温暖。', '那是一个令人难忘的日子，', '每当想起这些，嘴角就不自觉地上扬。']
    const outros = ['这样的回忆，永远珍藏在心底。', '岁月流逝，但这份温暖始终不变。', '这就是生活中最美好的瞬间。']
    const intro = intros[Math.floor(Math.random() * intros.length)]
    const outro = outros[Math.floor(Math.random() * outros.length)]
    return `${intro}${text}${outro}`
  },
  formal: (text) => {
    return `谨以此文记录以下事项：\n\n${text}\n\n以上记录属实，特此留存。`
  },
  poetic: (text) => {
    const lines = text.split('。').filter(l => l.trim())
    return lines.map(line => `  ${line.trim()}，\n  如诗中行，如画中景。`).join('\n\n')
  },
  concise: (text) => {
    return text.replace(/[，。！？]/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 100) + (text.length > 100 ? '...' : '')
  }
}

const diaryList = computed(() => {
  return store.memoryRecords
    .filter(r => r.type === 'diary')
    .map((record, index) => ({
      ...record,
      id: index
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const memoirList = computed(() => {
  return store.memoryRecords
    .filter(r => r.type === 'memoir' || !r.type)
    .map((record, index) => ({
      ...record,
      id: index
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const moodStats = computed(() => {
  const stats = {}
  moods.forEach(m => stats[m.value] = 0)
  diaryList.value.forEach(d => {
    if (stats[d.mood] !== undefined) stats[d.mood]++
  })
  return moods.map(m => ({
    ...m,
    count: stats[m.value]
  }))
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const photoList = computed(() => {
  return store.memoryRecords
    .filter(r => r.type === 'photo')
    .map((record, index) => ({ ...record, id: index }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const openDiaryModal = () => {
  editingDiaryIndex.value = -1
  diaryForm.value = {
    title: '',
    content: '',
    mood: '😊',
    isPrivate: false
  }
  showDiaryModal.value = true
}

const saveDiary = () => {
  if (!diaryForm.value.title.trim()) {
    toast.warning('请输入日记标题', 2000)
    return
  }
  if (!diaryForm.value.content.trim()) {
    toast.warning('请输入日记内容', 2000)
    return
  }

  const diary = {
    type: 'diary',
    title: diaryForm.value.title,
    content: diaryForm.value.content,
    mood: diaryForm.value.mood,
    isPrivate: diaryForm.value.isPrivate,
    date: new Date().toISOString()
  }

  if (editingDiaryIndex.value >= 0) {
    const memories = [...store.memoryRecords]
    const diaryIndex = memories.findIndex((r, i) => r.type === 'diary' && i === editingDiaryIndex.value)
    if (diaryIndex >= 0) {
      memories[diaryIndex] = { ...memories[diaryIndex], ...diary }
      store.memoryRecords = memories
      store.saveMemoryRecords()
    }
    toast.success('日记已更新', 2000)
  } else {
    store.addMemoryRecord(diary)
    toast.success('日记已保存', 2000)
  }

  showDiaryModal.value = false
}

const editDiary = (diary, index) => {
  editingDiaryIndex.value = index
  diaryForm.value = {
    title: diary.title,
    content: diary.content,
    mood: diary.mood || '😊',
    isPrivate: diary.isPrivate || false
  }
  showDiaryModal.value = true
}

const deleteDiary = (index) => {
  if (confirm('确定要删除这篇日记吗？')) {
    const memories = store.memoryRecords.filter((r, i) => !(r.type === 'diary' && i === index))
    store.memoryRecords = memories
    store.saveMemoryRecords()
    toast.success('日记已删除', 2000)
  }
}

const viewDiary = (diary) => {
  detailItem.value = diary
  showDetailModal.value = true
}

const startRecording = () => {
  if (isRecording.value) {
    isRecording.value = false
    store.addMemoryRecord({
      type: 'memoir',
      title: '新回忆录',
      content: '这是我的一段珍贵回忆。记得那时候，一切都是那么美好。岁月虽然流逝，但记忆中的画面依然清晰如初。',
      tags: '#新记录',
      duration: '2分钟',
      date: new Date().toISOString()
    })
    toast.success('回忆录已保存', 2000)
  } else {
    isRecording.value = true
    toast.info('开始录制，请讲述您的故事...', 2000)
  }
}

const editMemoir = (memoir, index) => {
  // 可以扩展编辑功能
  toast.info('编辑功能开发中', 1500)
}

const deleteMemoir = (index) => {
  if (confirm('确定要删除这篇回忆录吗？')) {
    const memories = store.memoryRecords.filter((r, i) => !((r.type === 'memoir' || !r.type) && i === index))
    store.memoryRecords = memories
    store.saveMemoryRecords()
    toast.success('回忆录已删除', 2000)
  }
}

const viewMemoir = (memoir) => {
  detailItem.value = memoir
  showDetailModal.value = true
}

const polishWithAI = (memoir, index) => {
  polishSource.value = memoir
  editingMemoirIndex.value = index
  polishedContent.value = ''
  selectedStyle.value = 'warm'
  showPolishModal.value = true
}

const doPolish = () => {
  if (!polishSource.value) return

  isPolishing.value = true
  toast.info('AI正在润色中，请稍候...', 2000)

  // 模拟AI润色延迟
  setTimeout(() => {
    const template = polishTemplates[selectedStyle.value]
    if (template) {
      polishedContent.value = template(polishSource.value.content)
    }
    isPolishing.value = false
    toast.success('润色完成！', 2000)
  }, 2000)
}

const applyPolish = () => {
  if (!polishedContent.value || editingMemoirIndex.value < 0) return

  const memories = [...store.memoryRecords]
  const memoirIndex = memories.findIndex((r, i) => (r.type === 'memoir' || !r.type) && i === editingMemoirIndex.value)
  if (memoirIndex >= 0) {
    memories[memoirIndex] = {
      ...memories[memoirIndex],
      content: polishedContent.value,
      aiPolished: true,
      polishStyle: selectedStyle.value
    }
    store.memoryRecords = memories
    store.saveMemoryRecords()
    toast.success('润色结果已应用', 2000)
  }

  showPolishModal.value = false
  polishedContent.value = ''
}

const toggleDiaryRecording = () => {
  if (isDiaryRecording.value) {
    isDiaryRecording.value = false
    voiceAssistant.stopListening()
    toast.success('语音输入已停止', 1500)
  } else {
    if (!voiceAssistant.isSupported()) {
      toast.warning('您的浏览器不支持语音识别', 2000)
      return
    }
    isDiaryRecording.value = true
    toast.info('开始语音输入，请讲述您的日记内容...', 2000)
    voiceAssistant.startListening()
  }
}

const handleDiaryVoiceResult = (text) => {
  if (isDiaryRecording.value && text) {
    diaryForm.value.content += (diaryForm.value.content ? ' ' : '') + text
  }
}

const handleDiaryVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      handleDiaryVoiceResult(data)
      break
    case 'error':
      isDiaryRecording.value = false
      if (data === 'browser-not-supported') {
        toast.warning('您的浏览器不支持语音识别', 2000)
      } else {
        toast.warning('语音识别出错：' + data, 2000)
      }
      break
    case 'end':
      if (isDiaryRecording.value) {
        isDiaryRecording.value = false
        toast.success('语音输入已完成', 1500)
      }
      break
  }
}

const openPhotoUpload = () => {
  selectedPhoto.value = null
  showPhotoUploadModal.value = true
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    selectedPhoto.value = file
    toast.info(`已选择照片：${file.name}`, 1500)
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    selectedPhoto.value = file
    toast.info(`已选择照片：${file.name}`, 1500)
  }
}

const uploadPhoto = () => {
  if (!selectedPhoto.value) return

  const reader = new FileReader()
  reader.onload = (e) => {
    store.addMemoryRecord({
      type: 'photo',
      title: selectedPhoto.value.name.replace(/\.[^/.]+$/, ''),
      url: e.target.result,
      aiEnhanced: false,
      date: new Date().toISOString()
    })
    toast.success('照片上传成功', 2000)
    showPhotoUploadModal.value = false
    selectedPhoto.value = null
  }
  reader.readAsDataURL(selectedPhoto.value)
}

const viewPhoto = (photo) => {
  currentPhoto.value = photo
  currentPhotoIndex.value = photoList.value.findIndex(p => p.url === photo.url)
  showPhotoViewModal.value = true
}

const deletePhoto = (index) => {
  if (confirm('确定要删除这张照片吗？')) {
    const photos = store.memoryRecords.filter(r => r.type !== 'photo')
    store.memoryRecords = photos
    store.saveMemoryRecords()
    toast.success('照片已删除', 2000)
    showPhotoViewModal.value = false
  }
}

const enhancePhoto = () => {
  selectedEnhanceStyle.value = 'sharp'
  enhancingPhoto.value = false
  showEnhanceModal.value = true
}

const applyEnhance = () => {
  enhancingPhoto.value = true
  toast.info('AI正在修复照片，请稍候...', 2000)

  setTimeout(() => {
    const photos = [...store.memoryRecords]
    const photoIndex = photos.findIndex((r, i) => r.type === 'photo' && i === currentPhotoIndex.value)
    if (photoIndex >= 0) {
      photos[photoIndex] = {
        ...photos[photoIndex],
        aiEnhanced: true,
        enhanceStyle: selectedEnhanceStyle.value
      }
      store.memoryRecords = photos
      store.saveMemoryRecords()
      currentPhoto.value = photos[photoIndex]
    }
    enhancingPhoto.value = false
    showEnhanceModal.value = false
    toast.success('照片修复完成！', 2000)
  }, 2000)
}

const insertPhoto = () => {
  showPhotoSelectModal.value = true
}

const selectPhotoForInsert = (photo) => {
  diaryForm.value.content += (diaryForm.value.content ? '\n' : '') + `![${photo.title}](${photo.url})`
  showPhotoSelectModal.value = false
  toast.success('照片已插入', 1500)
}

const optimizeDiaryWithAI = () => {
  if (!diaryForm.value.content.trim()) return

  isPolishing.value = true
  toast.info('AI正在优化日记，请稍候...', 2000)

  setTimeout(() => {
    const template = polishTemplates[selectedStyle.value]
    if (template) {
      diaryForm.value.content = template(diaryForm.value.content)
    }
    isPolishing.value = false
    toast.success('日记优化完成！', 2000)
  }, 2000)
}

const quickPolishStyle = (style) => {
  selectedStyle.value = style
  if (memoirList.value.length > 0) {
    polishWithAI(memoirList.value[0], 0)
  } else {
    toast.info(`已选择${polishStyles.find(s => s.value === style)?.label}，请先创建回忆录`, 2000)
  }
}

const quickEnhanceStyle = (style) => {
  selectedEnhanceStyle.value = style
  if (photoList.value.length > 0) {
    viewPhoto(photoList.value[0])
    setTimeout(() => {
      enhancePhoto()
    }, 500)
  } else {
    toast.info(`已选择${enhanceStyles.find(s => s.value === style)?.label}，请先上传照片`, 2000)
  }
}

onMounted(() => {
  store.loadMemoryRecords()
  voiceAssistant.addCallback(handleDiaryVoiceEvent)
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleDiaryVoiceEvent)
  voiceAssistant.stopListening()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
