<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/24/outline'

interface BoxInterface {
  title: string
  content?: string[]
}
const props = defineProps<BoxInterface>()

const gameStore = useMyGameStore()

const emit = defineEmits(['setValue'])

const setValueHandler = (key: string) => {
  const elm = gameStore.getSpecificDiceGame(key)
  if (elm?.active && !gameStore.loading_dice) {
    emit('setValue', key)
  }
}
</script>

<template>
  <div class="w-60 p-3 flex flex-col bg-white rounded-3xl mx-1.5 border-b-2 border-orange">
    <h4 class="text-sm yf-text-base">
      {{ $t(`group.${props.title}`) }}
      <!-- TODO aggiungere total per sezione -->
    </h4>
    <div class="flex flex-1 justify-center items-center">
      <div class="flex justify-center items-center flex-wrap">
        <div 
          v-for="c in props.content" 
          :key="c" 
          class="w-14 h-14 flex flex-col justify-around items-center m-2 rounded-xl pt-2 pb-1 bg-slate-200 cursor-pointer" 
          @touchend="setValueHandler(c)">
          <p 
            v-if="
              gameStore.num_throws === 3 || 
              (gameStore.getSpecificValueGame(c, true) !== -1 && gameStore.num_throws !== 3)" class="text-lg yf-text-base">
            {{ gameStore.getSpecificValueGame(c, false) }}
          </p>
          <PlusIcon v-else class="h-5 w-5" />
          <p class="text-xs yf-text-base" >{{ $t(`stage.${c}`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  