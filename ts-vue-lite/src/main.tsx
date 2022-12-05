import 'uno.css'

import { RouterView } from 'vue-router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'

const app = createApp({
  setup: () => () => <RouterView />
})

app.use(createPinia())
app.use(router)

app.mount('#app')
