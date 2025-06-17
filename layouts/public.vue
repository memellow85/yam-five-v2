<script lang="ts" setup>
import Package from '@@/package.json'
const pkg = Package
</script>

<template>
  <div>
    <header>header</header>
    <main>
      <slot />
    </main>
    <footer class="p-3">
      <p class="text-xs text-center yf-text-base">
        {{ $t('copyright') }} &copy; {{ new Date().getFullYear() }} - {{ $t('versions') }}:
        {{ pkg.version }}
      </p>
    </footer>
  </div>
</template>
