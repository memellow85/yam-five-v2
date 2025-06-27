<script lang="ts" setup>
definePageMeta({
  layout: 'private',
})

useCurrent()

// const languages: string[] = ['it', 'en']
// const modes: string[] = ['dynamic', 'dark', 'light']
</script>

<template>
  <div class="px-2">
    <h4>{{ $t('config.languages') }}</h4>
    <h4>{{ $t('config.modes') }}</h4>
    <h4>{{ $t('config.sound') }}</h4>
    <h4>{{ $t('config.help') }}</h4>
  </div>
</template>