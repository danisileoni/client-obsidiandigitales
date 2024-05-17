module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['love', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-useless-return': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'import/no-absolute-path': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file': off,
  },
};
