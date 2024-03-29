module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/explicit-member-accessibility": "error",
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'error',
     // 'import/no-named-as-default-member': 'off',
    'import/order': [
     'error',
     {
       groups: [
         'builtin', // Built-in imports (come from NodeJS native) go first
         'external', // <- External imports
         'internal', // <- Absolute imports
         ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
         'index', // <- index imports
         'unknown', // <- unknown
       ],
       'newlines-between': 'always',
       alphabetize: {
         /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
         order: 'asc',
         /* ignore case. Options: [true, false] */
         caseInsensitive: true,
       },
     },
    ],
  },
};
