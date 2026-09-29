const { fixupPluginRules } = require('@eslint/compat');
const googleRules = { ...require('eslint-config-google').rules };
const prettierRules = require('eslint-config-prettier').rules;
const importPluginModule = require('eslint-plugin-import');
const reactPluginModule = require('eslint-plugin-react');
const globals = require('globals');

const importPlugin = fixupPluginRules(importPluginModule);
const reactPlugin = fixupPluginRules(reactPluginModule);

// ESLint 10 removed this legacy core rule. Keep every other Google rule.
delete googleRules['valid-jsdoc'];

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/ignore': ['vite']
    },
    rules: {
      ...reactPluginModule.configs.recommended.rules,
      ...googleRules,
      ...prettierRules,
      ...importPluginModule.configs.errors.rules,
      'require-jsdoc': 'off',
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }
];
