<script lang="ts" setup>
import { 
  Bars3Icon, 
  HomeIcon, 
  CubeIcon, 
  TrophyIcon, 
  BookOpenIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Squares2X2Icon,
  UserGroupIcon,
  QueueListIcon,
  PlayIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import { 
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  TrophyIcon as TrophyIconSolid,
} from '@heroicons/vue/24/solid'

const { $eventBus } = useNuxtApp()
const { t } = useI18n()
const { onPointerDown, onPointerUp } = useTap()
const alertStore = useMyAlertStore()
const loaderStore = useMyLoaderStore()
const currentStore = useMyCurrentStore()
const gameStore = useMyGameStore()
const userStore = useMyUserStore()

const menuModal = ref(false)
const playModal = ref(false)

const goToHandler = (location: string) => {
  menuModal.value = false
  setTimeout(async () => {
    await navigateTo(`/private/${location}`)
  }, 500)
}

const showMenuHandler = (value: boolean) => {
  menuModal.value = value
}

const showPlayHandler = (value: boolean) => {
  if (!gameStore.game || gameStore.finish) {
    playModal.value = value
  } else if (gameStore.num_throws > 0) {
    gameStore.playThrowsGame()
  } else {
    /**
     * TODO alert che dice di selezionare una cella per proseguire
     */
  }
}

const endGameHandler = () => {
  showMenuHandler(false)
  gameStore.resetGame()
}

const playHandler = (level: string) => {
  gameStore.resetGame()
  showPlayHandler(false)
  gameStore.setTypeGame(level)
  gameStore.setStartGame(true)
  switch (level) {
    case 'easy':
    case 'medium':
      gameStore.setSectionGame('free')
      break
    case 'hard':
      gameStore.setSectionGame('down')
      break
  }
}

const logoutHandler = async () => {
  gameStore.resetGame()
  userStore.resetUser()
  await navigateTo('/')
}

onBeforeMount(() => {
  $eventBus.on('playEvent', showPlayHandler)
});

onUnmounted(() => {
  $eventBus.off('playEvent', showPlayHandler)
});
</script>

<template>
  <div class="h-dvh w-dvw grid grid-cols-1 overflow-hidden bg-slate-100">
    <div class="flex flex-col h-dvh">
      <template v-if="!loaderStore.show">
        <header class="py-3 px-2">
          <h1 class="font-special text-center text-2xl yf-text-base">
            {{ $t('name_app') }}
          </h1>
          <!-- TODO aggiungere icona al titolo -->
          <h2 
            v-if="currentStore.title"
            class="pb-1 mt-2 border-b border-slate-200 text-xl yf-text-base">
            {{ currentStore.title }}
          </h2>
        </header>
        <main class="flex-1 overflow-y-auto">
          <slot />
        </main>
        <div class="flex flex-row justify-around items-center p-2 rounded-3xl bg-slate-200 mx-4 mb-6">
          <!-- TODO valutare anche se mettere la scritta sotto l'icona stile tab loggato -->
          <NuxtLink to="/private">
            <HomeIcon v-if="currentStore.page !== 'private'" class="yf-text-base h-6 w-6" />
            <HomeIconSolid v-else class="yf-text-base h-6 w-6" />
          </NuxtLink>
          <NuxtLink to="/private/guide">
            <BookOpenIcon v-if="currentStore.page !== 'private-guide'" class="yf-text-base h-6 w-6" />
            <BookOpenIconSolid v-else class="yf-text-base h-6 w-6" />
          </NuxtLink>
          <div 
            :class="['flex justify-center items-center rounded-2xl p-2', {
              'bg-slate-400': gameStore.num_throws === 0,
              'bg-yamfive': gameStore.num_throws > 0,
            }]" 
            @pointerdown="onPointerDown"
            @pointerup="(e) => onPointerUp(e, () => showPlayHandler(true))">
            <CubeIcon v-if="gameStore.game && !gameStore.finish" class="antialiased h-6 w-6 text-white" />
            <PlayIcon v-else class="antialiased h-6 w-6 text-white cursor-pointer" />
          </div>
          <NuxtLink to="/private/ranking">
            <TrophyIcon v-if="currentStore.page !== 'private-ranking'" class="yf-text-base h-6 w-6" />
            <TrophyIconSolid v-else class="yf-text-base h-6 w-6" />
          </NuxtLink>
          <Bars3Icon 
            class="yf-text-base h-6 w-6 cursor-pointer" 
            @pointerdown="onPointerDown"
            @pointerup="(e) => onPointerUp(e, () => showMenuHandler(true))" />
        </div>
      </template>
      <Loader v-else text />

      <!-- MENU -->
      <Modal :show="menuModal" scroll menu @close-modal="showMenuHandler(false)">
        <div class="flex flex-col h-full">
          <div class="px-3 py-4 bg-slate-200">
            <Avatar />
            <div class="mt-3 flex justify-between items-center">
              <p class="text-base yf-text-base"><span class="font-bold">{{ $t('last_login') }}:</span> {{ userStore.last_login }}</p>
              <p class="text-base yf-text-base"><span class="font-bold">{{ $t('record') }}:</span> {{ userStore.record }}</p>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto">
            <ul class="p-3">
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('profile'))">
                <UserIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.profile') }}</h3> 
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('global'))">
                <Squares2X2Icon class="yf-text-base h-6 w-6" /> 
                <h3 class="ml-2 yf-text-base">{{ $t('menu.global') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('ranking'))">
                <TrophyIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.ranking') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('challenge'))">
                <UserGroupIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.challenge') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('statistics'))">
                <ChartBarIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.statistics') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('chat'))">
                <ChatBubbleOvalLeftEllipsisIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.chat') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('config'))">
                <CogIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.config') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('guide'))">
                <BookOpenIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.guide') }}</h3>
              </li>
              <li 
                class="flex py-3 border-b border-slate-100 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('release'))">
                <QueueListIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.release') }}</h3>
              </li>
              <li 
                class="flex py-3 cursor-pointer" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, () => goToHandler('report'))">
                <ExclamationTriangleIcon class="yf-text-base h-6 w-6" />
                <h3 class="ml-2 yf-text-base">{{ $t('menu.report') }}</h3>
              </li>
            </ul>
          </div>
          <div class="px-3 py-4">
            <div class="grid grid-cols-2 gap-3 mb-3">
              <button 
                class="w-full yf-btn-secondary" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, endGameHandler)">{{ $t('end') }}</button>
              <button 
                class="w-full yf-btn-exit" 
                @pointerdown="onPointerDown"
                @pointerup="(e) => onPointerUp(e, logoutHandler)">{{ $t('logout') }}</button>
            </div>
            <button 
              class="w-full yf-btn-primary" 
              @pointerdown="onPointerDown"
              @pointerup="(e) => onPointerUp(e, () => showMenuHandler(false))">{{ $t('close_menu') }}</button>
          </div>
        </div>
      </Modal>

      <!-- PLAY -->
       <Modal 
        :show="playModal" 
        :title="t('game.select_level')" 
        @close-modal="showPlayHandler(false)">
        <button 
          class="w-full yf-btn-secondary mb-2" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => playHandler('easy'))">{{ $t('easy') }}</button>
        <button 
          class="w-full yf-btn-secondary mb-2" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => playHandler('medium'))">{{ $t('medium') }}</button>
        <button 
          class="w-full yf-btn-secondary" 
          @pointerdown="onPointerDown"
          @pointerup="(e) => onPointerUp(e, () => playHandler('hard'))">{{ $t('hard') }}</button>
      </Modal>

      <!-- ALERT -->
      <Alert :show="alertStore.showAlertError" :message="alertStore.message" error @close-modal="alertStore.closeAlert('e')" />
      <Alert :show="alertStore.showAlertSucces" :message="alertStore.message" success @close-modal="alertStore.closeAlert('s')" />
      <Alert :show="alertStore.showAlertWarning" :message="alertStore.message" warning @close-modal="alertStore.closeAlert('w')" />
    </div>
  </div>
</template>
