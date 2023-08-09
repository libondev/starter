module.exports = {
  root: true,

  env: {
    node: true,
    es2022: true,
    browser: true
  },

  parser: '@typescript-eslint/parser',
  reportUnusedDisableDirectives: true,

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'sort-destructure-keys'
  ],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:astro/recommended',
    'standard-with-typescript'
  ],

  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module'
      },
      extends: [
        'plugin:astro/recommended',
        'plugin:astro/jsx-a11y-strict'
      ],
      rules: {
        'astro/no-set-text-directive': 'error',
        'astro/no-unused-css-selector': 'error',
        'astro/prefer-class-list-directive': 'error'
      }
    }
  ]
}
