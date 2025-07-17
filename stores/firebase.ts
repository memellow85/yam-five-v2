import { defineStore } from 'pinia'
import type { Person } from '~/classes'

export const useMyFirebaseStore = defineStore('myFirebaseStore', {
  state: () => ({
    user: null as any | null,
    person: null as Person | null
  }),
  actions: {
    setUser(user: any) {
      this.user = user
      console.log('user', this.user)
    },
    setPerson(person: any) {
      this.person = person
      console.log('person', this.person)
    }
  }
})
