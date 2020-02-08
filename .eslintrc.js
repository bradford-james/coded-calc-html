module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
  },
}
