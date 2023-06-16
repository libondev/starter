import { defineConfig } from '@unocss/vite'

import unoPresetIcons from '@unocss/preset-icons'
import unoPresetMini from '@unocss/preset-mini'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  rules: [
    // vrt--2px => vertical-align: -2px
    [/^vrt-(.+)$/, ([, v]: string[]) => ({ 'vertical-align': v })]
  ],

  presets: [
    unoPresetMini(),
    unoPresetIcons({
      extraProperties: {
        display: 'inline-block'
      }
    }) as ReturnType<typeof unoPresetMini>
  ],

  transformers: [
    // @apply text-center my-0 font-medium ↓
    // margin-top: 0rem; margin-bottom: 0rem; text-align: center; font-weight: 500;
    transformerDirectives(),

    // hover:(bg-gray-400 font-medium) font-(light mono) ↓
    // hover:bg-gray-400 hover:font-medium font-light font-mono
    transformerVariantGroup()
  ]
})
