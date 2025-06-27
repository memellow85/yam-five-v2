import type { Dices, Extra, Match } from "~/classes"

// Validazione indirizzo mail
export const validatorEmail = (email: string): boolean => {
  const regexEmail =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexEmail.test(email)
}

// Validazione password in base alle seguenti regole
// Min 8 caratteri
// Deve esserci almeno 1 numero
// Deve esserci almeno una lettera maiuscola e una minuscola
// Deve esserci almeno 1 simbolo tra @$!%*?&
export const validatorPassword = (password: string): boolean => {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regexPassword.test(password)
}

// Genera un numero random da 1 a 6
export const getRandomNumber = (limit: number = 6): number => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return (array[0] % limit) + 1
}

export const checkFinishedGame = (type: string, down: any, free: any, dry: any, up: any) => {
  let finished: boolean = false
  const finishUp: boolean = Object.keys(up).filter((v) => up[v].active).length === 0
  const finishDown: boolean = Object.keys(down).filter((v) => down[v].active).length === 0
  const finishFree: boolean = Object.keys(free).filter((v) => free[v].active).length === 0
  const finishDry: boolean = Object.keys(dry).filter((v) => dry[v].active).length === 0

  console.log(finishUp, finishDown, finishFree, finishDry)

  switch (type) {
    case 'easy':
      finished = finishFree
      break
    case 'medium':
      finished = finishFree && finishDry
      break
    case 'hard':
      finished = finishFree && finishDry && finishDown && finishUp
      break
  }
  return finished
}

const grouped = (dices: number[]) => {
  const result: any = {}

  dices.forEach((d) => {
    result[d] = (result[d] || 0) + 1
  })

  return result
}

const isPoker = (dices: number[]) => {
  const result: any = {}

  dices.forEach((d) => {
    result[d] = (result[d] || 0) + 1
  })

  for (const [val, num] of Object.entries(result)) {
    if (num === 4) {
      return {
        value: Number(val),
        total: Number(val) * 4
      }
    }
  }

  return null
}

const isFull = (dices: number[]) => {
  const result: any = {}
  let tris: number = 0
  let double: number = 0

  dices.forEach((d) => {
    result[d] = (result[d] || 0) + 1
  })

  for (const [val, num] of Object.entries(result)) {
    if (num === 3) {
      tris = Number(val)
    } else if (num === 2) {
      double = Number(val)
    }
  }

  if (tris !== 0 && double !== 0) {
    return {
      tris,
      double,
      total: tris * 3 + double * 2
    }
  }

  return null
}

const isScale = (dices: number[]) => {
  const unique = [...new Set(dices)].sort((a, b) => a - b)
  const scaleMin = [1, 2, 3, 4, 5]
  const scaleMax = [2, 3, 4, 5, 6]

  const equalTo = (target: number[]) => target.length === unique.length &&
    target.every((val, i) => val === unique[i])

  if (equalTo(scaleMin)) {
    return { type: 'min', start: 1, total: scaleMin.reduce((a, b) => a + b, 0) }
  } else if (equalTo(scaleMax)) {
    return { type: 'max', start: 2, total: scaleMax.reduce((a, b) => a + b, 0) }
  }

  return null
}

const isYam = (dices: number[]) => {
  const equal = dices.every((n: number) => n === dices[0])
  
  if (equal) {
    return {
      value: dices[0],
      total: dices[0] * 5
    }
  }

  return null
}

export const checkPoints = (element: string, dices: number[], mm: number | null) => {
  let tot: number = 0
  let totDices: number = 0

  const group = grouped(dices)
  const poker = isPoker(dices)
  const full = isFull(dices)
  const scale = isScale(dices)
  const yam = isYam(dices)

  dices.forEach((k) => {
    totDices += k
  })

  switch (element) {
    case 'one':
      tot = group['1'] ? group['1'] * 1 : 0
      break
    case 'two':
      tot = group['2'] ? group['2'] * 2 : 0
      break
    case 'three':
      tot = group['3'] ? group['3'] * 3 : 0
      break
    case 'four':
      tot = group['4'] ? group['4'] * 4 : 0
      break
    case 'five':
      tot = group['5'] ? group['5'] * 5 : 0
      break
    case 'six':
      tot = group['6'] ? group['6'] * 6 : 0
      break
    case 'eleven':
      tot = totDices <= 11 ? totDices : 0
      break
    case 'min':
      tot = mm && mm !== -1 && totDices < mm ? totDices : mm === -1 ? totDices : 0
      break
    case 'max':
      tot = mm && mm !== -1 && totDices > mm ? totDices : mm === -1 ? totDices : 0
      break
    case 'poker':
      tot = poker ? poker.total : 0
      break
    case 'full':
      tot = full ? full.total : 0
      break
    case 'scale':
      tot = scale ? scale.total : 0
      break
    case 'yam':
      tot = yam ? yam.total : 0
      break
  }
  return tot
}

export const getBonus = (extra: Extra, match: Match) => {
  Object.keys(match).forEach((key) => {
    switch (key) {
      case 'one':
        if (match.one.value > 0) {
          extra.box1 += match.one.value
        }
        break
      case 'two':
        if (match.two.value > 0) {
          extra.box1 += match.two.value
        }
        break
      case 'three':
        if (match.three.value > 0) {
          extra.box1 += match.three.value
        }
        break
      case 'four':
        if (match.four.value > 0) {
          extra.box1 += match.four.value
        }
        break
      case 'five':
        if (match.five.value > 0) {
          extra.box1 += match.five.value
        }
        break
      case 'six':
        if (match.six.value > 0) {
          extra.box1 += match.six.value
        }
        break
      case 'min':
        if (match.min.value > 0) {
          extra.box2 += match.min.value
        }
        break
      case 'max':
        if (match.max.value > 0) {
          extra.box2 += match.max.value
        }
        break
      case 'eleven':
        if (match.eleven.value > 0) {
          extra.box3 += match.eleven.value
          extra.bonus_eleven = 30
        }
        break
      case 'poker':
        if (match.poker.value > 0) {
          extra.box3 += match.poker.value
          extra.bonus_poker = 30
        }
        break
      case 'full':
        if (match.full.value > 0) {
          extra.box3 += match.full.value
          extra.bonus_full = 20
        }
        break
      case 'scale':
        if (match.scale.value > 0) {
          extra.box4 += match.scale.value
          extra.bonus_full = 40
        }
        break
      case 'yam':
        if (match.yam.value > 0) {
          extra.box4 += match.yam.value
          extra.bonus_full = 50
        }
        break
    }
  })
  if (extra.box1 > 70) {
    extra.bonus_over_70 = 30
    extra.bonus_over_60 = 0
  } else if (extra.box1 > 60) {
    extra.bonus_over_60 = 20
    extra.bonus_over_70 = 0
  }
  if (extra.box2 >= 50) {
    extra.bonus_min_max = 30
  }

  return extra
}

export const updateStatistics = (dices: Dices) => {
  
}