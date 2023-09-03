import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetIcons, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-2px'
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
    // va--2px => vertical-align: -2px
    [/^va-(.+)$/, ([, v]: string[]) => ({ 'vertical-align': v })],
    [/^rotate-y-full$/, () => ({ transform: 'rotateY(180deg)' })],
    [/^rotate-x-full$/, () => ({ transform: 'rotateX(180deg)' })],
    [/^letter-spacing-(.+)$/, ([, d]: string[]) => ({ 'letter-spacing': d })]
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
