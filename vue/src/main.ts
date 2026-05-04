import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import { setupI18n } from './app/i18n.ts'
import { router } from './router/index.ts'
import './styles'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.use(pinia)
  app.use(router)

  await setupI18n(app)

  app.mount('#app')
}

void bootstrap()
