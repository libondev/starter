import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: false,
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      'curly': ['error', 'all'], // 'multi' , 'consistent'
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  },
  //  {
  //    files: ['**/*.ts'],
  //    rules: {}
  //  },
)
