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
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
    },
  },
  compatibilityDate: '2025-05-15',
  devServer: {
    port: 5001, // default: 3000
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
    '@vite-pwa/nuxt'
  ],
  i18n: {
    vueI18n: '../i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'icons/icon192.png', 'icons/icon512.png', 'index.html'],
    manifestFilename: 'manifest.webmanifest',
    injectRegister: 'auto',
    workbox: {
      navigateFallback: '/index.html',
      navigateFallbackAllowlist: [/^\/$/],
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webmanifest}'],
    },
    manifest: {
      name: 'YamFive',
      short_name: 'YamFive',
      description: 'The dices game',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      scope: '/',
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
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
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
