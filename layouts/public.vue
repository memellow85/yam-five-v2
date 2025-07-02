<script lang="ts" setup>
import Package from '@@/package.json'

const pkg = Package
const alertStore = useMyAlertStore()
const loaderStore = useMyLoaderStore()
</script>

<template>
  <div class="h-dvh w-dvw grid grid-cols-1 place-items-center overflow-hidden bg-slate-100">
    <div class="w-96 p-3 grid grid-cols-1">
      <template v-if="!loaderStore.show">
        <header>
          <h1 class="font-special text-center text-3xl yf-text-base">
            {{ $t('name_app') }}
          </h1>
        </header>
        <main class="pt-9 pb-3">
          {{ $pwa }}
          <ClientOnly>
            <div
              v-if="$pwa?.offlineReady || $pwa?.needRefresh"
              class="pwa-toast"
              role="alert"
            >
              <div class="message">
                <span v-if="$pwa.offlineReady">
                  App ready to work offline
                </span>
                <span v-else>
                  New content available, click on reload button to update.
                </span>
              </div>
              <button
                v-if="$pwa.needRefresh"
                @click="$pwa.updateServiceWorker()"
              >
                Reload
              </button>
              <button @click="$pwa.cancelPrompt()">
                Close
              </button>
            </div>
            <div
              v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
              class="pwa-toast"
              role="alert"
            >
              <div class="message">
                <span>
                  Install PWA
                </span>
              </div>
              <button @click="$pwa.install()">
                Install
              </button>
              <button @click="$pwa.cancelInstall()">
                Cancel
              </button>
            </div>
          </ClientOnly>
          <slot />
        </main>
        <footer>
          <p class="text-xs text-center yf-text-light">
            {{ $t('copyright') }} &copy; {{ new Date().getFullYear() }} - {{ $t('versions') }}:
            {{ pkg.version }}
          </p>
        </footer>
      </template>
      <Loader v-else text />

      <!-- ALERT -->
      <Alert :show="alertStore.showAlertError" :message="alertStore.message" error @close-modal="alertStore.closeAlert('e')" />
      <Alert :show="alertStore.showAlertSucces" :message="alertStore.message" success @close-modal="alertStore.closeAlert('s')" />
      <Alert :show="alertStore.showAlertWarning" :message="alertStore.message" warning @close-modal="alertStore.closeAlert('w')" />
    </div>
  </div>
</template>
