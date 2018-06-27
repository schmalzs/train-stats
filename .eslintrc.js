module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb/base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
