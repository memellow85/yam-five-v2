<script lang="ts" setup>
import { EnvelopeIcon, KeyIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'public',
})

const recoveryMailModal = ref(false)

const showRecoveryMail = (value: boolean) => {
  recoveryMailModal.value = value
}
</script>

<template>
  <div class="grid grid-cols-2 p-2 rounded-2xl bg-slate-200">
    <p class="rounded-xl p-2 bg-slate-300 text-center yf-text-base">{{ $t('login') }}</p>
    <NuxtLink to="/public/register" class="p-2 text-center yf-text-light">{{ $t('register') }}</NuxtLink>
  </div>
  <div
    class="mt-5 border rounded-lg divide-y divide-slate-200 border-slate-200 bg-white"
  >
    <div class="w-full relative">
      <EnvelopeIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
          name="email"
          type="text"
          class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('email')"
        />
    </div>
    <div class="w-full relative">
      <KeyIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
          name="password"
          type="password"
          class="w-full h-10 rounded-b-lg pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('password')"
        />
    </div>
  </div>
  <div class="grid grid-cols-2 mt-1 mb-5">
    <label class="yf-checkbox">
      <span class="yf-checkbox__input">
        <input type="checkbox" name="remember_me" />
        <span class="yf-checkbox__control before:content-[' '] before:block"></span>
      </span>
      <span class="yf-checkbox__label yf-text-base">
        {{ $t('remember_me') }}
      </span>
    </label>
    <div class="text-right">
      <a 
        @touchend="showRecoveryMail(true)"
        href="#"
        class="text-sm underline underline-offset-2 font-bold yf-text-base-green">
        {{ $t('forgot_password') }}
      </a>
    </div>
  </div>
  <button class="w-full yf-btn-primary">{{ $t('login') }}</button>
  <p 
    class="
      my-2 text-center text-sm yf-text-light relative
      before:content-[' '] before:h-px before:bg-slate-200 before:w-5/12 before:block before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]
      after:content-[' '] after:h-px after:bg-slate-200 after:w-5/12 after:block after:absolute after:right-0 after:top-1/2 after:translate-y-[-50%]">
      {{ $t('or') }}
  </p>
  <button class="w-full yf-btn-secondary">{{ $t('play_no_login') }}</button>
  <Modal 
    :show="recoveryMailModal" 
    :title="$t('recovery')" 
    close 
    submit 
    @close-modal="showRecoveryMail(false)">
    <div class="border rounded-lg border-slate-200 bg-white">
      <div class="w-full relative">
        <EnvelopeIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
        <input
          name="email"
          type="text"
          class="w-full rounded-lg h-10 pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('email')"
        />
      </div>
    </div>
  </Modal>
</template>
