import { createI18n } from 'vue-i18n';
import type { App } from 'vue';

export function installI18n(app: App) {
  const messages = Object.fromEntries(
    Object.entries(
      import.meta.glob<{ default: any }>('../../locales/*.json', { eager: true }),
    )
      .map(([key, value]) => [key.slice(14, -5), value.default]),
  );

  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  });

  app.use(i18n);
}
