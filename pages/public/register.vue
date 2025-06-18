<script lang="ts" setup>
import { UserIcon, EnvelopeIcon, KeyIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'public',
})
</script>

<template>
  <div class="grid grid-cols-2 p-2 rounded-2xl bg-slate-200">
    <NuxtLink to="/public/login" class="p-2 text-center yf-text-light">{{ $t('login') }}</NuxtLink>
    <p class="rounded-xl p-2 bg-slate-300 text-center yf-text-base">{{ $t('register') }}</p>
  </div>
  <div
    class="my-5 border rounded-lg divide-y divide-slate-200 border-slate-200 bg-white"
  >
    <div class="w-full relative">
      <UserIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
          name="name"
          type="text"
          class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('name')"
        />
    </div>  
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
      <EnvelopeIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
          name="conf_email"
          type="text"
          class="w-full rounded-t-lg h-10 pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('conf_email')"
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
    <div class="w-full relative">
      <KeyIcon class="antialiased h-5 w-5 absolute top-1/2 translate-y-[-50%] left-2 text-slate-400" />
      <input
          name="repeat_password"
          type="password"
          class="w-full h-10 rounded-b-lg pl-9 yf-input-base"
          autocomplete="off"
          :placeholder="$t('repeat_password')"
        />
    </div>
  </div>
  <button class="w-full yf-btn-primary">{{ $t('register') }}</button>
  <p 
    class="
      my-2 text-center text-sm yf-text-light relative
      before:content-[' '] before:h-px before:bg-slate-200 before:w-5/12 before:block before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]
      after:content-[' '] after:h-px after:bg-slate-200 after:w-5/12 after:block after:absolute after:right-0 after:top-1/2 after:translate-y-[-50%]">
      {{ $t('or') }}
  </p>
  <NuxtLink to="/public/login" class="w-full text-center block leading-10 yf-btn-secondary">{{ $t('login') }}</NuxtLink>
</template>
