<script lang="ts" setup>
interface DiceInterface {
  value: string
  loading: boolean
}
const props = defineProps<DiceInterface>()

const { onPointerDown, onPointerUp } = useTap()
const gameStore = useMyGameStore()

const getDice = () => {
  switch (props.value) {
    case '1':
      return gameStore.dices.dice1
    case '2':
      return gameStore.dices.dice2
    case '3':
      return gameStore.dices.dice3
    case '4':
      return gameStore.dices.dice4
    case '5':
      return gameStore.dices.dice5
  }
}

const blockHandler = () => {
  switch (props.value) {
    case '1':
      gameStore.setBlockDiceGame(props.value, !gameStore.dices.dice1.block)
      break
    case '2':
      gameStore.setBlockDiceGame(props.value, !gameStore.dices.dice2.block)
      break
    case '3':
      gameStore.setBlockDiceGame(props.value, !gameStore.dices.dice3.block)
      break
    case '4':
      gameStore.setBlockDiceGame(props.value, !gameStore.dices.dice4.block)
      break
    case '5':
      gameStore.setBlockDiceGame(props.value, !gameStore.dices.dice5.block)
      break
  }
}
</script>

<template>
  <div
    :class="['h-16 w-16 m-2 rounded-3xl bg-slate-200 relative', {
      'flex justify-center items-center': props.loading && !getDice()?.block,
      '!bg-slate-400': getDice()?.block
    }]"
    @pointerdown="onPointerDown"
    @pointerup="(e) => onPointerUp(e, blockHandler)">
    <template v-if="!props.loading || getDice()?.block">
      <template v-if="getDice()?.value === 1">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
      </template>
      <template v-else-if="getDice()?.value === 2">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 top-3 translate-x-[-50%]" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 bottom-3 translate-x-[-50%]" />
      </template>
      <template v-else-if="getDice()?.value === 3">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 top-3 translate-x-[-50%]" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 bottom-3 translate-x-[-50%]" />
      </template>
      <template v-else-if="getDice()?.value === 4">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 bottom-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 bottom-3" />
      </template>
      <template v-else-if="getDice()?.value === 5">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 bottom-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 bottom-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" />
      </template>
      <template v-else-if="getDice()?.value === 6">
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 top-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 bottom-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 bottom-3" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute left-3 top-1/2 translate-y-[-50%]" />
        <div class="h-2 w-2 rounded-full bg-slate-600 absolute right-3 top-1/2 translate-y-[-50%]" />
      </template>
      <div v-else class="h-full flex justify-center items-center">
        <p class="text-base yf-text-base">-</p>
      </div>
    </template>
    <Loader v-else color="grey" />
  </div>
</template>