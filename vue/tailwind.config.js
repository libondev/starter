import Animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  safelist: ['dark', 'inline-block'],

  content: [
    './src/**/*.{ts,tsx,vue}',
  ],

  theme: {
  },

  plugins: [
    Animate,
  ],
}
