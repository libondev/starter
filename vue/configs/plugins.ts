import type { ConfigEnv } from 'vite'

import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Tailwind from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import JSX from '@vitejs/plugin-vue-jsx'
import GdsiResolver from '@gdsicon/vue/resolver'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Router from 'unplugin-vue-router/vite'
// z-lazy-show/v-show.lazy
import { transformLazyShow } from 'v-lazy-show'
import Layouts from 'vite-plugin-vue-meta-layouts'
import PxdResolver from 'pxd/resolver'

import { iconCollections } from './icons'

const __dirname = fileURLToPath(new URL('../', import.meta.url))

const extensions = ['vue', 'tsx']

export function pluginsConfig({ command }: ConfigEnv) {
  return [
    // router must be before vue
    Router({
      routesFolder: [
        {
          path: '',
          src: 'src/views',
        },
      ],
      routeBlockLang: 'yaml',
      dts: command === 'build' ? false : 'src/types/typed-router.d.ts',
      extensions: extensions.map((ext) => `.${ext}`),
      exclude: [
        '**/*/apis/**/*',
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],
      pathParser: {
        // `users.[id]` -> `users/:id`
        dotNesting: true,
      },
    }),

    Tailwind(),

    JSX(),

    Vue({
      template: {
        compilerOptions: {
          nodeTransforms: [transformLazyShow],
        },
      },
    }),

    Layouts({
      target: 'src/layouts',
      defaultLayout: 'default',
      skipTopLevelRouteLayout: true,
      excludes: ['/components/**/*'],
    }),

    AutoImport({
      dirs: ['./src/composables/**'],
      imports: ['vue', 'vue-i18n', VueRouterAutoImports],
      // resolvers: [],
      dts: command === 'build' ? false : './src/types/auto-imports.d.ts',
      // include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    }),

    Components({
      dts: command === 'build' ? false : './src/types/components.d.ts',
      extensions,
      resolvers: [
        PxdResolver(),
        // 图标自动导入(依赖或者本地)
        IconsResolver({
          // 如果图标组比较长可以设置得简短点
          alias: {},
          customCollections: Object.keys(iconCollections),
        }),
        GdsiResolver({ prefix: 'IGds' }),
      ],
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),

    Icons({
      scale: 1,
      compiler: 'vue3',
      autoInstall: true,
      defaultClass: 'inline-block svg-icon',
      // defaultStyle: '',
      customCollections: iconCollections,
      // 仅修改自定义svg图标
      // transform(svg, _collection, _icon) {
      //   return svg
      // },
    }),

    VueI18n({
      runtimeOnly: true,
      fullInstall: false,
      compositionOnly: true,
      defaultSFCLang: 'yaml',
      include: [resolve(__dirname, 'locales/*.yaml')],
    }),
  ]
}
