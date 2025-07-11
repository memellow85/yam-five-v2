<script lang="ts" setup>
import { 
  TrophyIcon, 
  BookOpenIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Squares2X2Icon,
  UserGroupIcon,
  QueueListIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

const currentStore = useMyCurrentStore()
</script>

<template>
  <h2 class="pb-1 mt-2 border-b border-slate-200 text-xl yf-text-base flex items-center">
    <UserGroupIcon 
      v-if='currentStore.title_origin === "challenge"'
      class="w-6 h-6 yf-text-base mr-2" />
    <TrophyIcon 
      v-if='currentStore.title_origin === "ranking"'
      class="w-6 h-6 yf-text-base mr-2" />
    <BookOpenIcon
      v-if='currentStore.title_origin === "guide"'
      class="w-6 h-6 yf-text-base mr-2" />
    <UserIcon
      v-if='currentStore.title_origin === "profile"'
      class="w-6 h-6 yf-text-base mr-2" />
    <CogIcon
      v-if='currentStore.title_origin === "config"'
      class="w-6 h-6 yf-text-base mr-2" />
    <ChartBarIcon
      v-if='currentStore.title_origin === "statistics"'
      class="w-6 h-6 yf-text-base mr-2" />
    <ChatBubbleOvalLeftEllipsisIcon
      v-if='currentStore.title_origin === "chat"'
      class="w-6 h-6 yf-text-base mr-2" />
    <Squares2X2Icon
      v-if='currentStore.title_origin === "global"'
      class="w-6 h-6 yf-text-base mr-2" />
    <QueueListIcon
      v-if='currentStore.title_origin === "release"'
      class="w-6 h-6 yf-text-base mr-2" />
    <ExclamationTriangleIcon
      v-if='currentStore.title_origin === "report"'
      class="w-6 h-6 yf-text-base mr-2" />
    {{ currentStore.title }}
  </h2>
</template>