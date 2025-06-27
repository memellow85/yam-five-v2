import mitt from 'mitt';
import { defineNuxtPlugin } from '#app';

// Plugin per la gestione degli eventi all'interno dell'applicazione
export default defineNuxtPlugin(() => {
  const eventBus = mitt();

  return {
    provide: {
      eventBus: eventBus,
    },
  };
});
