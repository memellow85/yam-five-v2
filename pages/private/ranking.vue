<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useCurrent()

const { onPointerDown, onPointerUp } = useTap()
const firebase = useFirebase()

const selectedTab = ref('easy')
const data: any = ref([])

const showCurrentTabHandler = async (value: string) => {
  selectedTab.value = value
  const results = await firebase.getPersons()
  data.value = normalizeRanking(results, selectedTab.value)
}

onMounted(async () => {
  await showCurrentTabHandler(selectedTab.value)
})
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
          class="py-2 flex justify-between items-center border-b">
          <p class="yf-text-base">{{ `${k + 1}) ${d.name}` }}</p>
          <div class="flex justify-between items-center w-28">
            <div 
              :class="['w-3 h-3 rounded-full', {
                'bg-yellow-300': k === 0,
                'bg-slate-400': k === 1,
                'bg-yellow-600': k === 2,
                'bg-slate-100': k > 2
              }]" />
            <p class="yf-text-base">{{ `${d.value} (${d.count})` }}</p>
          </div>
        </div>
      </template>
      <p v-else class="yf-text-base text-lg text-center py-3">{{ $t('no_data') }}</p>
    </div>
  </div>
</template>