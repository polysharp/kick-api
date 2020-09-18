module.exports = {
  env: {
    es6: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': ['error', { allow: ['_', '_id'] }],
    'no-console': 0
  }
};
