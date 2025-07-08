<script setup lang="ts">
import type { NuxtError } from '#app'
import Package from '@@/package.json'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})

const pkg = Package
const { onPointerDown, onPointerUp } = useTap()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="h-dvh w-dvw grid grid-cols-1 place-items-center overflow-hidden bg-slate-100">
    <div class="w-96 p-3 grid grid-cols-1">
      <header class="mb-20">
        <h1 class="font-special text-center text-3xl yf-text-base">
          {{ $t('name_app') }}
        </h1>
      </header>
      <h2 class="text-center text-5xl yf-text-base">{{ props.error?.statusCode }}</h2>
      <p 
        v-if="props.error?.statusCode === 404" 
        class="text-center text-lg yf-text-base mt-4 mb-10">{{ $t('error_404') }}</p>
      <p 
        v-if="props.error?.statusCode === 403" 
        class="text-center text-lg yf-text-base">{{ $t('error_403') }}</p>
      <p 
        v-if="props.error?.statusCode !== 404 && props.error?.statusCode !== 403"
        class="text-center text-lg yf-text-base">{{ $t('error_other') }}</p>
      <button 
        class="yf-btn-primary w-fit px-6 m-auto"  
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, handleError)">{{ $t('go_to_home') }}</button>
      <footer class="mt-20">
        <p class="text-xs yf-text-light flex justify-center items-center">
          {{ $t('copyright') }} &copy; {{ new Date().getFullYear() }} - {{ $t('versions') }}:
          {{ pkg.version }}
          <span v-if="$pwa?.offlineReady" class="block w-1.5 h-1.5 rounded-full bg-red-600 ml-2"/>
          <span v-else class="block w-1.5 h-1.5 rounded-full bg-green-600 ml-2"/>
        </p>
      </footer>
    </div>
  </div>
</template>
