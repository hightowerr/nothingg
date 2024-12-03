export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  typescript: {
    strict: true
  },
  nitro: {
    moduleSideEffects: ['firebase-admin/app'],
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-12-03'
})