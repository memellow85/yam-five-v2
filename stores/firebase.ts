import { defineStore } from 'pinia'
import type { Person } from '~/classes'

export const useMyFirebaseStore = defineStore('myFirebaseStore', {
  state: () => ({
    user: null as any | null,
    person: null as Person | null,
    auth: false,
  }),
  actions: {
    setAuth(value: boolean) {
      this.auth = value
    },
    setUser(user: any) {
      this.user = user
    },
    setPerson(person: any) {
      this.person = person
    }
  }
})
