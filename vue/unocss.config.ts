import { defineConfig } from '@unocss/vite'

import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-mini'

export default defineConfig({
  rules: [
    // vrt--2px => vertical-align: -2px
    [/^vrt-(.+)$/, ([, v]: string[]) => ({ 'vertical-align': v })]
  ],

  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block'
      }
    }) as ReturnType<typeof presetUno>,
    presetAttributify() as ReturnType<typeof presetUno>
  ]
})
