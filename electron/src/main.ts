import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/global.css'

void createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
