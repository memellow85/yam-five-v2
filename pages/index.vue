<script lang="ts" setup>
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/24/outline'
import { validatorEmail, validatorPassword } from '#imports'
import useClipboard from 'vue-clipboard3'
import Package from '@@/package.json'

definePageMeta({
  layout: 'guest',
})

interface LoginInterface {
  email: string
  password: string
  remember: boolean
}

interface RecoveryInterface {
  email: string
}

const pkg = Package
const { $pwa } = useNuxtApp()
const { onPointerDown, onPointerUp } = useTap()
const checkUpdate = ref(false)
const { $eventBus } = useNuxtApp()
const { toClipboard } = useClipboard()
const { t } = useI18n()
const alertStore = useMyAlertStore()
const loaderStore = useMyLoaderStore()
const userStore = useMyUserStore()

const recoveryMailModal = ref(false)
const guideModal = ref(false)
const isFocus = ref(false)
const isValidEmail = ref(true)
const isValidPassword = ref(true)
const disabled = ref(true)
const formData: LoginInterface = reactive({
  email: '',
  password: '',
  remember: false
})
const formDataRecovery: RecoveryInterface = reactive({
  email: ''
})

const refreshHandler = () => {
  $eventBus.emit('updateApp')
  localStorage.setItem('yf_version', pkg.version)
  location.reload()
}

const showRecoveryMailHandler = (value: boolean) => {
  recoveryMailModal.value = value
}

const showGuideModalHandler = (value: boolean) => {
  guideModal.value = value
}

const onBlurHandler = (field: string) => {
  isFocus.value = false
  if (field === 'email') {
    isValidEmail.value = validatorEmail(formData.email) || formData.email === ''
  } else {
    isValidPassword.value = validatorPassword(formData.password) || formData.password === ''
  }
  disabled.value = !(isValidEmail.value && isValidPassword.value && !isFocus.value && formData.email !== '' && formData.password !== '')
}

const copyLinkHandler = async () => {
  await toClipboard(t('text_to_copy'))
  alertStore.setAlert('s', t('message_copy'))
}

const playNoLoginHandler = async () => {
  userStore.setUser({
    name: t('guest'),
    image: '',
    guest: true
  })
  await navigateTo('/private')
}

const submitHandler = () => {
  loaderStore.setLoader(true)
  /**
   * TODO gestione reale della login
   */
  setTimeout(async () => {
    await navigateTo('/private')
  }, 5000)
}

const submitRecoveryMailHandler = () => {
  recoveryMailModal.value = false
  setTimeout(() => {
    loaderStore.setLoader(true)
    /**
     * TODO gestione reale del recovery
     */
    setTimeout(async () => {
      loaderStore.setLoader(false)
      alertStore.setAlert('s', t('sending_mail_recovery'))
      formDataRecovery.email = ''
    }, 3000)
  }, 300)
}

watch(
  formData,
  (newValue) => {
    disabled.value = !(
      validatorEmail(newValue.email) && validatorPassword(newValue.password)
    )
  },
  { deep: true },
)

onMounted(() => {
  const localVersion = localStorage.getItem('yf_version')
  if (!localVersion) {
    localStorage.setItem('yf_version', pkg.version)
  } else if(localVersion && localVersion !== pkg.version) {
    checkUpdate.value = true
  } else if(localVersion && localVersion === pkg.version) {
    if ($pwa) {
      $pwa.updateServiceWorker()
    }
  } else {
    checkUpdate.value = false
  }
})
</script>

