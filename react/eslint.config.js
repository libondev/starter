import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  jsonc: false,
  react: true,
  yaml: false,
  rules: {
    'no-console': 'warn',
    // 'react-compiler/react-compiler': 'error',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'react-refresh/only-export-components': 'off',
    // TODO
    'react/prop-types': 'off',
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
  },
  ignores: [
    'dist',
    'node_modules',
    '.output',
    '.nuxt',
    '.DS_Store',
    'index.html',
    '*.d.ts',
    'shims/imports.d.ts',
  ],
})
