module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    './.eslintrc-auto-import.json', // 必须引入 否则使用 vue api 提示报错  例： const loading = ref(false)
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
    '@typescript-eslint/no-unused-vars': 'off'
  },
	globals: {
    DialogOption: "readonly",
    OptionType: "readonly",
  },
}
