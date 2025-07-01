<script lang="ts" setup>
// await navigateTo('/public/login')

definePageMeta({
  layout: 'public',
})

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired');
    e.preventDefault();
    window.deferredPrompt = e;
    // ora puoi settare showInstallPrompt = true
  });
})
</script>
