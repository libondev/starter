import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'

// global styles
import './styles'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
