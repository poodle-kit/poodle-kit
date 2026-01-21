import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      '.turbo/**',
      'build/**',
      'out/**',
      'storybook-static/**',
      'package-lock.json',
      'tsconfig.tsbuildinfo',
      'coverage/**',
      '*.log',
      '.DS_Store',
      'packages/eslint-config/**',
      'packages/tsconfig/**',
    ],
  },

  js.configs.recommended,

  // TS 기본 권장 세트
  ...tseslint.configs.recommended,

  // React 기본 권장 세트
  react.configs.flat.recommended,

  // 프로젝트용(추가 훅/JSX 설정)
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  // Prettier 충돌 규칙 off
  prettierConfig,
];
