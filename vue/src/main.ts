import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { setupI18n } from './app/i18n.ts'
import { router } from './router/index.ts'
import './styles'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  setupI18n(app)

  app.mount('#app')
}

bootstrap()
