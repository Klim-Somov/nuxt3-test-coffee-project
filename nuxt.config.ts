// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
});
