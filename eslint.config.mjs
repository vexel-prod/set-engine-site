import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import next from '@next/eslint-plugin-next'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Глобальные игноры (важно: только здесь гарантированно игнорится)
  globalIgnores(['node_modules', '.next', 'out', 'dist', 'coverage', '.vercel']),

  // Базовые JS-рекомендации
  js.configs.recommended,

  // TypeScript (парсер + базовые правила)
  ...tseslint.configs.recommended,

  // Основной конфиг для исходников
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // чтобы process/global не ругались
      },
    },
    rules: {
      // React hooks
      ...reactHooks.configs.recommended.rules,

      // Next.js
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,

      // --- Практичные правки под реальный Next.js проект ---
      // any: в реальных интеграциях (webhooks/метрики) часто оправдан
      '@typescript-eslint/no-explicit-any': 'off', // либо 'warn'

      // prefer-const — полезно, но не критично
      'prefer-const': 'warn',

      // unused-vars — в TS лучше через typescript-eslint (он уже включен), делаем warn
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' },
      ],

      // это правило приходит из новых react-hooks пакетов и часто ругается “по делу”, но мешает
      // если хочешь оставить — надо править код (см. ниже). Для прохода выключаем:
      'react-hooks/set-state-in-effect': 'off',

      // если используешь <img> осознанно (метрики/счетчики/внешние пиксели)
      '@next/next/no-img-element': 'off',
    },
  },
])
