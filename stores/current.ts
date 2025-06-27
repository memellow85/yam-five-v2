import { defineStore } from 'pinia'

export const useMyCurrentStore = defineStore('myCurrentStore', {
  state: () => ({
    title: '',
    page: ''
  }),
  actions: {
    setTitle(value: string) {
      this.title = value
    },
    setPage(value: string | undefined) {
      this.page = value || ''
    }
  }
})
