module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['alloy', 'alloy/typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-undef': 'off', // ts 项目本身会检测类型，所以可以关闭该规则
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
  ],
};
