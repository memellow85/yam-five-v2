<script lang="ts" setup>
import { ExclamationCircleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

interface AlertInterface {
  show: boolean
  message: string
  info?: boolean
  warning?: boolean
  error?: boolean
  success?: boolean
  buttons?: boolean
}
const props = defineProps<AlertInterface>()

defineEmits(['closeModal', 'submitModal'])
</script>

<template>
  <Modal 
    :show="props.show" 
    :warning="props.warning" 
    :info="props.info"
    :success="props.success" 
    :error="props.error" 
    :close="props.buttons"
    :submit="props.buttons"
    @close-modal="$emit('closeModal')"
    @submit-modal="$emit('submitModal')">
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
        v-if="!props.info"
        :class="['ml-2 yf-text-base', 
          {
            '!text-red-600': props.error,
            '!text-yellow-600': props.warning,
            '!text-green-600': props.success
          }]">
        {{ props.message }}
      </p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-else class="yf-text-base" v-html="props.message" />
    </div>
  </Modal>
</template>
