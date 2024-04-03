module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'kashin-fsd-plugin',
    'unused-imports',
  ],
  rules: {
    // indent: [
    //   "error",
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],
    // "react/jsx-indent": ["error", 2],
    // "react/jsx-indent-props": ["error", 2],
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'as',
          'tag',
          'role',
          'data-testid',
          'to',
          'target',
          'justify',
          'align',
          'direction',
          'gap',
          'borderRadius',
          'feature',
          'color',
          'variant',
        ],
      },
    ],
    'max-len': ['error', { ignoreComments: true, code: 125 }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'kashin-fsd-plugin/path-checker': ['error', { alias: '@' }],
    'kashin-fsd-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/StoreDecorator.tsx',
          '**/*.mock.*',
        ],
      },
    ],
    'kashin-fsd-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing', '**/*.mock.*'],
      },
    ],
    'prefer-arrow-callback': 'off',
    'jsx-a11y/no-autofocus': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/app/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/pages/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/widgets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/shared/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**.module.*',
            group: 'sibling',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        distinctGroup: false,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    'react/no-unstable-nested-components': 'warn',
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
