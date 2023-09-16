// .eslintrc.js
const process = require('node:process')

process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: [
    '@antfu/eslint-config',
  ],

  plugins: ['react-refresh'],

  rules: {
    'curly': ['error', 'all'],
  },
}
