<script lang="ts" setup>
import Package from '@@/package.json'

const pkg = Package
const { $pwa } = useNuxtApp()
const alertStore = useMyAlertStore()
const loaderStore = useMyLoaderStore()

const installApp = ref(false)
const updateApp = ref(false)

if (!$pwa?.isPWAInstalled && !$pwa?.offlineReady) {
  installApp.value = true
}
if ($pwa?.isPWAInstalled && $pwa.needRefresh && !$pwa.offlineReady) {
  updateApp.value = true
}

const closeAlertPwa = (install: boolean) => {
  if (install) {
    installApp.value = false
    $pwa?.cancelInstall()
  } else {
    updateApp.value = false
    $pwa?.cancelPrompt()
  }
}
</script>

<template>
  <div class="h-dvh w-dvw grid grid-cols-1 place-items-center overflow-hidden bg-slate-100">
    <div class="w-96 p-3 grid grid-cols-1">
      {{ $pwa }}
      <template v-if="!loaderStore.show">
        <header>
          <h1 class="font-special text-center text-3xl yf-text-base">
            {{ $t('name_app') }}
          </h1>
        </header>
        <main class="pt-9 pb-3">        
          <slot />
        </main>
        <footer>
          <p class="text-xs yf-text-light flex justify-center items-center">
            {{ $t('copyright') }} &copy; {{ new Date().getFullYear() }} - {{ $t('versions') }}:
            {{ pkg.version }}
            <span v-if="$pwa?.offlineReady" class="block w-1.5 h-1.5 rounded-full bg-red-600 ml-2"/>
            <span v-else class="block w-1.5 h-1.5 rounded-full bg-green-600 ml-2"/>
          </p>
        </footer>
      </template>
      <Loader v-else text />

      <!-- ALERT -->
      <Alert :show="alertStore.showAlertError" :message="alertStore.message" error @close-modal="alertStore.closeAlert('e')" />
      <Alert :show="alertStore.showAlertSucces" :message="alertStore.message" success @close-modal="alertStore.closeAlert('s')" />
      <Alert :show="alertStore.showAlertWarning" :message="alertStore.message" warning @close-modal="alertStore.closeAlert('w')" />

      <Alert :show="installApp" buttons :message="$t('message_install_app')" @close-modal="closeAlertPwa(true)" @submit-modal="$pwa?.install()" />
      <Alert :show="updateApp" buttons :message="$t('message_update_app')" @close-modal="closeAlertPwa(false)" @submit-modal="$pwa?.updateServiceWorker()" />
    </div>
  </div>
</template>
