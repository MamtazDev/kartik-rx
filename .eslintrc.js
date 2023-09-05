module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    jquery: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'parser': 'babel-eslint',
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'react/no-unescaped-entities': 0,
    'no-unused-vars': 0,
    'react/prop-types': 0,
  },
  'settings': {
    'react': {
      'version': 'detect',
      'no-unescaped-entities': {
        '"': '&quot;'
      }
    }
  },
  'ignorePatterns': ['src/compiled*'],
};
