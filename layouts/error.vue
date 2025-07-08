<script lang="ts" setup>
interface ErrorInterface {
  error: any
}

const props = defineProps<ErrorInterface>()
</script>

<template>
  <div>
    <h1>{{ props.error.statusCode === 404 ? '404' : 'Other' }}</h1>
    <p>{{ props.error.message }}</p>
    <NuxtLink to="/">Torna alla home</NuxtLink>
  </div>
</template>
