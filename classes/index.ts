import type { Dates, Scores } from "~/interfaces"

export class Stage {
  value: number
  active: boolean
  block: boolean

  constructor (active: boolean) {
    this.value = -1
    this.active = active
    this.block = false
  }
}

export class Match {
  one: Stage
  two: Stage
  three: Stage
  four: Stage
  five: Stage
  six: Stage
  min: Stage
  max: Stage
  eleven: Stage
  full: Stage
  poker: Stage
  scale: Stage
  yam: Stage

  constructor(type: string) {
    let defaultActive = true
    let customActive = true
    switch(type) {
      case 'down': 
      case 'up':
        defaultActive = false
        customActive = true
        break
    }
    this.one = new Stage(type === 'up' ? customActive : defaultActive)
    this.two = new Stage(defaultActive)
    this.three = new Stage(defaultActive)
    this.four = new Stage(defaultActive)
    this.five = new Stage(defaultActive)
    this.six = new Stage(defaultActive)
    this.min = new Stage(defaultActive)
    this.max = new Stage(defaultActive)
    this.eleven = new Stage(defaultActive)
    this.full = new Stage(defaultActive)
    this.poker = new Stage(defaultActive)
    this.scale = new Stage(defaultActive)
    this.yam = new Stage(type === 'down' ? customActive : defaultActive)
  }
}

export class Extra {
  box1: number
  bonus_over_60: number
  bonus_over_70: number
  box2: number
  bonus_min_max: number
  box3: number
  bonus_eleven: number
  bonus_full: number
  bonus_poker: number
  box4: number
  bonus_scale: number
  bonus_yam: number
  total: number

  constructor () {
    this.box1 = 0
    this.bonus_over_60 = 0
    this.bonus_over_70 = 0
    this.box2 = 0
    this.bonus_min_max = 0
    this.box3 = 0
    this.bonus_eleven = 0
    this.bonus_full = 0
    this.bonus_poker = 0
    this.box4 = 0
    this.bonus_scale = 0
    this.bonus_yam = 0
    this.total = 0
  }
}

export class Game {
  match: Match
  extra: Extra

  constructor (type: string) {
    this.match = new Match(type)
    this.extra = new Extra()
  }
}

export class Dice {
  value: number
  block: boolean

  constructor () {
    this.value = 0
    this.block = false
  }
}

export class Dices {
  dice1: Dice
  dice2: Dice
  dice3: Dice
  dice4: Dice
  dice5: Dice

  constructor () {
    this.dice1 = new Dice()
    this.dice2 = new Dice()
    this.dice3 = new Dice()
    this.dice4 = new Dice()
    this.dice5 = new Dice()
  }
}

export class Avatar {
  name: string
  image: string
  guest: boolean

  constructor () {
    this.name = ''
    this.image = ''
    this.guest = false
  }
}

export class Statistics {
  number_one: number

  constructor () {
    this.number_one = 0
  }
}

export class Person {
  name: string
  doc: string
  avatar: string
  help: boolean
  sound: boolean
  language: string
  user: string
  scores: Scores
  dates: Dates
  mode: string
  theme: string

  constructor (person?: Person) {
    const scores = {
      campaign: {
        easy: 0,
        medium: 0,
        hard: 0
      },
      default: {
        easy: 0,
        medium: 0,
        hard: 0
      }, 
      num_game: {
        easy: 0,
        medium: 0,
        hard: 0
      }
    }

    const dates = {
      deleted: null,
      records: {
        easy: null,
        medium: null,
        hard: null
      }, 
      updated: null
    }

    this.name = person?.name || ''
    this.doc = person?.doc || ''
    this.avatar = person?.avatar || ''
    this.help = person?.help || false
    this.sound = person?.sound || false
    this.language = person?.language || 'en'
    this.user = person?.user || ''
    this.scores = person?.scores || scores
    this.dates = person?.dates || dates
    this.mode = person?.mode || 'light'
    this.theme = person?.theme || 'green'
  }
}