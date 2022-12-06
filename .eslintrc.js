module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 11,
    extraFileExtensions: ['.vue'],
    /* ecmaFeatures: {
      jsx: true,
    }, */
    // project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 'off',
    'comma-dangle': ['warn', 'only-multiline'],
    'arrow-parens': ['warn', 'always'],
    indent: ['off', 2, { SwitchCase: 0 }],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    'quote-props': ['warn', 'as-needed'],
    camelcase: 'off',
    'max-len': ['warn', { code: 100, ignoreStrings: true, ignoreUrls: true }],
    'operator-linebreak': ['warn', 'after'],
    'object-curly-newline': ['error', { consistent: true }],
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'array-element-newline': 'off',
    'no-trailing-spaces': 'warn',
    // iview 中关闭自闭合标签校验
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],

    // typescirpt 相关
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
  ],
};
