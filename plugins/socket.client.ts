import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const socket: Socket = io('http://localhost:5001')

  return {
    provide: {
      socket,
    },
  }
})
