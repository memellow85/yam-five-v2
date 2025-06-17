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
      link: [],
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  typescript: {
    shim: false,
  },
  modules: ['@nuxt/eslint', '@nuxtjs/device','@nuxtjs/tailwindcss','@nuxtjs/i18n'],
  i18n: {
    vueI18n: '../i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false,
    },
  }
})