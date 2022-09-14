import { createApp } from 'vue';
import { createPlugins } from './plugins';

import App from './App.vue';

import './styles/globals';

const app = createApp(App);

app.use(createPlugins);

app.mount('#app');
