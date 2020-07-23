module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['prettier', 'prettier/vue', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],

    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
}
