<script lang="ts" setup>
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

interface AlertInterface {
  show: boolean
  message: string
  warning?: boolean
  error?: boolean
  success?: boolean
}
const props = defineProps<AlertInterface>()

defineEmits(['closeModal'])
</script>

<template>
  <Modal :show="props.show" :warning="props.warning" :success="props.success" :error="props.error" @close-modal="$emit('closeModal')">
    <div class="flex justify-start items-center">
      <ExclamationCircleIcon 
        v-if="props.error" 
        class="w-5 h-5 text-red-600" />
      <InformationCircleIcon 
        v-if="props.warning" 
        class="w-5 h-5 text-yellow-600" />
      <CheckCircleIcon 
        v-if="props.success" 
        class="w-5 h-5 text-green-600" />
      <p
        :class="['ml-2 yf-text-base', 
          {
            '!text-red-600': props.error,
            '!text-yellow-600': props.warning,
            '!text-green-600': props.success
          }]">
        {{ props.message }}
      </p>
    </div>
  </Modal>
</template>
