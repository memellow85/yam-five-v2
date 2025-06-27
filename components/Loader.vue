<script lang="ts" setup>
import { getRandomNumber } from '#imports';

interface LoaderInterface {
  text?: boolean
  color?: string
}
const props = defineProps<LoaderInterface>()
</script>

<template>
  <div class="text-center">
    <div
      :class="[{
        'mb-3': props.text
      }]">
      <span 
        :class="[{
          'yf-loader-element': props.color !== 'grey',
          'yf-loader-element-grey': props.color === 'grey'
        }]">•</span>
      <span 
        :class="[{
          'yf-loader-element': props.color !== 'grey',
          'yf-loader-element-grey': props.color === 'grey'
        }]">•</span>
      <span 
        :class="[{
          'yf-loader-element': props.color !== 'grey',
          'yf-loader-element-grey': props.color === 'grey'
        }]">•</span>
    </div>
    <p v-if="props.text" class="yf-text-base text-base">
      {{ $t('loader.message_' + getRandomNumber(9)) }}
    </p>
  </div>
</template>
