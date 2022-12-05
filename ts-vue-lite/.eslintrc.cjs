module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-standard-with-typescript'
  ],

  ignorePatterns: [
    'index.html',
    '*.d.ts',
    'dist'
  ],

  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
