import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['content/**']
    }
  },
  rules: [
    // va--2px => vertical-align: -2px
    [/^va-(.+)$/, ([, d]) => ({ 'vertical-align': d })],
    [/^rotate-y-full$/, () => ({ transform: 'rotateY(180deg)' })],
    [/^rotate-x-full$/, () => ({ transform: 'rotateX(180deg)' })],
    [/^letter-spacing-(.+)$/, ([, d]) => ({ 'letter-spacing': d })]
  ],

  // shortcuts: [
  // ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        display: 'inline-block'
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
