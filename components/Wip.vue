<script lang="ts" setup>
import { CodeBracketIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="w-full text-center py-6">
    <CodeBracketIcon class="h-7 w-7 yf-text-base m-auto" />
    <p class="text-base yf-text-base">{{ $t('wip') }}</p>
  </div>
</template>