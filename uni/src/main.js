import 'virtual:uno.css'
import '@/styles/common.scss'
import '@/styles/global.scss'

import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './stores/init.js'
import { bootstrap } from './app/init.js'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)
  bootstrap(app)

  return {
    app,
  }
}
