<script lang="ts" setup>
import Package from '@@/package.json'

const pkg = Package
const { $pwa } = useNuxtApp()
const checkUpdate = ref(false)
const { $eventBus } = useNuxtApp()

definePageMeta({
  layout: 'public',
})

const refreshHandler = () => {
  $eventBus.emit('updateApp')
  location.reload()
}

onMounted(async () => {
  const localVersion = localStorage.getItem('yf_version')
  if (
    (localVersion === pkg.version || !localVersion) && $pwa && !$pwa.needRefresh && !$pwa.offlineReady) {
    localStorage.setItem('yf_version', pkg.version)
    await navigateTo('/public/login')
  } else {
    checkUpdate.value = true
  }
})
</script>

<template>
  <div v-if="checkUpdate" class="text-center pb-6">
    <p class="yf-text-base mb-3">{{ $t('message_update_app') }}</p>
    <button 
      class="w-full yf-btn-primary"
      @touchend="refreshHandler">{{ $t('update_app') }}</button>
  </div>
</template>