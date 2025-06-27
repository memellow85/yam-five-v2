<script lang="ts" setup>
import { UserIcon } from '@heroicons/vue/24/outline'

const userStore = useMyUserStore()

const getInitials = () => {
  const splitName = userStore.avatar.name.split(' ')
  if (splitName.length === 1) {
    return splitName[0].substring(0, 1).toLocaleUpperCase()
  } else if (splitName.length === 2) {
    return `${splitName[0].substring(0, 1).toLocaleUpperCase()}${splitName[1].substring(0, 1).toLocaleUpperCase()}`
  } else {
    return `${splitName[0].substring(0, 1).toLocaleUpperCase()}${splitName[splitName.length - 1].substring(0, 1).toLocaleUpperCase()}`
  }
}
</script>

<template>
  <div class="flex items-center">
    <div class="rounded-full w-10 h-10 flex justify-center items-center bg-slate-400">
      <UserIcon v-if="userStore.avatar.guest" class="h-6 w-6 yf-text-base !text-white" />
      <img v-else-if="!userStore.avatar.guest && userStore.avatar.image !== ''" src="" title="">
      <p v-else class="yf-text-base">{{ getInitials() }}</p>
    </div>
    <p class="ml-2 text-lg yf-text-base">{{ userStore.avatar.name }}</p>
  </div>
</template>
