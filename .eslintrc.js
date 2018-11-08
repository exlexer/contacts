module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'airbnb'
  ],
  rules: {
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-globals': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
