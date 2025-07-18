<script lang="ts" setup>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

interface ModalInterface {
  show: boolean
  title?: string
  close?: boolean
  submit?: boolean
  info?: boolean
  warning?: boolean
  error?: boolean
  success?: boolean
  scroll?: boolean
  menu?: boolean
}
const props = defineProps<ModalInterface>()

const { onPointerDown, onPointerUp } = useTap()

defineEmits(['closeModal', 'submitModal'])
</script>

<template>
  <div 
    v-if="props.show" 
    class="fixed left-0 top-0 w-full h-full bg-slate-600 opacity-50 z-10" 
    @pointerdown="onPointerDown"
    @pointerup="(e) => onPointerUp(e, () => $emit('closeModal'))" />
  <div 
    :class="[
      'fixed overflow-hidden z-20 w-11/12 left-1/2 translate-x-[-50%] transition-all duration-500 rounded-2xl bg-white p-3',
      {
        '-bottom-full opacity-0': !props.show,
        'bottom-6 opacity-100': props.show,
        '!bg-yellow-200': props.warning,
        '!bg-green-200': props.success,
        '!bg-red-200': props.error,
        'flex flex-col h-3/4': props.scroll,
        '!p-0': props.menu
      }
    ]">
    <header v-if="props.title" class="border-b border-slate-200 pb-3">
      <h2 class="text-base yf-text-base">{{ props.title }}</h2>
    </header>
    <main
      :class="[
        'flex-1',
        {
          'py-3 overflow-y-auto': !props.menu,
          'overflow-hidden flex flex-col': props.menu
        }
      ]">
      <slot />
    </main>
    <footer 
      v-if="props.submit || props.close" 
      class="grid grid-cols-2 border-t border-slate-200 pt-3">
      <div class="flex justify-start items-center">
        <button 
          v-if="props.close" 
          class="yf-btn-red-circle" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => $emit('closeModal'))">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
      <div class="flex justify-end items-center">
        <button 
          v-if="props.submit" 
          class="yf-btn-green-circle"
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => $emit('submitModal'))">
          <CheckIcon class="h-6 w-6" />
        </button>
      </div>
    </footer>
  </div>
</template>
