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
  ],

  rules: {
    indent: 'off',
    'import/first': 'error',
    'no-multi-spaces': 'error',
    'no-throw-literal': 'error',
    'import/no-unresolved': 'off',
    // "n/no-missing-import": "off",
    'n/no-extraneous-import': 'off',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { code: 120, tabWidth: 2 }],
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
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: [
        'TemplateLiteral *',
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild',
        'TSTypeParameterInstantiation',
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
      ],
      offsetTernaryExpressions: true
    }]
  }
}
