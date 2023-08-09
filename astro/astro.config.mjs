import Mdx from '@astrojs/mdx'
import Sitemap from '@astrojs/sitemap'
import Vue from '@astrojs/vue'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'
import Compress from 'astro-compress'
import UnoCSS from 'unocss/astro'

import { pwaManifest } from './scripts/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://inreasons.cn',

  integrations: [
    Mdx(),
    Vue(),
    UnoCSS(),
    Sitemap(),
    Compress(),
    AstroPWA({
      // base: '/',
      // scope: '/',
      mode: 'development',
      registerType: 'autoUpdate',
      manifest: pwaManifest,
      workbox: {
        globDirectory: 'dist',
        globPatterns: [
          // '**/*.{svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}',
          // '{about,friends}/**/*.{js,css,html,json}',
          // '{articles,snippets}/**/*.{js,css,html,json}'
          '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'
        ],
        // Don't fallback on document based (e.g. `/some-page`) requests
        // This removes an errant console.log message from showing up.
        // navigateFallback: null
        navigateFallback: '/404'
      }
      // devOptions: {
      //   enabled: true,
      //   navigateFallbackAllowlist: [/^\/404$/],
      // },
    })
  ]
})
