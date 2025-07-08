import mitt from 'mitt';
import { defineNuxtPlugin } from '#app';

// Plugin per la gestione degli eventi all'interno dell'applicazione
export default defineNuxtPlugin(() => {
  type Events = {
    playEvent: boolean
    updateApp: void
  };

  const eventBus = mitt<Events>();

  return {
    provide: {
      eventBus: eventBus,
    },
  };
});
