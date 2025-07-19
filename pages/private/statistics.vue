<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useCurrent()

const gameStore = useMyGameStore()
</script>

<template>
  <div class="px-2">
    <Wip v-if="gameStore.type === ''" />
    <div v-if="gameStore.type === 'easy'" class="w-full">
      <Result :data="gameStore.free" noborder />
    </div>
    <div v-if="gameStore.type === 'medium'" class="w-full">
      <Result :data="gameStore.free" />
      <Result :data="gameStore.dry" noborder />
    </div>
    <div v-if="gameStore.type === 'hard'" class="w-full">
      <Result :data="gameStore.down" />
      <Result :data="gameStore.free" />
      <Result :data="gameStore.dry" />
      <Result :data="gameStore.up" noborder />
    </div>
  </div>
</template>