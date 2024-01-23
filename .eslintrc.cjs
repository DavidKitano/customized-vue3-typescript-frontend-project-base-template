/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    complexity: ['error', 20],
    'vue/no-unused-components': 'error', // 不允许存在未使用的组件
    '@typescript-eslint/no-unused-vars': 'error', // 不允许存在未使用的 TypeScript 变量
    'vue/multi-word-component-names': 'off', // 暂时关闭驼峰命名组件
    'no-control-regex': 0
  }
}
