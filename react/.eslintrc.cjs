module.exports = {
  root: true,

  env: {
    es2021: true,
    browser: true
  },

  extends: [
    'airbnb/base',
    // 'airbnb/whitespace',
    'standard-with-typescript'
  ],

  plugins: [
    'simple-import-sort',
    'sort-destructure-keys'
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },

  rules: {
    'import/first': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': 'off',
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
    'simple-import-sort/imports': ['error', { groups: [['^@?\\w'], ['^'], ['^\\.'], ['^\\u0000']] }],

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

    '@typescript-eslint/key-spacing': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  },

  overrides: [
    {
      files: ['*.tsx'],
      extends: [
        'airbnb/hooks',
        'airbnb/rules/react'
        // 'airbnb/rules/react-a11y'
      ],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // Link/NavLink not working
        'react/jsx-no-undef': 'off',
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-one-expression-per-line': 'off'
      }
    }
  ]
}
