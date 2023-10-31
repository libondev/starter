// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui'],

  colorMode: {
    preference: 'system',
    storageKey: 'fe.system.colorMode',
  },

  ui: {
    prefix: 'u',
    global: true,
    icons: ['mdi', 'solar', 'simple-icons', 'heroicons'],
    // safelistColors: ['primary']
  }
})
