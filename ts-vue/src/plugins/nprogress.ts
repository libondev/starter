import NProgress from 'nprogress';
import { router } from './router';

export function installNProgress() {
  if (!router) return;

  router.beforeEach((to, from) => {
    if (to.path === from.path) return;

    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
