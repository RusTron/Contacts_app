// TODO: split for node\preload\browser sources
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    DEBUG: 'readonly',
    PACKAGE_JSON: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/no-unescaped-entities': 'off',
    'no-undef': 'off', // Handled by typescript rule
    'no-unused-vars': 'off', // Handled by typescript rule
    '@typescript-eslint/no-unused-vars': 'error',
    quotes: ['error', 'single'],
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'quote-props': ['error', 'as-needed'],
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['__tests__/**/*.*'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      plugins: ['jest'],
    },
  ],
};
