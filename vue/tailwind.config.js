import PxdPreset from 'pxd/tailwind.config'
import Animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  safelist: ['dark', 'inline-block'],

  content: [
    './src/**/*.{ts,tsx,vue}',
    './node_modules/pxd/dist/components/**/*.js',
  ],

  presets: [
    PxdPreset,
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [
    Animate,
  ],
}
