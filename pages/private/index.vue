<script lang="ts" setup>
import { ArrowsPointingInIcon, ArrowsUpDownIcon, ArrowDownIcon, ArrowUpIcon, PlayIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'auth',
})

useCurrent()

const { $eventBus } = useNuxtApp()
const { onPointerDown, onPointerUp } = useTap()
const gameStore = useMyGameStore()

defineEmits(['playEvent'])

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
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => navigateTo(`/private/guide`))">{{ $t('here') }}</a>
        <p class="text-lg yf-text-base">{{ $t('start_msg_3') }}</p>
        <p 
          class="flex justify-center items-center text-lg yf-text-base-green font-bold cursor-pointer"
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => $eventBus.emit('playEvent', true))">
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
    <div v-else class="flex-1 flex justify-center items-center w-full">
      <div class="flex flex-col justify-center items-center w-full">
        <p class="text-2xl yf-text-base"><span class="font-bold">{{ $t('message_finish_1') }}:</span></p>
        <p class="text-lg yf-text-base mb-3"><span class="font-bold">{{ $t('message_finish_2') }}:</span> {{ gameStore.free.extra.total }}</p>
        <!-- TODO rivedere in base alla tipologia del gioco e non al modo -->
        <div v-if="gameStore.section === 'down'" />
        <div v-if="gameStore.section === 'free'" class="w-full px-6 grid grid-cols-2 gap-3">
          <div>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box1') }}:</span> {{ gameStore.free.extra.box1 }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.over_60') }}:</span> {{ gameStore.free.extra.bonus_over_60 }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.over_70') }}:</span> {{ gameStore.free.extra.bonus_over_70 }}</p>
          </div>
          <div>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box2') }}:</span> {{ gameStore.free.extra.box2 }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.min_max') }}:</span> {{ gameStore.free.extra.bonus_min_max }}</p>
          </div>
          <div>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box3') }}:</span> {{ gameStore.free.extra.box3 }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.eleven') }}:</span> {{ gameStore.free.extra.bonus_eleven }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.full') }}:</span> {{ gameStore.free.extra.bonus_full }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.poker') }}:</span> {{ gameStore.free.extra.bonus_poker }}</p>
          </div>
          <div>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box4') }}:</span> {{ gameStore.free.extra.box4 }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.scale') }}:</span> {{ gameStore.free.extra.bonus_scale }}</p>
            <p class="text-base yf-text-base"><span class="font-bold">{{ $t('bonus.yam') }}:</span> {{ gameStore.free.extra.bonus_yam }}</p>
          </div>
        </div>
        <div v-if="gameStore.section === 'dry'" />
        <div v-if="gameStore.section === 'up'" />
        <!-- TODO quando finisce mettere il dettaglio delle statistiche completo -->
      </div>
    </div>
    <ul class="flex items-center justify-around bg-slate-200 w-auto px-3 my-3 rounded-3xl">
      <li 
        v-if="gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => setSectionHandler('down'))">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'down' }]">
          <ArrowDownIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'down' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'down' }]">{{ $t('down') }}</p>
        </div>
      </li>
      <li 
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => setSectionHandler('free'))">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'free' }]">
          <ArrowsUpDownIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'free' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'free' }]">{{ $t('free') }}</p>
        </div>
      </li>
      <li 
        v-if="gameStore.type === 'medium' || gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => setSectionHandler('dry'))">
        <div :class="['w-14 py-2 rounded-2xl flex flex-col justify-center items-center', { 'bg-yamfive': gameStore.section === 'dry' }]">
          <ArrowsPointingInIcon :class="['h-4 w-4 yf-text-base', { '!text-white': gameStore.section === 'dry' }]" />
          <p :class="['text-xs yf-text-base', { '!text-white': gameStore.section === 'dry' }]">{{ $t('dry') }}</p>
        </div>
      </li>
      <li 
        v-if="gameStore.type === 'hard'"
        class="flex flex-col justify-center items-center py-2 cursor-pointer" 
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => setSectionHandler('up'))">
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