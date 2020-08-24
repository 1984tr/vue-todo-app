module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser : 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'prefer-const':'error',
    'no-var':'error',
    'prefer-template': 'error',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop':'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 4,
      'multiline': {
        'max': 4,
        'allowFirstLine': true
      }
    }], 
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': ['error', {multiline: 'never'}],
    'vue/component-name-in-template-casing':['error', 'PascalCase', { 'ignores': [] }],
    'standard/array-bracket-even-spacing':["error", "never"]
  }
}
