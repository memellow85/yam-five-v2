export const useCurrent = () => {
  const { t } = useI18n()
  const route = useRoute();
  const currentStore = useMyCurrentStore()

  const title = route.name?.toString().split('-')[1]

  currentStore.setPage(route.name?.toString())
  currentStore.setTitle(title === 'home' ? '' : t(`menu.${title}`))

  return {}
}
