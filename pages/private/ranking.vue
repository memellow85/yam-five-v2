<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useCurrent()
</script>

<template>
  <div class="px-2">
    <Wip />
  </div>
</template>