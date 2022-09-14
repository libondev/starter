require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue',
  ],
  rules: {
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': ['error', {
      ignores: ['[...all]', 'default', 'index', '404'],
    }],
    'vue/html-button-has-type': 'off',
  },
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    '*.html',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'examples',
    'playground',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vscode',
    '!.vitepress',
  ],
};
