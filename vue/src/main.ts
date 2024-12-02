import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.ts'

import { initToast } from '@/composables/use-toast'

import './styles'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

initToast()
