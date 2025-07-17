import { defineStore } from 'pinia'
import { Avatar } from '~/classes'

export const useMyUserStore = defineStore('myUserStore', {
  state: () => ({
    avatar: new Avatar(),
    last_login: '-',
    record: 0,
    local: false
  }),
  actions: {
    setLocalUsed(value: boolean) {
      this.local = value
    },
    setUser(value: Avatar) {
      this.avatar = value
    },
    resetUser() {
      this.avatar = new Avatar()
      this.last_login = '-'
      this.record = 0
    }
  }
})
