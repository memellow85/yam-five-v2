<script lang="ts" setup>
import { UserIcon, EnvelopeIcon, KeyIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { validatorEmail, validatorPassword } from '#imports'
import type { RegisterInterface } from '~/interfaces'

definePageMeta({
  layout: 'guest',
})

const { t } = useI18n()
const { onPointerDown, onPointerUp } = useTap()
const alertStore = useMyAlertStore()
const loaderStore = useMyLoaderStore()
const firebase = useFirebase()

const isFocus = ref(false)
const isValidEmail = ref(true)
const isValidConfEmail = ref(true)
const isValidPassword = ref(true)
const isValidConfPassword = ref(true)
const disabled = ref(true)
const formData: RegisterInterface = reactive({
  name: '',
  email: '',
  conf_email: '',
  password: '',
  repeat_password: ''
})

const onBlurHandler = (field: string) => {
  isFocus.value = false
  switch (field) {
    case 'email':
      isValidEmail.value = validatorEmail(formData.email) || formData.email === ''
      break
    case 'conf_email':
      isValidConfEmail.value = validatorEmail(formData.conf_email) || formData.conf_email === ''
      break
    case 'password':
      isValidPassword.value = validatorPassword(formData.password) || formData.password === ''
      break
    case 'repeat_password':
      isValidConfPassword.value = validatorPassword(formData.repeat_password) || formData.repeat_password === ''
      break
  }
  disabled.value = !(
    isValidEmail.value && isValidConfEmail.value && isValidPassword.value && isValidConfPassword.value && 
    !isFocus.value && 
    formData.email !== '' && formData.password !== '' && formData.conf_email !== '' && formData.repeat_password !== '' &&
    formData.email === formData.conf_email && formData.password === formData.repeat_password && 
    formData.name !== ''
  )
}

const showInfoPasswordHandler = () => {
  alertStore.setAlert('i', t('info_password') + '@&#36;!&#37;*?&amp;')
}

const submitHandler = async () => {
  loaderStore.setLoader(true)
  const register = await firebase.registrer(formData)
  loaderStore.setLoader(false)
  if (register && register === 'ok') {
    alertStore.setAlert('s', t('user_create'))
    setTimeout(async () => {
      await navigateTo('/')
    }, 1500)
  } else {
    alertStore.setAlert('e', register)
  }
}

watch(
  formData,
  (newValue) => {
    disabled.value = !(
      validatorEmail(newValue.email) && validatorEmail(newValue.conf_email) && validatorPassword(newValue.password) && validatorPassword(newValue.repeat_password)
    )
  },
  { deep: true },
)
</script>

<template>
  <div class="grid grid-cols-2 p-2 rounded-2xl bg-slate-200">
    <NuxtLink to="/" class="p-2 text-center yf-text-light">{{ $t('login') }}</NuxtLink>
    <p class="rounded-xl p-2 bg-slate-300 text-center yf-text-base">{{ $t('register') }}</p>
  </div>
  <div
    class="my-5 border rounded-lg divide-y divide-slate-200 border-slate-200 bg-white"
  >
    <div class="w-full relative">
      <UserIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
        v-model="formData.name"
        name="name"
        type="text"
        class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
        autocomplete="off"
        :placeholder="$t('name')"
        @focus="isFocus = true"
        @blur="onBlurHandler('name')"
      />
    </div>  
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
      />
    </div>
    <div class="w-full relative">
      <EnvelopeIcon 
        :class="[
          'antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2',
          {
            'text-slate-400': isValidConfEmail,
            'text-red-600': !isValidConfEmail
          }
        ]" />
      <input
        v-model="formData.conf_email"
        name="conf_email"
        type="text"
        class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
        autocomplete="off"
        :placeholder="$t('conf_email')"
        @focus="isFocus = true"
        @blur="onBlurHandler('conf_email')"
      />
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
        />
        <InformationCircleIcon 
          class="antialiased h-5 w-5 text-slate-400 absolute top-1/2 translate-y-[-50%] right-2 cursor-pointer" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, showInfoPasswordHandler)" />
    </div>
    <div class="w-full relative">
      <KeyIcon 
        :class="[
          'antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2',
          {
            'text-slate-400': isValidConfPassword,
            'text-red-600': !isValidConfPassword
          }
        ]" />
      <input
        v-model="formData.repeat_password"
        name="repeat_password"
        type="password"
        class="w-full h-10 rounded-b-lg pl-9 yf-input-base"
        autocomplete="off"
        :placeholder="$t('repeat_password')"
        @focus="isFocus = true"
        @blur="onBlurHandler('repeat_password')"
        />
        <InformationCircleIcon 
          class="antialiased h-5 w-5 text-slate-400 absolute top-1/2 translate-y-[-50%] right-2 cursor-pointer" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, showInfoPasswordHandler)" />
    </div>
  </div>
  <button 
    class="w-full yf-btn-primary"
    :disabled="disabled"
    @pointerdown="onPointerDown"
    @pointerup="(e) => onPointerUp(e, submitHandler)">{{ $t('register') }}</button>
  <p 
    class="
      my-2 text-center text-sm yf-text-light relative
      before:content-[' '] before:h-px before:bg-slate-200 before:w-5/12 before:block before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]
      after:content-[' '] after:h-px after:bg-slate-200 after:w-5/12 after:block after:absolute after:right-0 after:top-1/2 after:translate-y-[-50%]">
      {{ $t('or') }}
  </p>
  <NuxtLink to="/" class="w-full text-center block leading-10 yf-btn-secondary">{{ $t('login') }}</NuxtLink>
</template>
