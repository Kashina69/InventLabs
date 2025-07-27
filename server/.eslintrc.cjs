module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'], // Type-aware linting
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {}, // 👈 resolves ts paths
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'unused-imports/no-unused-imports': 'warn',
    'class-methods-use-this': 'off',
  },
  ignorePatterns: ['dist/', 'build/', 'node_modules/'],
};
