import { defineStore } from 'pinia'
import { checkPoints, getBonus, checkFinishedGame } from '~/utils'
import type { Match, Stage } from '~/classes';
import { Dices, Extra, Game, Statistics } from '~/classes'
import { Timestamp } from 'firebase/firestore'

export const useMyGameStore = defineStore('myGameStore', {
  state: () => ({
    game: false,
    finish: false,
    type: '',
    section: '',
    num_throws: 3,
    total_dices: 0,
    loading_dice_1: false,
    loading_dice_2: false,
    loading_dice_3: false,
    loading_dice_4: false,
    loading_dice_5: false,
    statistics: new Statistics(),
    dices: new Dices(),
    down: new Game('down'),
    free: new Game('free'),
    dry: new Game('dry'),
    up: new Game('up')
  }),
  getters: {
    getSpecificDiceGame: (state) => {
      return (key: string) => {
        switch (state.section) {
          case 'down':
            return state.down.match[key as keyof Match]
          case 'free':
            return state.free.match[key as keyof Match]
          case 'dry':
            return state.dry.match[key as keyof Match]
          case 'up':
            return state.up.match[key as keyof Match]
        }
      }
    },
    getSpecificValueGame: (state) => {
      return (key: string, real: boolean) => {
        let value: any
        switch (state.section) {
          case 'down':
            value = state.down.match[key as keyof Match]
            break
          case 'free':
            value = state.free.match[key as keyof Match]
            break
          case 'dry':
            value = state.dry.match[key as keyof Match]
            break
          case 'up':
            value = state.up.match[key as keyof Match]
            break
        }
        return real ? value.value : value.value === -1 ? '-' : value.value
      }
    }
  },
  actions: {
    setStartGame(value: boolean) {
      this.game = value
    },
    setTypeGame(value: string) {
      this.type = value
    },
    setBlockDiceGame(key: string, value: boolean) {
      switch (key) {
        case '1':
          this.dices.dice1.block = value
          break
        case '2':
          this.dices.dice2.block = value
          break
        case '3':
          this.dices.dice3.block = value
          break
        case '4':
          this.dices.dice4.block = value
          break
        case '5':
          this.dices.dice5.block = value
          break
      }
    },
    resetGame() {
      this.finish = false
      this.game = false
      this.type = ''
      this.section = ''
      this.num_throws = 3
      this.total_dices = 0
      this.statistics = new Statistics()
      this.dices = new Dices()
      this.down = new Game('down')
      this.free = new Game('free')
      this.dry = new Game('dry')
      this.up = new Game('up')
    },
    finishGame() {
      // const firebase = useFirebase()
      const firebaseStore = useMyFirebaseStore()
      let data: any = null
      switch (this.type) {
        case 'easy':
          data = {
            score: {
              campaign: {
                easy: firebaseStore.person?.scores.campaign.easy,
                medium: firebaseStore.person?.scores.campaign.medium,
                hard: firebaseStore.person?.scores.campaign.hard
              },
              default: {
                easy: firebaseStore.person && this.free.extra.total > firebaseStore.person?.scores.default.easy ? this.free.extra.total : firebaseStore.person?.scores.default.easy,
                medium: firebaseStore.person?.scores.default.medium,
                hard: firebaseStore.person?.scores.default.hard
              }, 
              num_game: {
                easy: firebaseStore.person ? firebaseStore.person?.scores.num_game.easy + 1 : 0,
                medium: firebaseStore.person?.scores.num_game.medium,
                hard: firebaseStore.person?.scores.num_game.hard
              }
            },
            dates: {
              deleted: firebaseStore.person?.dates.deleted,
              records: {
                easy: firebaseStore.person && this.free.extra.total > firebaseStore.person?.scores.default.easy ? Timestamp.now() : firebaseStore.person?.dates.records.easy,
                medium: firebaseStore.person?.dates.records.medium,
                hard: firebaseStore.person?.dates.records.hard
              }, 
              updated: Timestamp.now()
            },
          }
          break
        case 'medium':
          data = {
            score: {},
            dates: {},
          }
          break
        case 'hard':
          data = {
            score: {},
            dates: {},
          }
          break
      }
      console.log(data)
      // firebase.updatePerson(firebaseStore.person?.doc, data)
    },
    setSectionGame(value: string) {
      this.section = value
    },
    setValueGame(key: string) {
      let mm: number | null = null
      const dices = Object.keys(this.dices).map((d: string) => this.dices[d as keyof Dices].value)
      if (key === 'min' || key === 'max') {
        const search_key = key === 'min' ? 'max' : 'min'
        switch (this.section) {
          case 'down':
            mm = this.down.match[search_key].value
            break
          case 'free':
            mm = this.free.match[search_key].value
            break
          case 'dry':
            mm = this.dry.match[search_key].value
            break
          case 'up':
            mm = this.up.match[search_key].value
            break
        }
      }
      const result: Stage = {
        value: checkPoints(key, dices, mm),
        active: false,
        block: false
      }
      let checkUp = false
      let checkDown = false
      switch (this.section) {
        case 'down':
          this.down.extra = new Extra()
          this.down.match[key as keyof Match] = result
          this.down.extra = getBonus(this.down.extra, this.down.match)
          Object.keys(this.down.match).reverse().forEach((key: string) => {
            if (this.down.match[key as keyof Match].value === -1 && !checkDown) {
              this.down.match[key as keyof Match].active = true
              checkDown = true
            }
          })
          break
        case 'free':
          this.free.extra = new Extra()
          this.free.match[key as keyof Match] = result
          this.free.extra = getBonus(this.free.extra, this.free.match)
          break
        case 'dry':
          this.dry.extra = new Extra()
          this.dry.match[key as keyof Match] = result
          this.dry.extra = getBonus(this.dry.extra, this.dry.match)
          break
        case 'up':
          this.up.extra = new Extra()
          this.up.match[key as keyof Match] = result
          this.up.extra = getBonus(this.up.extra, this.up.match)
          Object.keys(this.up.match).forEach((key: string) => {
            if (this.up.match[key as keyof Match].value === -1 && !checkUp) {
              this.up.match[key as keyof Match].active = true
              checkUp = true
            }
          })
          break
      }
      this.dices = new Dices()
      this.num_throws = 3
      this.total_dices = 0
      this.finish = checkFinishedGame(this.type, this.down.match, this.free.match, this.dry.match, this.up.match)
      if (this.finish) {
        /**
         * TODO verificare perchè forse non serve
         */
        this.finishGame()
      }
    },
    playThrowsGame() {
      this.loading_dice_1 = true
      this.loading_dice_2 = true
      this.loading_dice_3 = true
      this.loading_dice_4 = true
      this.loading_dice_5 = true
      this.num_throws--

      // controllo attivazione e disattivazione per giocata dry
      if (this.num_throws < 2) {
        Object.keys(this.dry.match).forEach((key: string) => {
          this.dry.match[key as keyof Match].active = false
        })
      } else {
        Object.keys(this.dry.match).forEach((key: string) => {
          if (this.dry.match[key as keyof Match].value === -1) {
            this.dry.match[key as keyof Match].active = true
          }
        })
      }

      const checkFinishRandom = () => {
        if (!this.loading_dice_1 && !this.loading_dice_2 && !this.loading_dice_3 && !this.loading_dice_4 && !this.loading_dice_5) {
          this.total_dices = this.dices.dice1.value + this.dices.dice2.value + this.dices.dice3.value + this.dices.dice4.value + this.dices.dice5.value
        }
      }

      setTimeout(() => {
        this.loading_dice_1 = false
        if (!this.dices.dice1.block) {
          this.dices.dice1.value = getRandomNumber()
        }
        checkFinishRandom()
      }, getRandomNumber(10) * 100)
      setTimeout(() => {
        this.loading_dice_2 = false
        if (!this.dices.dice2.block) {
          this.dices.dice2.value = getRandomNumber()
        }
        checkFinishRandom()
      }, getRandomNumber(10) * 100)
      setTimeout(() => {
        this.loading_dice_3 = false
        if (!this.dices.dice3.block) {
          this.dices.dice3.value = getRandomNumber()
        }
        checkFinishRandom()
      }, getRandomNumber(10) * 100)
      setTimeout(() => {
        this.loading_dice_4 = false
        if (!this.dices.dice4.block) {
          this.dices.dice4.value = getRandomNumber()
        }
        checkFinishRandom()
      }, getRandomNumber(10) * 100)
      setTimeout(() => {
        this.loading_dice_5 = false
        if (!this.dices.dice5.block) {
          this.dices.dice5.value = getRandomNumber()
        }
        checkFinishRandom()
      }, getRandomNumber(10) * 100)
    }
  }
})
