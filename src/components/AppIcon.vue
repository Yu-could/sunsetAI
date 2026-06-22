<template>
  <span class="inline-flex items-center justify-center">
    <svg
      class="iconify"
      :class="[sizeClass, colorClass]"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      :fill="fillColor"
      v-html="iconSvg"
    />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' },
  color: { type: String, default: '' },
  fill: { type: String, default: 'currentColor' }
})

const sizeClass = computed(() => ({
  xs: 'w-3.5 h-3.5',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
}[props.size] || 'w-6 h-6'))

const colorClass = computed(() => {
  if (!props.color) return ''
  if (props.color.startsWith('text-') || props.color.includes('bg-')) {
    return props.color
  }
  return `text-${props.color}`
})

const fillColor = computed(() => props.fill)

const iconSvgMap = {
  home: '<path d="M896 576H64v256a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V576z"/><path d="M512 128L192 448h128v128h256V448h128z"/>',
  heart: '<path d="M512 960C266.8 960 64 757.2 64 512S266.8 64 512 64s448 202.8 448 448-202.8 448-448 448z"/><path d="M448 384c-32 0-64 16-80 40-16 24-16 56 0 80l80 80 80-80c16-24 16-56 0-80-16-24-48-40-80-40z"/>',
  health: '<path d="M512 960C266.8 960 64 757.2 64 512S266.8 64 512 64s448 202.8 448 448-202.8 448-448 448z"/><path d="M448 384c-32 0-64 16-80 40-16 24-16 56 0 80l80 80 80-80c16-24 16-56 0-80-16-24-48-40-80-40z"/>',
  pill: '<path d="M448 128a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32h-64a32 32 0 0 1-32-32v-64z"/><path d="M448 864a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32h-64a32 32 0 0 1-32-32v-64z"/><path d="M896 512a384 384 0 1 1-768 0 384 384 0 0 1 768 0z"/>',
  medicine: '<path d="M448 128a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32h-64a32 32 0 0 1-32-32v-64z"/><path d="M448 864a32 32 0 0 1 32-32h64a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32h-64a32 32 0 0 1-32-32v-64z"/><path d="M896 512a384 384 0 1 1-768 0 384 384 0 0 1 768 0z"/>',
  book: '<path d="M896 128H128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M448 192h128v640h-128V192z"/>',
  memories: '<path d="M896 128H128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M448 192h128v640h-128V192z"/>',
  check: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 576l128 128 256-256"/>',
  safety: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 576l128 128 256-256"/>',
  users: '<path d="M320 448a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"/><path d="M704 448a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"/><path d="M192 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/><path d="M576 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/><path d="M960 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/>',
  family: '<path d="M320 448a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"/><path d="M704 448a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"/><path d="M192 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/><path d="M576 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/><path d="M960 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/>',
  calendar: '<path d="M896 192H128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"/><path d="M128 192h768v64H128z"/><path d="M192 384h640v64H192z"/><path d="M192 480h128v64H192z"/><path d="M352 480h128v64H352z"/><path d="M512 480h128v64H512z"/><path d="M672 480h128v64H672z"/>',
  schedule: '<path d="M896 192H128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"/><path d="M128 192h768v64H128z"/><path d="M192 384h640v64H192z"/><path d="M192 480h128v64H192z"/><path d="M352 480h128v64H352z"/><path d="M512 480h128v64H512z"/><path d="M672 480h128v64H672z"/>',
  alert: '<path d="M512 128L192 896h640L512 128z"/><path d="M448 512h128v128h-128z"/><path d="M448 704h128v64h-128z"/>',
  sos: '<path d="M512 128L192 896h640L512 128z"/><path d="M448 512h128v128h-128z"/><path d="M448 704h128v64h-128z"/>',
  settings: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 256v256l192 128"/>',
  chat: '<path d="M896 192H128a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h512v64H192z"/><path d="M192 576h384v64H192z"/>',
  message: '<path d="M896 192H128a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h512v64H192z"/><path d="M192 576h384v64H192z"/>',
  link: '<path d="M384 384a128 128 0 0 1 128-128h64a128 128 0 0 1 128 128v256a128 128 0 0 1-128 128h-64a128 128 0 0 1-128-128V384z"/><path d="M384 64a128 128 0 0 1 128-128h64a128 128 0 0 1 128 128v256a128 128 0 0 1-128 128h-64a128 128 0 0 1-128-128V64z"/>',
  connect: '<path d="M384 384a128 128 0 0 1 128-128h64a128 128 0 0 1 128 128v256a128 128 0 0 1-128 128h-64a128 128 0 0 1-128-128V384z"/><path d="M384 64a128 128 0 0 1 128-128h64a128 128 0 0 1 128 128v256a128 128 0 0 1-128 128h-64a128 128 0 0 1-128-128V64z"/>',
  phone: '<path d="M640 128H384a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h256a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M448 256h128v512h-128z"/>',
  chart: '<path d="M192 128h640v64H192z"/><path d="M192 256h640v64H192z"/><path d="M192 384h640v64H192z"/><path d="M192 512h448v64H192z"/><path d="M192 640h576v64H192z"/><path d="M192 768h320v64H192z"/>',
  clock: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 256v320l192 128"/>',
  sun: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 64v128h128V64H512z"/><path d="M512 832v128h128V832H512z"/><path d="M64 512h128v128H64V512z"/><path d="M832 512h128v128h-128V512z"/><path d="M192 192l128 128-128 128"/><path d="M832 192l-128 128 128 128"/><path d="M192 832l128-128-128-128"/><path d="M832 832l-128-128 128-128"/>',
  sunset: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 64v128h128V64H512z"/><path d="M512 832v128h128V832H512z"/><path d="M64 512h128v128H64V512z"/><path d="M832 512h128v128h-128V512z"/><path d="M192 192l128 128-128 128"/><path d="M832 192l-128 128 128 128"/><path d="M192 832l128-128-128-128"/><path d="M832 832l-128-128 128-128"/>',
  eye: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 384a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"/>',
  bulb: '<path d="M448 128h128v128h-128z"/><path d="M448 256h128v384a128 128 0 0 1-128 128h-128a128 128 0 0 1-128-128V256h128z"/><path d="M384 320h128v256h-128z"/>',
  user: '<path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"/><path d="M512 640a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"/>',
  clipboard: '<path d="M768 128H256a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M768 64a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V32h448z"/>',
  question: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 384v256"/><path d="M512 448h64"/>',
  mic: '<path d="M512 128a192 192 0 1 0 0 384 192 192 0 0 0 0-384z"/><path d="M384 512h256v256H384z"/><path d="M512 768v128h64v-128z"/>',
  microphone: '<path d="M512 128a192 192 0 1 0 0 384 192 192 0 0 0 0-384z"/><path d="M384 512h256v256H384z"/><path d="M512 768v128h64v-128z"/>',
  beaker: '<path d="M64 384h896v512H64z"/><path d="M64 384l448-320 448 320"/><path d="M192 512h640v384H192z"/>',
  shield: '<path d="M64 256l448-192 448 192v512H64z"/><path d="M384 384h256v128h-256z"/><path d="M448 512h128v128h-128z"/>',
  bell: '<path d="M384 128h256v128h-256z"/><path d="M64 256a512 512 0 0 1 896 0v256a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V256z"/><path d="M192 320h640v384H192z"/>',
  sparkles: '<path d="M512 128l64 128h128l-108 78 40 128-112-68-112 68 40-128-108-78h128z"/><path d="M256 384l32 64h64l-54 38 20 64-56-34-56 34 20-64-54-38h64z"/><path d="M768 384l32 64h64l-54 38 20 64-56-34-56 34 20-64-54-38h64z"/>',
  star: '<path d="M512 128l64 128h128l-108 78 40 128-112-68-112 68 40-128-108-78h128z"/>',
  fire: '<path d="M512 128a192 192 0 0 0-192 192c0 64 32 128 64 192 64-64 96-128 96-192 0-64-32-128-64-192z"/><path d="M512 128a192 192 0 0 1 192 192c0 64-32 128-64 192-64 64-96 128-96 192 0-64 32-128 64-192 64-64 96-128 96-192 0-64-32-128-64-192z"/>',
  wrench: '<path d="M768 256l-128 128h-64l-128-128 128-128h64z"/><path d="M256 256l128 128h64l128-128-128-128h-64z"/><path d="M448 448l-64 128h128z"/>',
  flag: '<path d="M256 128h128v640h-128z"/><path d="M384 128l256 192v-192h128v384l-256-192v192H384z"/>',
  photo: '<path d="M192 128h640v64H192z"/><path d="M192 192h640v512H192z"/><path d="M192 704h640v128H192z"/><path d="M256 256h256v256H256z"/><path d="M512 256h256v256H512z"/><path d="M256 512h256v128H256z"/><path d="M512 512h256v128H512z"/>',
  edit: '<path d="M64 192h128v128H64z"/><path d="M64 320h640v64H64z"/><path d="M192 128h640v64H192z"/><path d="M768 384l-128 128-128-128 128-128z"/>',
  refresh: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 256v256l192 128"/><path d="M512 256h256"/>',
  diet: '<path d="M64 640h896v128H64z"/><path d="M64 512h896v64H64z"/><path d="M192 384h128v256H192z"/><path d="M64 384h128v128H64z"/><path d="M704 384h128v128H704z"/><path d="M704 512h128v128H704z"/><path d="M384 512h256v128H384z"/>',
  food: '<path d="M64 640h896v128H64z"/><path d="M64 512h896v64H64z"/><path d="M192 384h128v256H192z"/><path d="M64 384h128v128H64z"/><path d="M704 384h128v128H704z"/><path d="M704 512h128v128H704z"/><path d="M384 512h256v128H384z"/>',
  restaurant: '<path d="M64 640h896v128H64z"/><path d="M64 512h896v64H64z"/><path d="M192 384h128v256H192z"/><path d="M64 384h128v128H64z"/><path d="M704 384h128v128H704z"/><path d="M704 512h128v128H704z"/><path d="M384 512h256v128H384z"/>',
  utensils: '<path d="M64 640h896v128H64z"/><path d="M64 512h896v64H64z"/><path d="M192 384h128v256H192z"/><path d="M64 384h128v128H64z"/><path d="M704 384h128v128H704z"/><path d="M704 512h128v128H704z"/><path d="M384 512h256v128H384z"/>',
  bloodpressure: '<path d="M64 384h896v512H64z"/><path d="M64 384l448-320 448 320"/><path d="M192 512h640v384H192z"/>',
  bloodsugar: '<path d="M64 384h896v512H64z"/><path d="M64 384l448-320 448 320"/><path d="M192 512h640v384H192z"/>',
  heartrate: '<path d="M512 960C266.8 960 64 757.2 64 512S266.8 64 512 64s448 202.8 448 448-202.8 448-448 448z"/><path d="M448 384c-32 0-64 16-80 40-16 24-16 56 0 80l80 80 80-80c16-24 16-56 0-80-16-24-48-40-80-40z"/>',
  hospital: '<path d="M64 128h896v64H64z"/><path d="M128 192h768v64H128z"/><path d="M64 256h896v512H64z"/><path d="M128 384h64v256h-64z"/><path d="M832 384h64v256h-64z"/><path d="M384 384h256v128H384z"/><path d="M384 576h256v128H384z"/><path d="M64 768h896v64H64z"/><path d="M384 832h256v64H384z"/>',
  ambulance: '<path d="M64 256h896v64H64z"/><path d="M64 320h896v256H64z"/><path d="M64 576h896v64H64z"/><path d="M192 256v256h64V256z"/><path d="M768 256v256h64V256z"/><path d="M384 384h256v128H384z"/>',
  emergency: '<path d="M512 128L192 896h640L512 128z"/><path d="M448 512h128v128h-128z"/><path d="M448 704h128v64h-128z"/>',
  parent: '<path d="M512 512c88 0 160-72 160-160S600 192 512 192 352 264 352 352s72 160 160 160zm0 64c-128 0-384 64-384 192v64h768v-64c0-128-256-192-384-192z"/>',
  elder: '<path d="M512 512c88 0 160-72 160-160S600 192 512 192 352 264 352 352s72 160 160 160zm0 64c-128 0-384 64-384 192v64h768v-64c0-128-256-192-384-192z"/>',
  child_icon: '<path d="M512 512c88 0 160-72 160-160S600 192 512 192 352 264 352 352s72 160 160 160zm0 64c-128 0-384 64-384 192v64h768v-64c0-128-256-192-384-192z"/>',
  admin: '<path d="M64 256l448-192 448 192v512H64z"/><path d="M384 384h256v128h-256z"/><path d="M448 512h128v128h-128z"/>',
  walk: '<path d="M192 896h128v64H192z"/><path d="M64 768h128v64H64z"/><path d="M192 640h128v64H192z"/><path d="M64 512h128v64H64z"/><path d="M192 384h128v64H192z"/><path d="M64 256h128v64H64z"/><path d="M128 896l64-128-64-128"/><path d="M128 512l64-128-64-128"/>',
  sleep: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 256v128h128"/><path d="M512 384v128h-128"/><path d="M512 512v128h128"/><path d="M512 640v128h-128"/>',
  moon: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 256v128h128"/><path d="M512 384v128h-128"/><path d="M512 512v128h128"/><path d="M512 640v128h-128"/>',
  water: '<path d="M64 896h896v64H64z"/><path d="M64 768h896v64H64z"/><path d="M64 640h896v64H64z"/><path d="M192 512h640v64H192z"/><path d="M256 384h512v64H256z"/><path d="M320 256h384v64H320z"/><path d="M384 128h256v64H384z"/>',
  exercise: '<path d="M512 960C266.8 960 64 757.2 64 512S266.8 64 512 64s448 202.8 448 448-202.8 448-448 448z"/><path d="M448 384c-32 0-64 16-80 40-16 24-16 56 0 80l80 80 80-80c16-24 16-56 0-80-16-24-48-40-80-40z"/>',
  building: '<path d="M64 128h896v64H64z"/><path d="M64 192h896v512H64z"/><path d="M64 704h896v64H64z"/><path d="M128 256h64v256h-64z"/><path d="M256 256h64v256h-64z"/><path d="M384 256h64v256h-64z"/><path d="M512 256h64v256h-64z"/><path d="M640 256h64v256h-64z"/><path d="M768 256h64v256h-64z"/><path d="M128 576h64v64h-64z"/><path d="M256 576h64v64h-64z"/><path d="M384 576h64v64h-64z"/><path d="M512 576h64v64h-64z"/><path d="M640 576h64v64h-64z"/><path d="M768 576h64v64h-64z"/>',
  mobile: '<path d="M352 64h320a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H352a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z" fill="none" stroke="currentColor" stroke-width="64" stroke-linejoin="round"/><path d="M416 192h192v576H416z" fill="none" stroke="currentColor" stroke-width="64"/><path d="M480 128h64v32h-64z"/><path d="M480 864h64v32h-64z"/>',
  monitor: '<path d="M192 128h640v64H192z"/><path d="M192 192h640v384H192z"/><path d="M192 576h640v64H192z"/><path d="M448 640h128v128H448z"/><path d="M320 768h384v64H320z"/>',
  volume: '<path d="M64 512h128v128H64z"/><path d="M64 448h128v64H64z"/><path d="M64 576h128v64H64z"/><path d="M192 448l128-128v256z"/><path d="M320 320l128-128v512z"/><path d="M448 384l128-128v384z"/>',
  location: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 384v256l192 128"/>',
  mail: '<path d="M64 192h896v64H64z"/><path d="M64 256h896v512H64z"/><path d="M64 768h896v64H64z"/><path d="M64 256l448 256 448-256"/><path d="M64 768l448-256 448 256"/>',
  key: '<path d="M64 512h128v128H64z"/><path d="M64 640h128v64H64z"/><path d="M192 512l128-128v256z"/><path d="M320 384l128-128v256z"/><path d="M512 64a128 128 0 0 1 128 128v64a128 128 0 0 1-128 128h-64a128 128 0 0 1-128-128v-64A128 128 0 0 1 448 64z"/>',
  document: '<path d="M64 192h896v64H64z"/><path d="M64 256h896v512H64z"/><path d="M64 768h896v64H64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h640v64H192z"/><path d="M192 576h640v64H192z"/><path d="M192 672h384v64H192z"/>',
  cart: '<path d="M64 192h896v64H64z"/><path d="M64 256h896v512H64z"/><path d="M64 768h896v64H64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h128v64H192z"/><path d="M384 480h128v64H384z"/><path d="M576 480h128v64H576z"/><path d="M192 576h640v64H192z"/><path d="M192 672h384v64H192z"/><path d="M64 384l64 64h768l64-64"/>',
  globe: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M64 512h896v64H64z"/><path d="M512 64v896"/><path d="M64 256l448-192 448 192"/><path d="M64 768l448 192 448-192"/>',
  bolt: '<path d="M512 128h128v256h-128z"/><path d="M512 384h128v256h-128z"/><path d="M384 128h128v256h-128z"/><path d="M384 384h128v256h-128z"/><path d="M384 640h256v64H384z"/>',
  paint: '<path d="M192 64h128v128h-128z"/><path d="M384 64h128v128h-128z"/><path d="M576 64h128v128h-128z"/><path d="M192 192h640v64H192z"/><path d="M192 256h640v64H192z"/><path d="M192 320h640v64H192z"/><path d="M64 384h128v128H64z"/><path d="M832 384h128v128h-128z"/><path d="M64 512h128v128H64z"/><path d="M832 512h128v128h-128z"/>',
  cube: '<path d="M192 128h640v64H192z"/><path d="M192 192l-64 128h64l64-128z"/><path d="M832 192l64 128h-64l-64-128z"/><path d="M128 320h768v64H128z"/><path d="M128 384l64 128h64l-64-128z"/><path d="M896 384l-64 128h-64l64-128z"/><path d="M192 512h640v64H192z"/><path d="M192 576l-64-128h64l64 128z"/><path d="M832 576l64-128h-64l-64 128z"/><path d="M128 448h768v64H128z"/>',
  tag: '<path d="M64 256h128v128H64z"/><path d="M64 384h64v128H64z"/><path d="M192 256h512v128H192z"/><path d="M64 512h64v128H64z"/><path d="M192 384l128 128h512l-128-128z"/><path d="M64 640h64v128H64z"/>',
  trophy: '<path d="M64 320h896v64H64z"/><path d="M64 384h128v128H64z"/><path d="M704 384h128v128H704z"/><path d="M192 384h128v256H192z"/><path d="M64 512h128v256H64z"/><path d="M704 512h128v256H704z"/><path d="M192 512h512v128H192z"/><path d="M192 640h512v128H192z"/><path d="M384 768h128v64H384z"/><path d="M448 768h128v64H448z"/>',
  education: '<path d="M64 192h128v128H64z"/><path d="M192 192h128v128H192z"/><path d="M320 192h128v128H320z"/><path d="M64 320h128v256H64z"/><path d="M192 320h128v256H192z"/><path d="M320 320h128v256H320z"/><path d="M64 576h384v64H64z"/><path d="M64 640h384v64H64z"/><path d="M64 704h384v64H64z"/><path d="M64 768h384v64H64z"/><path d="M256 832h64v64h-64z"/><path d="M64 192l320-192 320 192"/><path d="M64 576l320-192 320 192"/>',
  rocket: '<path d="M512 128a128 128 0 0 0-128 128v128h256V256a128 128 0 0 0-128-128z"/><path d="M384 384h256v64H384z"/><path d="M384 448h256v64H384z"/><path d="M384 512h256v64H384z"/><path d="M384 576h256v64H384z"/><path d="M384 640h256v64H384z"/><path d="M384 704h256v64H384z"/><path d="M384 768h256v64H384z"/><path d="M448 832h128v64H448z"/><path d="M512 896v64"/>',
  search: '<path d="M512 384a256 256 0 1 0 0 512 256 256 0 0 0 0-512z"/><path d="M512 448v192h192"/>',
  filter: '<path d="M64 256h896v64H64z"/><path d="M64 384h896v64H64z"/><path d="M64 512h896v64H64z"/><path d="M64 640h896v64H64z"/><path d="M64 768h896v64H64z"/><path d="M192 256v128h64v-128z"/><path d="M384 384v128h64v-128z"/><path d="M576 512v128h64v-128z"/><path d="M768 640v128h64v-128z"/>',
  adjust: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M512 256v128h128"/><path d="M512 384v128h-128"/><path d="M512 512v128h128"/><path d="M512 640v128h-128"/><path d="M64 512h128v64H64z"/><path d="M768 512h128v64h-128z"/><path d="M512 64h64v128h-64z"/><path d="M512 832h64v128h-64z"/>',
  plus: '<path d="M512 128v128h128V128H512z"/><path d="M512 640v128h128V640H512z"/><path d="M128 512h128v64H128z"/><path d="M640 512h128v64h-128z"/>',
  minus: '<path d="M128 512h768v64H128z"/>',
  close: '<path d="M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M384 384l256 256"/><path d="M640 384l-256 256"/>',
  play: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 384l256 192-256 192z"/>',
  stop: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 384h256v256H384z"/>',
  pause: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 384h64v256H384z"/><path d="M576 384h64v256h-64z"/>',
  trendingUp: '<path d="M64 512h128v64H64z"/><path d="M192 448h128v64h-128z"/><path d="M320 384h128v64h-128z"/><path d="M448 320h128v64h-128z"/><path d="M576 448h128v64h-128z"/><path d="M704 576h128v64h-128z"/><path d="M832 448h128v64h-128z"/><path d="M64 576l384-384 128 128 256-256"/>',
  trendingDown: '<path d="M64 512h128v64H64z"/><path d="M192 448h128v64h-128z"/><path d="M320 384h128v64h-128z"/><path d="M448 320h128v64h-128z"/><path d="M576 448h128v64h-128z"/><path d="M704 576h128v64h-128z"/><path d="M832 448h128v64h-128z"/><path d="M64 512l384 384 128-128 256 256"/>',
  smile: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"/><path d="M640 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"/><path d="M384 640l128 128 128-128"/>',
  frown: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"/><path d="M640 448a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"/><path d="M384 640l128-128 128 128"/>',
  thumbsUp: '<path d="M64 512h128v64H64z"/><path d="M64 576h128v64H64z"/><path d="M64 640h128v64H64z"/><path d="M64 704h128v64H64z"/><path d="M64 768h128v64H64z"/><path d="M192 512h256v64H192z"/><path d="M192 576h256v64H192z"/><path d="M192 640h256v64H192z"/><path d="M192 704h256v64H192z"/><path d="M192 768h256v64H192z"/><path d="M448 512h128v256h-128z"/><path d="M448 768h128v128h-128z"/>',
  news: '<path d="M64 128h896v64H64z"/><path d="M64 192h896v64H64z"/><path d="M64 256h896v512H64z"/><path d="M64 768h896v64H64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h128v64H192z"/><path d="M352 480h128v64H352z"/><path d="M512 480h128v64H512z"/><path d="M672 480h128v64H672z"/><path d="M192 576h640v64H192z"/><path d="M192 672h384v64H192z"/>',
  video: '<path d="M64 128h896v64H64z"/><path d="M64 192h896v512H64z"/><path d="M64 704h896v128H64z"/>',
  music: '<path d="M128 640V256h128v384z"/><path d="M768 640V384l-384-128v384z"/>',
  cloud: '<path d="M320 640a256 256 0 1 0 0-512 256 256 0 0 0 0 512z"/>',
  police: '<path d="M64 256l448-192 448 192v512H64z"/><path d="M384 384h256v128h-256z"/><path d="M448 512h128v128h-128z"/>',
  security: '<path d="M64 256l448-192 448 192v512H64z"/><path d="M384 384h256v128h-256z"/><path d="M448 512h128v128h-128z"/>',
  warning: '<path d="M512 128L192 896h640L512 128z"/><path d="M448 512h128v128h-128z"/><path d="M448 704h128v64h-128z"/>',
  signin: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 576l128 128 256-256"/>',
  sign: '<path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"/><path d="M384 576l128 128 256-256"/>',
  record: '<path d="M768 128H256a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M768 64a64 64 0 0 1-64 64H320a64 64 0 0 1-64-64V32h448z"/>',
  notebook: '<path d="M896 128H128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64z"/><path d="M448 192h128v640h-128V192z"/>',
  stats: '<path d="M192 128h640v64H192z"/><path d="M192 256h640v64H192z"/><path d="M192 384h640v64H192z"/><path d="M192 512h448v64H192z"/><path d="M192 640h576v64H192z"/><path d="M192 768h320v64H192z"/>',
  report: '<path d="M64 192h896v64H64z"/><path d="M64 256h896v512H64z"/><path d="M64 768h896v64H64z"/><path d="M192 384h640v64H192z"/><path d="M192 480h640v64H192z"/><path d="M192 576h640v64H192z"/><path d="M192 672h384v64H192z"/>',
  tip: '<path d="M448 128h128v128h-128z"/><path d="M448 256h128v384a128 128 0 0 1-128 128h-128a128 128 0 0 1-128-128V256h128z"/><path d="M384 320h128v256h-128z"/>',
}

const iconSvg = computed(() => {
  return iconSvgMap[props.name] || iconSvgMap['question'] || ''
})
</script>

<style scoped>
.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
