import { defineStore } from 'pinia'

export const useMyLoaderStore = defineStore('myLoaderStore', {
  state: () => ({
    show: false,
  }),
  actions: {
    setLoader(value: boolean) {
      this.show = value
    }
  }
})
