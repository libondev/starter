import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      'curly': ['error', 'multi', 'consistent'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
      'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  },
  //  {
  //    files: ['**/*.ts'],
  //    rules: {}
  //  },
)
