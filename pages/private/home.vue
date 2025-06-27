<script lang="ts" setup>
import { ArrowsPointingInIcon, ArrowsUpDownIcon, ArrowDownIcon, ArrowUpIcon, PlayIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'private',
})

useCurrent()

const { $eventBus } = useNuxtApp()
const gameStore = useMyGameStore()

const setSectionHandler = (section: string) => {
  gameStore.setSectionGame(section)
}

const setValueHandler = (key: string) => {
  gameStore.setValueGame(key)
}
</script>

<template>
  <div v-if="!gameStore.game" class="h-full grid grid-cols-1 place-items-center overflow-hidden">
    <div class="text-center">
      <p class="text-xl yf-text-base">{{ $t('start_msg_1') }}</p>
      <div class="mt-3 flex flex-col justify-center items-center">
        <p class="text-lg yf-text-base">{{ $t('start_msg_2') }}</p>
        <a 
          class="text-lg underline underline-offset-2 font-bold yf-text-base-green cursor-pointer"
          @touchend="navigateTo(`/private/guide`)">{{ $t('here') }}</a>
        <p class="text-lg yf-text-base">{{ $t('start_msg_3') }}</p>
        <p 
          class="flex justify-center items-center text-lg yf-text-base-green font-bold cursor-pointer"
          @touchend="$eventBus.emit('playEvent', true)">
          <PlayIcon class="antialiased h-6 w-6 yf-text-base-green cursor-pointer" />
          {{ $t('play') }}
        </p>
      </div>
    </div>
  </div>
  <div v-else class="h-full flex items-center flex-col justify-center">
    <template v-if="!gameStore.finish">
      <div class="flex-1 flex justify-center items-center">
        <div class="px-16 flex justify-center items-center flex-wrap">
          <Dice value="1" :loading="gameStore.loading_dice" />
          <Dice value="2" :loading="gameStore.loading_dice" />
          <Dice value="3" :loading="gameStore.loading_dice" />
          <Dice value="4" :loading="gameStore.loading_dice" />
          <Dice value="5" :loading="gameStore.loading_dice" />
        </div>
      </div>
      <div class="text-center">
        <p class="text-base yf-text-base">{{ $t('total_msg_1') }} {{ 3 - gameStore.num_throws }} {{ $t('total_msg_2') }} {{ gameStore.total_dices }}</p>
      </div>
    </template>
    <div v-else class="flex-1 flex justify-center items-center">
      <div class="flex justify-center items-center">
        <p>finito</p>
        <!-- TODO quando finisce mettere il dettaglio delle statistiche completo -->
      </div>
    </div>
    <ul class="flex items-center justify-around bg-slate-200 w-auto px-3 my-3 rounded-3xl">
      <li 
        v-if="gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @touchend="setSectionHandler('down')">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'down' }]">
          <ArrowDownIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'down' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'down' }]">{{ $t('down') }}</p>
        </div>
      </li>
      <li 
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @touchend="setSectionHandler('free')">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'free' }]">
          <ArrowsUpDownIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'free' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'free' }]">{{ $t('free') }}</p>
        </div>
      </li>
      <li 
        v-if="gameStore.type === 'medium' || gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @touchend="setSectionHandler('dry')">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'dry' }]">
          <ArrowsPointingInIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'dry' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'dry' }]">{{ $t('dry') }}</p>
        </div>
      </li>
      <li 
        v-if="gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @touchend="setSectionHandler('up')">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'up' }]">
          <ArrowUpIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'up' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'up' }]">{{ $t('up') }}</p>
        </div>
      </li>
    </ul>
    <div class="w-full flex overflow-x-auto pb-5">
      <div class="flex flex-nowrap">
        <Box 
          title="box1" 
          :content="['one', 'two', 'three', 'four', 'five', 'six']"
          @set-value="setValueHandler" />
        <Box 
          title="box2" 
          :content="['min', 'max']"
          @set-value="setValueHandler" />
        <Box 
          title="box3" 
          :content="['eleven', 'full', 'poker']" 
          @set-value="setValueHandler" />
        <Box 
          title="box4" 
          :content="['scale', 'yam']" 
          @set-value="setValueHandler" />
      </div>
    </div>
  </div>
</template>