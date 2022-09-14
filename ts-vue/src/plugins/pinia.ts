import { createPinia } from 'pinia';
import type { App } from 'vue';

export function installPinia(app: App) {
  app.use(createPinia());
}
