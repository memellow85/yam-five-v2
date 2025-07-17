import { defineStore } from 'pinia'

export const useMyAlertStore = defineStore('myAlertStore', {
  state: () => ({
    showAlertError: false,
    showAlertWarning: false,
    showAlertSucces: false,
    message: '',
    timerHideAlert: 6000
  }),
  actions: {
    closeAlert(type: string) {
      switch (type) {
        case 'w':
          this.showAlertWarning = false
          break
        case 's':
          this.showAlertSucces = false
          break
        case 'e':
          this.showAlertError = false
          break
      }
    },
    setAlert(type: string, msg: string) {
      this.message = msg
      switch (type) {
        case 'w':
          this.showAlertWarning = true
          break
        case 's':
          this.showAlertSucces = true
          break
        case 'e':
          this.showAlertError = true
          break
      }
      setTimeout(() => {
        switch (type) {
          case 'w':
            this.showAlertWarning = false
            break
          case 's':
            this.showAlertSucces = false
            break
          case 'e':
            this.showAlertError = false
            break
        }
      }, this.timerHideAlert)
    }
  }
})
