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
      link: [
        {
          rel: 'manifest', 
          href: '/manifest.webmanifest'
        }
      ]
    },
  },
  compatibilityDate: '2025-05-15',
  dev: true,
  devServer: {
    port: 5001,
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      ENV: process.env.ENV,
      KEY_CRIPTO_PASS: process.env.KEY_CRIPTO_PASS,
    },
  },
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
    registerType: 'autoUpdate',
    manifest: {
      name: 'YamFive',
      short_name: 'YamFive',
      start_url: '/',
      display: 'standalone',
      description: 'The dices game',
      theme_color: '#f1f5f9',
      background_color: '#f1f5f9',
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
    devOptions: {
      enabled: true, // utile anche in sviluppo
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
