import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs'
    ]
  },

  // Base configuration for all JS/TS files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  // JavaScript recommended rules
  pluginJs.configs.recommended,

  // TypeScript configuration
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }]
    }
  },

  // React configuration
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // React recommended rules
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,

      // Custom React rules
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/jsx-uses-react': 'off', // Not needed with React 17+ JSX transform
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-sort-props': [
        'error',
        { callbacksLast: true, shorthandFirst: true }
      ],
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'error',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn'
    }
  },

  // Server-side files (Node.js environment)
  {
    files: ['server/**/*.{js,mjs,ts}', '*.config.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off' // Allow console in server files
    }
  },

  // Prettier integration (must be last)
  eslintPluginPrettierRecommended,

  // Custom rules for the entire project
  {
    rules: {
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-computed-key': 'error',
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'spaced-comment': ['error', 'always', { markers: ['/'] }]
    }
  }
];
