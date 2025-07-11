import { defineStore } from 'pinia'

export const useMyCurrentStore = defineStore('myCurrentStore', {
  state: () => ({
    title: '',
    title_origin: '',
    page: ''
  }),
  actions: {
    setTitle(value: string, origin: string) {
      this.title = value
      this.title_origin = origin
    },
    setPage(value: string | undefined) {
      this.page = value || ''
    }
  }
})
