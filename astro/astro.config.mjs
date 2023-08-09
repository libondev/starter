import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import Mdx from "@astrojs/mdx";
import Vue from '@astrojs/vue';
import UnoCSS from 'unocss/astro'

import Sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://inreasons.cn',

  integrations: [
    Mdx(),
    Vue(),
    UnoCSS(),
    Sitemap()
  ],

  vite: {
    plugins: [
      VitePWA()
    ]
  }
});
