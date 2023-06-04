module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['unicorn', 'sonarjs', 'import'],
  rules: {
    'unicorn/filename-case': 'off',
    camelcase: 'off',
    'max-len': ['error', { code: 150 }],
    'object-curly-spacing': 'off',
    'new-cap': 'off',
  },
};
