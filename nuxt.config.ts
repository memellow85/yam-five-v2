// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height',
        },
        { name: 'theme-color', content: '#f1f5f9' },
      ],
    },
  },
  compatibilityDate: '2025-05-15',
  devServer: {
    port: 5001,
  },
  devtools: { enabled: false },
  ssr: false,
  typescript: {
    shim: false,
  },
  css: ['~/assets/main.scss'],
  modules: [
    '@pinia/nuxt', 
    '@nuxt/eslint', 
    '@nuxtjs/device',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    registerType: 'prompt',
    manifest: {
      id: 'yamfive',
      name: 'YamFive',
      short_name: 'YamFive',
      description: 'The dices game',
      theme_color: '#f1f5f9',
      background_color: '#f1f5f9',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/icon512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true, // utile anche in sviluppo
      type: 'module'
    }
  },
  i18n: {
    vueI18n: '../i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_extra.scss" as *;',
        },
      },
    },
  }
})
