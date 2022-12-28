import 'uno.css'
import './styles/reset.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { RouterView } from 'vue-router'

import router from './router/index'

const app = createApp({
  setup: () => () => <RouterView />
})

app.use(createPinia())
app.use(router)

app.mount('#app')
