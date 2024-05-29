import antfu from '@antfu/eslint-config'
import globals from './scripts/eslint-globals.mjs'

export default antfu(
  globals,
  {
    ignores: ['*.d.ts', '.DS_Store', '**/*.json', 'src/uni_modules'],
    rules: {
      'curly': ['error', 'all'],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/max-attributes-per-line': ['error', { multiline: 1, singleline: 5 }],
      'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  },
)
