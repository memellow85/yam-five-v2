export class Stage {
  value: number
  active: boolean
  block: boolean

  constructor () {
    this.value = -1
    this.active = true
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

  constructor() {
    this.one = new Stage()
    this.two = new Stage()
    this.three = new Stage()
    this.four = new Stage()
    this.five = new Stage()
    this.six = new Stage()

    this.min = new Stage()
    this.max = new Stage()

    this.eleven = new Stage()
    this.full = new Stage()
    this.poker = new Stage()

    this.scale = new Stage()
    this.yam = new Stage()
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

  constructor () {
    this.match = new Match()
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