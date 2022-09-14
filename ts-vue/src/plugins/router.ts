import type { App } from 'vue';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const routes = setupLayouts(generatedRoutes);

// eslint-disable-next-line import/no-mutable-exports
export let router: Router;

export function installRouter(app: App) {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  app.use(router);
}
