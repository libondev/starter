import antfu from '@antfu/eslint-config'

export default antfu(
  { jsonc: false, markdown: false, yaml: false },
  {
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      // 'sort-keys/sort-keys-fix': 'error',
      // 'curly': ['error', 'multi-line', 'consistent'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  },
  //  {
  //    files: ['**/*.ts'],
  //    rules: {}
  //  },
)
