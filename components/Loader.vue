<script lang="ts" setup>
import { getRandomNumber } from '#imports';

interface LoaderInterface {
  text?: boolean
}
const props = defineProps<LoaderInterface>()
</script>

<template>
  <div class="text-center">
    <div
      :class="[{
        'mb-3': props.text
      }]">
      <span class="yf-loader-element">•</span>
      <span class="yf-loader-element">•</span>
      <span class="yf-loader-element">•</span>
    </div>
    <p v-if="props.text" class="yf-text-base text-base">
      {{ $t('loader.message_' + getRandomNumber(9)) }}
    </p>
  </div>
</template>
