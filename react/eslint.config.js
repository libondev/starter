import antfu from '@antfu/eslint-config'
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  yaml: false,
  react: true,
  jsonc: false,
  markdown: false,
  ignores: ['*.d.ts', '.DS_Store'],
  plugins: {
    'react-compiler': eslintPluginReactCompiler,
  },
  rules: {
    // 'sort-keys/sort-keys-fix': 'error',
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react-compiler/react-compiler': 'error',
    'react-refresh/only-export-components': 'off',
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
  },
})
