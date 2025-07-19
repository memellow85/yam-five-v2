export default defineNuxtRouteMiddleware(() => {
  const firebaseStore = useMyFirebaseStore()
  const userStore = useMyUserStore()

  if (!firebaseStore.auth && !userStore.local || firebaseStore.auth && userStore.local) {
    return navigateTo('/')
  }
})
