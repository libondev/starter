import { createApp } from 'vue';
import { installPlugins } from './plugins';

import App from './App.vue';

import './styles/globals';

const app = createApp(App);

app.use(installPlugins);

app.mount('#app');
