import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetIcons, presetMini, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetMini(),
    presetIcons({
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
      'absolute-center': 'absolute inset-0 m-auto'
    }
  ],

  rules: [
    // vrt--2px => vertical-align: -2px
    [/^vrt-(.+)$/, ([, v]: string[]) => ({ 'vertical-align': v })]
  ],

  transformers: [
    // @apply text-center my-0 font-medium ↓
    // margin-top: 0rem; margin-bottom: 0rem; text-align: center; font-weight: 500;
    // @ts-expect-error no problems!
    transformerDirectives(),

    // hover:(bg-gray-400 font-medium) font-(light mono) ↓
    // hover:bg-gray-400 hover:font-medium font-light font-mono
    // @ts-expect-error no problems!
    transformerVariantGroup()
  ]
})
