module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/multi-word-component-names': 'off'
  },
  globals: {
    navigator: 'readonly',
    localStorage: 'readonly'
  }
}
