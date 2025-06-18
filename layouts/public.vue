<script lang="ts" setup>
import Package from '@@/package.json'
const pkg = Package
</script>

<template>
  <div class="h-dvh w-dvw grid grid-cols-1 place-items-center overflow-hidden bg-slate-100">
    <div class="w-96 p-3 grid grid-cols-1">
      <header>
        <h1 class="font-special text-center text-3xl yf-text-base">
          {{ $t('name_app') }}
        </h1>
      </header>
      <main class="pt-9 pb-3">
        <slot />
      </main>
      <footer>
        <p class="text-xs text-center yf-text-light">
          {{ $t('copyright') }} &copy; {{ new Date().getFullYear() }} - {{ $t('versions') }}:
          {{ pkg.version }}
        </p>
      </footer>
    </div>
  </div>
</template>
