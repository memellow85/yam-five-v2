<script lang="ts" setup>
import type { Ranking } from '~/interfaces'

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useCurrent()

const { onPointerDown, onPointerUp } = useTap()
const firebase = useFirebase()

const selectedTab = ref('easy')
let data: Ranking[] = []

const showCurrentTabHandler = async (value: string) => {
  selectedTab.value = value
  const results = firebase.getPersons()
  data = normalizeRanking(results, selectedTab.value)
}
</script>

<template>
  <div class="px-2">
    <ul class="grid grid-cols-3">
      <li 
        :class="['cursor-pointer py-2 text-center yf-text-base border-b', {
          'border-yamfive': selectedTab === 'easy'
        }]"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showCurrentTabHandler('easy'))">{{ $t('easy') }}</li>
      <li 
        :class="['cursor-pointer py-2 text-center yf-text-base border-b', {
          'border-yamfive': selectedTab === 'medium'
        }]"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showCurrentTabHandler('medium'))">{{ $t('medium') }}</li>
      <li 
        :class="['cursor-pointer py-2 text-center yf-text-base border-b', {
          'border-yamfive': selectedTab === 'hard'
        }]"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showCurrentTabHandler('hard'))">{{ $t('hard') }}</li>
    </ul>
    <div class="py-2">
      <template v-if="data.length > 0">
        <div 
          v-for="(d, k) in data" :key="k" 
          class="h-2 flex flex-col justify-around items-center border-b">
          <p>{{ `${k + 1})${d.name}` }}</p>
          <p>{{ `${d.value} (${d.count})` }}</p>
        </div>
      </template>
      <p v-else class="yf-text-base text-lg text-center py-3">{{ $t('no_data') }}</p>
    </div>
  </div>
</template>