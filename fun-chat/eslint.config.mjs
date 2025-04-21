import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: ['.build/', '.dist/'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  unicorn.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'class-methods-use-this': 'error',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '.husky/'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  prettierConfig,
  eslintPluginPrettierRecommended,
);
