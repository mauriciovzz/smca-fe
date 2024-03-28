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
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'tailwindcss/no-custom-classname': [1, { whitelist: ['wi', 'wi-na'] }],
    'react/no-unstable-nested-components': [1, { allowAsProps: true }],
    'react/jsx-props-no-spreading': [0],
    'no-param-reassign': [2, { props: false }],
    'no-unused-expressions': [1, { allowTernary: true }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
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
