export const useCurrent = () => {
  const { t } = useI18n()
  const route = useRoute();
  const currentStore = useMyCurrentStore()

  const title = route.name?.toString().split('-')[1]
  const translate: string = !title ? '' : t(`menu.${title}`)
  const origin: string = !title ? '' : title

  currentStore.setPage(route.name?.toString())  
  currentStore.setTitle(translate, origin)

  return {}
}
