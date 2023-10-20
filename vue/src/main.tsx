import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { RouterView } from 'vue-router'

import router from './router/index'

// global styles
import './styles'

const app = createApp(<RouterView />)

app.use(createPinia())
app.use(router)

app.mount('#app')
