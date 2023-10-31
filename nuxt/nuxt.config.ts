// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui'],

  colorMode: {
    preference: 'system',
    storageKey: 'fe.system.colorMode',
  },

  typescript: {
    shim: false
  },

  ui: {
    prefix: 'u',
    global: true,
    icons: ['mdi', 'solar', 'simple-icons', 'heroicons'],
    // safelistColors: ['primary']
  }
})
