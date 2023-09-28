import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['.DS_Store', '*.d.ts'],
    rules: {
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
  //  {
  //    files: ['**/*.ts'],
  //    rules: {}
  //  },
)
