import type { Timestamp } from "firebase/firestore"

export interface RegisterInterface {
  name: string
  email: string
  conf_email: string
  password: string
  repeat_password: string
}

export interface RecoveryInterface {
  email: string
}

export interface LoginInterface {
  email: string
  password: string
  remember: boolean
}

export interface LevelNum {
  easy: number
  medium: number
  hard: number
}

export interface LevelDate {
  easy: Timestamp | null
  medium: Timestamp | null
  hard: Timestamp | null
}

export interface Scores {
  campaign: LevelNum
  default: LevelNum 
  num_game: LevelNum
}

export interface Dates {
  deleted: Timestamp | null
  records: LevelDate
  updated: Timestamp | null
}
