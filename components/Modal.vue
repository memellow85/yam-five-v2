<script lang="ts" setup>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

interface ModalInterface {
  show: boolean
  title?: string
  close?: boolean
  submit?: boolean
}
const props = defineProps<ModalInterface>()

defineEmits(['closeModal', 'submitModal'])
</script>

<template>
  <div 
    v-if="props.show" 
    class="fixed left-0 top-0 w-full h-full bg-transparent z-10" 
    @touchend="$emit('closeModal')" />
  <div 
    :class="[
      'fixed z-20 w-11/12 left-1/2 translate-x-[-50%] transition-all duration-500 rounded-2xl bg-white p-3',
      {
        '-bottom-full opacity-0': !props.show,
        'bottom-5 opacity-100': props.show
      }
    ]">
    <header v-if="props.title" class="border-b border-slate-200 pb-3">
      <h2 class="text-base yf-text-base">{{ props.title }}</h2>
    </header>
    <main class="py-3">
      <slot />
    </main>
    <footer 
      v-if="props.submit || props.close" 
      class="grid grid-cols-2 border-t border-slate-200 pt-3">
      <div class="flex justify-start items-center">
        <button 
          v-if="props.close" 
          class="yf-btn-red-circle" 
          @touchend="$emit('closeModal')">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
      <div class="flex justify-end items-center">
        <button 
          v-if="props.submit" 
          class="yf-btn-green-circle"
          @touchend="$emit('submitModal')">
          <CheckIcon class="h-6 w-6" />
        </button>
      </div>
    </footer>
  </div>
</template>
