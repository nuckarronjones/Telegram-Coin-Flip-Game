/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        node: 'readonly',
      },
    },
    rules: {
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
    },
  },
];
