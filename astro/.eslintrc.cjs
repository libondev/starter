module.exports = {
  root: true,

  reportUnusedDisableDirectives: true,

  env: {
    node: true,
    es2022: true,
    browser: true,
  },

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  extends: [
    "eslint:recommended",
    "standard-with-typescript",
    "plugin:astro/recommended",
  ],

  plugins: ['simple-import-sort', 'sort-destructure-keys'],

  overrides: [
    {
      files: ["*.astro"],
      plugins: ["astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },

    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: './tsconfig.json'
      },
    }
  ]
}
