module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:tailwindcss/recommended',
  ],
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
  },
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/prop-types': [0],
    'implicit-arrow-linebreak': [2, 'beside'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-boolean-value': ['never', { always: ['draggable'] }],
  },
  plugins: ['tailwindcss'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
