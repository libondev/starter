import antfu from '@antfu/eslint-config'

export default antfu({
  yaml: false,
  jsonc: false,
  markdown: false,
  ignores: ['*.d.ts', '.DS_Store'],
  rules: {
    // 'sort-keys/sort-keys-fix': 'error',
    'no-console': 'warn',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', { multiline: 1, singleline: 5 }],
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
  },
})
