module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      extends: ['xo-typescript'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/object-curly-spacing': 'off',
        'new-cap': 'off',
        'no-template-curly-in-string': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 0,
        'array-callback-return': 0,
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
      },
    },
  ],
  extends: ['xo', 'prettier'],
  plugins: ['simple-import-sort'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/indent': 0,
    'no-constant-binary-expression': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
