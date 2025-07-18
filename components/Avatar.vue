<script lang="ts" setup>
import { UserIcon } from '@heroicons/vue/24/outline'

interface AvatarInterface {
  person: any
}
const props = defineProps<AvatarInterface>()

const getInitials = () => {
  const splitName = props.person.name.split(' ')
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
      <UserIcon v-if="props.person.guest" class="h-6 w-6 yf-text-base !text-white" />
      <img v-else-if="!props.person.guest && props.person.image !== ''" :src="props.person.image" title="Avatar">
      <p v-else class="yf-text-base">{{ getInitials() }}</p>
    </div>
    <p class="ml-2 text-lg yf-text-base">{{ props.person.name }}</p>
  </div>
</template>
