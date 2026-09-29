const googleRules = { ...require('eslint-config-google').rules };
const prettierRules = require('eslint-config-prettier').rules;
const globals = require('globals');

// ESLint 10 removed this legacy core rule. Keep every other Google rule.
delete googleRules['valid-jsdoc'];

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      ...googleRules,
      ...prettierRules,
      'new-cap': 'off',
      'require-jsdoc': 'off'
    }
  }
];
