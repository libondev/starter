import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  jsonc: false,
  react: true,
  yaml: false,
  rules: {
    'no-console': 'warn',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'react-refresh/only-export-components': 'off',
    // TODO
    'react/prop-types': 'off',
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
  },
})
