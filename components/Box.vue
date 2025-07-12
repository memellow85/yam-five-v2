<script lang="ts" setup>
import { PlusIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

interface BoxInterface {
  title: string
  help?: string
  content?: string[]
}
const props = defineProps<BoxInterface>()

const { onPointerDown, onPointerUp } = useTap()
const gameStore = useMyGameStore()

const emit = defineEmits(['setValue'])

const info = ref(false)

const setValueHandler = (key: string) => {
  const elm = gameStore.getSpecificDiceGame(key)
  if (elm?.active && !gameStore.loading_dice_1 && !gameStore.loading_dice_2 && !gameStore.loading_dice_3 && !gameStore.loading_dice_4 && !gameStore.loading_dice_5) {
    emit('setValue', key)
  }
}

const showInfoBox = (value: boolean) => {
  info.value =  value
}
</script>

<template>
  <div 
    :class="['relative w-64 p-3 flex flex-col bg-white rounded-3xl mx-1.5 overflow-hidden', {
      'border-b-2 border-orange': !info,
      'border-b-2 border-white': info
    }]">
    <h4 class="text-sm yf-text-base flex justify-between items-center">
      {{ $t(`group.${props.title}`) }}
      ({{ gameStore?.[gameStore.section as 'down' | 'free' | 'dry' | 'up'].extra?.[props.title as 'box1' | 'box2' | 'box3' | 'box4'] }})
      <QuestionMarkCircleIcon 
        class="yf-text-base h-5 w-5 cursor-pointer" 
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showInfoBox(true))" />
    </h4>
    <div class="flex flex-1 justify-center items-center">
      <div class="flex justify-center items-center flex-wrap">
        <div 
          v-for="c in props.content" 
          :key="c" 
          :class="['w-14 h-14 flex flex-col justify-between items-center m-2 rounded-xl pt-2 pb-1 bg-slate-200 cursor-pointer', {
            '!bg-slate-100': !gameStore.getSpecificDiceGame(c)?.active && gameStore.getSpecificDiceGame(c)?.value === -1
          }]"
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => setValueHandler(c))">
          <p 
            v-if="
              gameStore.num_throws === 3 || 
              (gameStore.getSpecificValueGame(c, true) !== -1 && gameStore.num_throws !== 3)" 
              :class="['text-lg yf-text-base', {
                '!text-slate-200': !gameStore.getSpecificDiceGame(c)?.active && gameStore.getSpecificDiceGame(c)?.value === -1
              }]">
            {{ gameStore.getSpecificValueGame(c, false) }}
          </p>
          <PlusIcon 
            v-else 
            :class="['yf-text-base h-5 w-5 mt-1', {
              '!text-slate-300': !gameStore.getSpecificDiceGame(c)?.active && gameStore.getSpecificDiceGame(c)?.value === -1
            }]" />
          <p 
            :class="['text-xs yf-text-base', {
              '!text-slate-300': !gameStore.getSpecificDiceGame(c)?.active && gameStore.getSpecificDiceGame(c)?.value === -1
            }]">{{ $t(`stage.${c}`) }}</p>
        </div>
      </div>
    </div>
    <div
      :class="['absolute h-2/3 w-full left-0 bg-white rounded-3xl transition-all border-t-2 border-orange flex flex-col justify-center items-center', {
        '-bottom-2/3 opacity-0': !info,
        'bottom-0 opacity-100': info
      }]">
      <XCircleIcon 
        class="absolute top-3 right-3 yf-text-base h-5 w-5 cursor-pointer"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showInfoBox(false))" />
      <p class="text-base yf-text-base px-3">{{ $t(`group.${props.help}_1`) }}</p>
      <p class="text-base yf-text-base px-3">{{ $t(`group.${props.help}_2`) }}</p>
      <p 
        v-if="props.help === 'help3' || props.help === 'help4'" 
        class="text-base yf-text-base px-3">{{ $t(`group.${props.help}_3`) }}</p>
    </div>
  </div>
</template>
  