<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="[sizeClass, colorClass]"
  />
  <span v-else :class="sizeClass">{{ fallbackIcon }}</span>
</template>

<script setup>
import { computed } from 'vue'
import {
  // 导航
  HomeIcon, HeartIcon, DeviceTabletIcon, BookOpenIcon,
  CheckCircleIcon, UsersIcon, CalendarDaysIcon, ExclamationTriangleIcon,
  CogIcon, ChatBubbleLeftIcon, LinkIcon, PhoneIcon,
  // 数据/状态
  ChartBarIcon, ClockIcon, SunIcon, EyeIcon, LightBulbIcon,
  UserIcon, ClipboardDocumentIcon, QuestionMarkCircleIcon,
  MicrophoneIcon, BeakerIcon, ShieldCheckIcon, BellIcon,
  SparklesIcon, StarIcon, FireIcon, WrenchScrewdriverIcon,
  FlagIcon, PhotoIcon, PencilSquareIcon, ArrowPathIcon,
  // 新增补充
  MoonIcon, BuildingOfficeIcon, DevicePhoneMobileIcon,
  SpeakerWaveIcon, MapPinIcon, EnvelopeIcon, KeyIcon,
  DocumentTextIcon, ShoppingCartIcon, GlobeAltIcon,
  BoltIcon, PaintBrushIcon, CubeIcon, TagIcon,
  TrophyIcon, AcademicCapIcon, RocketLaunchIcon,
  MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon,
  PlusCircleIcon, MinusCircleIcon, XCircleIcon,
  PlayCircleIcon, StopCircleIcon, PauseCircleIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon,
  FaceSmileIcon, FaceFrownIcon, HandThumbUpIcon,
  NewspaperIcon, VideoCameraIcon, MusicalNoteIcon,
  CloudIcon, SunIcon as SunSolid, SparklesIcon as SparklesSolid
} from '@heroicons/vue/24/solid'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' },
  color: { type: String, default: '' }
})

// 完整图标映射 — 所有 emoji → Heroicon SVG
const iconMap = {
  // 导航类
  home: HomeIcon,
  heart: HeartIcon,
  health: HeartIcon,
  pill: DeviceTabletIcon,
  medicine: DeviceTabletIcon,
  book: BookOpenIcon,
  memories: BookOpenIcon,
  check: CheckCircleIcon,
  safety: CheckCircleIcon,
  users: UsersIcon,
  family: UsersIcon,
  calendar: CalendarDaysIcon,
  schedule: CalendarDaysIcon,
  alert: ExclamationTriangleIcon,
  sos: ExclamationTriangleIcon,
  settings: CogIcon,
  chat: ChatBubbleLeftIcon,
  message: ChatBubbleLeftIcon,
  link: LinkIcon,
  connect: LinkIcon,
  phone: PhoneIcon,

  // 数据/状态类
  chart: ChartBarIcon,
  clock: ClockIcon,
  sun: SunIcon,
  sunset: SunIcon,
  eye: EyeIcon,
  bulb: LightBulbIcon,
  user: UserIcon,
  clipboard: ClipboardDocumentIcon,
  question: QuestionMarkCircleIcon,
  mic: MicrophoneIcon,
  microphone: MicrophoneIcon,
  beaker: BeakerIcon,
  shield: ShieldCheckIcon,
  bell: BellIcon,
  sparkles: SparklesIcon,
  star: StarIcon,
  fire: FireIcon,
  wrench: WrenchScrewdriverIcon,
  flag: FlagIcon,
  photo: PhotoIcon,
  edit: PencilSquareIcon,
  refresh: ArrowPathIcon,

  // 饮食
  diet: FireIcon,
  utensils: null,       // 无直接对应 → ShieldCheckIcon 作为备选
  food: FireIcon,
  restaurant: null,

  // 医疗健康
  bloodpressure: BeakerIcon,
  bloodsugar: BeakerIcon,
  heartrate: HeartIcon,
  hospital: BuildingOfficeIcon,
  ambulance: ExclamationTriangleIcon,
  emergency: ExclamationTriangleIcon,

  // 角色头像
  parent: UserIcon,
  elder: UserIcon,
  child_icon: UserIcon,
  admin: ShieldCheckIcon,

  // 生活
  walk: null,
  sleep: MoonIcon,
  water: BeakerIcon,
  exercise: HeartIcon,

  // 新增补充
  moon: MoonIcon,
  building: BuildingOfficeIcon,
  mobile: DevicePhoneMobileIcon,
  volume: SpeakerWaveIcon,
  location: MapPinIcon,
  mail: EnvelopeIcon,
  key: KeyIcon,
  document: DocumentTextIcon,
  cart: ShoppingCartIcon,
  globe: GlobeAltIcon,
  bolt: BoltIcon,
  paint: PaintBrushIcon,
  cube: CubeIcon,
  tag: TagIcon,
  trophy: TrophyIcon,
  education: AcademicCapIcon,
  rocket: RocketLaunchIcon,
  search: MagnifyingGlassIcon,
  filter: FunnelIcon,
  adjust: AdjustmentsHorizontalIcon,
  plus: PlusCircleIcon,
  minus: MinusCircleIcon,
  close: XCircleIcon,
  play: PlayCircleIcon,
  stop: StopCircleIcon,
  pause: PauseCircleIcon,
  trendingUp: ArrowTrendingUpIcon,
  trendingDown: ArrowTrendingDownIcon,
  smile: FaceSmileIcon,
  frown: FaceFrownIcon,
  thumbsUp: HandThumbUpIcon,
  news: NewspaperIcon,
  video: VideoCameraIcon,
  music: MusicalNoteIcon,
  cloud: CloudIcon,

  // 安全/紧急
  police: ShieldCheckIcon,
  security: ShieldCheckIcon,
  warning: ExclamationTriangleIcon,

  // 记录/签到
  signin: CheckCircleIcon,
  record: ClipboardDocumentIcon,
  notebook: BookOpenIcon,
  stats: ChartBarIcon,
  report: DocumentTextIcon,
  tip: LightBulbIcon,
}

// 极少量保留的文本符号（非图形emoji）
const textFallbacks = {
  utensils: '🍽️',
  restaurant: '🥘',
  walk: '🚶',
}

const iconComponent = computed(() => iconMap[props.name] || null)

const fallbackIcon = computed(() => textFallbacks[props.name] || '')

const sizeClass = computed(() => ({
  xs: 'w-3.5 h-3.5',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
  '2xl': 'w-12 h-12',
}[props.size] || 'w-6 h-6'))

const colorClass = computed(() => props.color || '')
</script>
