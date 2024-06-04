import antfu from '@antfu/eslint-config'

export default antfu(
  { jsonc: false, markdown: false, yaml: false },
  {
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      // 'sort-keys/sort-keys-fix': 'error',
      'curly': ['error', 'multi', 'consistent'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', { multiline: 1, singleline: 5 }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
    },
  },
  //  {
  //    files: ['**/*.ts'],
  //    rules: {}
  //  },
)
