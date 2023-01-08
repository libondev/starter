require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-standard-with-typescript'
  ],

  ignorePatterns: [
    'node_modules/*',
    'dist/*',
    'public/*',
    'vite.config.ts',
    'scripts/*'
  ],

  rules: {
    'no-duplicate-imports': ['error', { includeExports: true }],
    'object-curly-newline': ['error', { consistent: true }],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'padding-line-between-statements': ['error',
      { blankLine: 'always', next: ['block', 'block-like'], prev: ['block', 'block-like'] },
      { blankLine: 'any', next: ['case', 'default'], prev: 'case' },
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'directive' },
      { blankLine: 'any', next: 'directive', prev: 'directive' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
      { blankLine: 'always', next: ['export', 'cjs-export'], prev: '*' },
      { blankLine: 'any', next: ['export', 'cjs-export'], prev: ['export', 'cjs-export'] },
      { blankLine: 'always', next: '*', prev: ['import', 'cjs-import'] },
      { blankLine: 'any', next: ['import', 'cjs-import'], prev: ['import', 'cjs-import'] }
    ]
  }
}
