module.exports = {
  env: {
    'node': true,
    'browser': true,
  },
  plugins: ['react'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 9,
    'sourceType': 'module',
    'allowImportExportEverywhere': true,
  },
  rules: {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'warn',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'no-multiple-empty-lines': 'error',
    'array-bracket-newline': ['error', 'consistent'],
    'no-eval': 'error',
    'max-len': [1, 100, 2, {ignoreComments: true}],
    'react/jsx-uses-react': 'error',   
    'react/jsx-uses-vars': 'error' ,
  },
};
