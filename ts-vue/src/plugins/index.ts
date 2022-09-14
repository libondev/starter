import type { App } from 'vue';
import { installNProgress } from './nprogress';
import { installRequest } from './request';
import { installRouter } from './router';
import { installPinia } from './pinia';
import { installI18n } from './i18n';

export function installPlugins(app: App) {
  const plugins = [
    installI18n,
    installPinia,
    installRouter,
    installRequest,
    installNProgress,
  ];

  plugins.forEach((plugin) => plugin(app));
}
