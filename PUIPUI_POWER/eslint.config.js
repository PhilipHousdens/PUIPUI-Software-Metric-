import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'], // Added TS support
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  {
    name: 'app/rules',
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': ts,
    },
    rules: {
      ...js.configs.recommended.rules, // Spread correctly
      ...pluginVue.configs['flat/essential'].rules,
      ...ts.configs.recommended.rules,
    },
  },
  skipFormatting,
];
