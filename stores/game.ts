import { defineStore } from 'pinia'
import { checkPoints, getBonus, checkFinishedGame } from '~/utils'
import type { Match, Stage } from '~/classes';
import { Dices, Game, Statistics } from '~/classes'

export const useMyGameStore = defineStore('myGameStore', {
  state: () => ({
    game: false,
    finish: false,
    type: '',
    section: '',
    num_throws: 3,
    total_dices: 0,
    loading_dice: false,
    statistics: new Statistics(),
    dices: new Dices(),
    down: new Game(),
    free: new Game(),
    dry: new Game(),
    up: new Game()
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
      this.game = false
      this.type = ''
      this.section = ''
      this.num_throws = 3
      this.total_dices = 0
      this.statistics = new Statistics()
      this.dices = new Dices()
      this.down = new Game()
      this.free = new Game()
      this.dry = new Game()
      this.up = new Game()
    },
    finishGame() {},
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
      switch (this.section) {
        case 'down':
          this.down.match[key as keyof Match] = result
          this.down.extra = getBonus(this.down.extra, this.down.match)
          break
        case 'free':
          this.free.match[key as keyof Match] = result
          this.free.extra = getBonus(this.free.extra, this.free.match)
          break
        case 'dry':
          this.dry.match[key as keyof Match] = result
          this.dry.extra = getBonus(this.dry.extra, this.dry.match)
          break
        case 'up':
          this.up.match[key as keyof Match] = result
          this.up.extra = getBonus(this.up.extra, this.up.match)
          break
      }
      this.dices = new Dices()
      this.num_throws = 3
      this.total_dices = 0
      this.finish = checkFinishedGame(this.type, this.down.match, this.free.match, this.dry.match, this.up.match)
      if (this.finish) {
        this.finishGame()
      }
    },
    playThrowsGame() {
      this.loading_dice = true
      this.num_throws--
      /**
       * TODO aggiungere un random di tempo casuale diverso per tutti e 5 i dati
       */
      setTimeout(() => {
        this.loading_dice = false
        if (!this.dices.dice1.block) {
          this.dices.dice1.value = getRandomNumber()
        }
        if (!this.dices.dice2.block) {
          this.dices.dice2.value = getRandomNumber()
        }
        if (!this.dices.dice3.block) {
          this.dices.dice3.value = getRandomNumber()
        }
        if (!this.dices.dice4.block) {
          this.dices.dice4.value = getRandomNumber()
        }
        if (!this.dices.dice5.block) {
          this.dices.dice5.value = getRandomNumber()
        }
        this.total_dices = this.dices.dice1.value + this.dices.dice2.value + this.dices.dice3.value + this.dices.dice4.value + this.dices.dice5.value
      }, 700)
    }
  }
})
