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
  devtools: { enabled: true }
})