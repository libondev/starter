module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/vue3-essential',
    // './shims/.eslintrc-global.json',
    '@vue/eslint-config-standard-with-typescript'
  ],

  plugins: ['simple-import-sort', 'sort-destructure-keys'],

  ignorePatterns: [
    'index.html',
    '*.d.ts',
    'dist'
  ],

  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'object-curly-newline': ['error', { consistent: true }],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
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
    ],

    // *.vue,*.ts common rules
    '@typescript-eslint/key-spacing': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  },

  overrides: [
    {
      files: ['*.vue'],
      plugins: ['vue'],
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
        'vue/max-attributes-per-line': ['error', { singleline: 6, multiline: 1 }],
        'vue/v-on-event-hyphenation': ['error', 'always', { ignore: ['modelValue'] }]
      }
    },

    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  ]
}
