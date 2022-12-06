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
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