<template>
  <div v-if="checkUpdate" class="text-center pb-6">
    <p class="yf-text-base mb-3">{{ $t('message_update_app') }}</p>
    <button 
      class="w-full yf-btn-primary"
      @pointerdown="onPointerDown"
      @pointerup="(e) => onPointerUp(e, refreshHandler)">{{ $t('update_app') }}</button>
  </div>
  <div v-else>
    <div class="grid grid-cols-2 p-2 rounded-2xl bg-slate-200">
      <p class="rounded-xl p-2 bg-slate-300 text-center yf-text-base">{{ $t('login') }}</p>
      <NuxtLink to="/public/register" class="p-2 text-center yf-text-light">{{ $t('register') }}</NuxtLink>
    </div>
    <div
      class="mt-5 border rounded-lg divide-y divide-slate-200 border-slate-200 bg-white"
    >
      <div class="w-full relative">
        <EnvelopeIcon 
          :class="[
            'antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2',
            {
              'text-slate-400': isValidEmail,
              'text-red-600': !isValidEmail
            }
          ]" />
        <input
          v-model="formData.email"
          name="email"
          type="text"
          class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('email')"
          @focus="isFocus = true"
          @blur="onBlurHandler('email')"
        >
      </div>
      <div class="w-full relative">
        <KeyIcon 
          :class="[
            'antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2',
            {
              'text-slate-400': isValidPassword,
              'text-red-600': !isValidPassword
            }
          ]" />
        <input
          v-model="formData.password"
          name="password"
          type="password"
          class="w-full h-10 rounded-b-lg pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('password')"
          @focus="isFocus = true"
          @blur="onBlurHandler('password')"
        >
      </div>
    </div>
    <div class="grid grid-cols-2 mt-1 mb-5">
      <label class="yf-checkbox-label">
        <span class="flex cursor-pointer">
          <input v-model="formData.remember" type="checkbox" class="sr-only" name="remember_me" >
          <span class="w-[14px] h-[14px] before:w-[8px] before:h-[8px] before:content-[' '] yf-checkbox-label-span"/>
        </span>
        <span class="yf-checkbox-label_span">{{ $t('remember_me') }}</span>
      </label>
      <div class="text-right">
        <a 
          href="#"
          class="text-sm underline underline-offset-2 font-bold yf-text-base-green"
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => showRecoveryMailHandler(true))">
          {{ $t('forgot_password') }}
        </a>
      </div>
    </div>
    <button 
      class="w-full yf-btn-primary" 
      :disabled="disabled"
      @pointerdown="onPointerDown"
      @pointerup="(e) => onPointerUp(e, submitHandler)">{{ $t('login') }}</button>
    <p 
      class="
        my-2 text-center text-sm yf-text-light relative
        before:content-[' '] before:h-px before:bg-slate-200 before:w-5/12 before:block before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]
        after:content-[' '] after:h-px after:bg-slate-200 after:w-5/12 after:block after:absolute after:right-0 after:top-1/2 after:translate-y-[-50%]">
        {{ $t('or') }}
    </p>
    <button 
      class="w-full yf-btn-secondary"
      @pointerdown="onPointerDown"
      @pointerup="(e) => onPointerUp(e, playNoLoginHandler)">{{ $t('play_no_login') }}</button>
    <p 
      class="
        my-2 text-center text-sm yf-text-light relative
        before:content-[' '] before:h-px before:bg-slate-200 before:w-5/12 before:block before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]
        after:content-[' '] after:h-px after:bg-slate-200 after:w-5/12 after:block after:absolute after:right-0 after:top-1/2 after:translate-y-[-50%]">
        {{ $t('or') }}
    </p>
    <div class="grid grid-cols-2">
      <a 
        href="#" 
        class="text-center text-sm underline underline-offset-2 font-bold yf-text-base"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, () => showGuideModalHandler(true))">{{ $t('guide') }}</a>
      <a 
        href="#" 
        class="text-center text-sm underline underline-offset-2 font-bold yf-text-base"
        @pointerdown="onPointerDown"
        @pointerup="(e) => onPointerUp(e, copyLinkHandler)">{{ $t('copy_link') }}</a>
    </div>

    <!-- MODAL RECOVERY MAIL -->
    <Modal 
      :show="recoveryMailModal" 
      :title="$t('recovery')" 
      close 
      submit 
      @close-modal="showRecoveryMailHandler(false)"
      @submit-modal="submitRecoveryMailHandler">
      <div class="border rounded-lg border-slate-200 bg-white">
        <div class="w-full relative">
          <EnvelopeIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
          <input
            v-model="formDataRecovery.email"
            name="email"
            type="text"
            class="w-full rounded-lg h-10 pl-9 yf-input-base"
            autocomplete="off"
            :placeholder="$t('email')"
          >
        </div>
      </div>
    </Modal>

    <!-- MODAL GUIDE -->
    <Modal 
      :show="guideModal" 
      :title="$t('menu.guide')" 
      close 
      scroll
      @close-modal="showGuideModalHandler(false)">
      <Guide />
    </Modal>
  </div>
</template>