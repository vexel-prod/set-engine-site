# СЭТ — ENGINEERING HUB

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=for-the-badge&logo=framer)

### Технологическая студия управления строительными рисками и энергетическими проектами.
**ООО «СЭТ» (ИНН 7720946228)** — это классический инженерный хаб. Данный проект представляет собой корпоративный портал нового поколения, выполненный в эстетике **Control Room** (Центра управления).

---

## Ключевые концепции дизайна

Проект разработан на стыке промышленного дизайна и высокопроизводительных интерфейсов:

-   **Digital Twin Aesthetic**: Интерфейс имитирует рабочее пространство инженера-координатора.
-   **Tech Mode**: Режим глубокого погружения с динамической сеткой (tech-grid) и сканирующими линиями (scanlines).
-   **Command Palette (⌘+K)**: Быстрая навигация по системе через централизованный поисковый узел.
-   **LOD 400 Standards**: Визуализация процессов ориентирована на стандарты высокой детализации BIM-моделей.

---

## Технологический стек

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router) — максимальная производительность и SEO.
-   **Library**: [React 19](https://react.dev/) — использование новейших хуков и серверных компонентов.
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — конфигурация через CSS-переменные и `@theme`.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) — "физические" переходы и интерактивные состояния.
-   **Icons**: [Lucide React](https://lucide.dev/) — чистая векторная графика.

---

## Интерактивные модули

В приложении реализованы уникальные инструменты для взаимодействия с клиентом:

1.  **Project Simulator**: Опросник для определения «цифровой зрелости» строительного объекта.
2.  **Budget Calculator**: Калькулятор для оценки стоимости инженерного контроля на основе площади и сложности.
3.  **Risk Map**: Визуальная матрица классификации рисков (P1, P2, P3) в энергетических проектах.
4.  **Process Explorer**: Анимированный таймлайн жизненного цикла объекта (от изысканий до As-built модели).

---

## Архитектура проекта

Проект следует современным стандартам организации директорий:

```
<<<<<<< HEAD
 📦app
=======
📦app
>>>>>>> bbb990cba8ac4a58707d63cfcbcbd8f02ee826fd
 ┣ 📂about
 ┃ ┗ 📜page.tsx
 ┣ 📂approach
 ┃ ┗ 📜page.tsx
 ┣ 📂contacts
 ┃ ┗ 📜page.tsx
 ┣ 📂interactives
 ┃ ┗ 📜page.tsx
 ┣ 📂privacy
 ┃ ┗ 📜page.tsx
 ┣ 📂services
 ┃ ┗ 📜page.tsx
 ┣ 📂terms
 ┃ ┗ 📜page.tsx
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx

 📦components
 ┣ 📂about
 ┃ ┗ 📜AboutContent.tsx
 ┣ 📂approach
 ┃ ┗ 📜ApproachContent.tsx
 ┣ 📂contacts
 ┃ ┗ 📜ContactForm.tsx
 ┣ 📂home
 ┃ ┗ 📜HomeContent.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useClientValue.ts
 ┣ 📂interactives
 ┃ ┗ 📜InteractivesContent.tsx
 ┣ 📂privacy
 ┃ ┗ 📜PrivacyContent.tsx
 ┣ 📂services
 ┃ ┗ 📜ServicesContent.tsx
 ┣ 📂terms
 ┃ ┗ 📜TermsContent.tsx
 ┣ 📜AppContext.tsx
 ┣ 📜Calculator.tsx
 ┣ 📜CommandPalette.tsx
 ┣ 📜Footer.tsx
 ┣ 📜Header.tsx
 ┣ 📜LayoutShell.tsx
 ┣ 📜ProcessExplorer.tsx
 ┣ 📜Providers.tsx
 ┣ 📜RiskMap.tsx
 ┣ 📜Simulator.tsx
 ┗ 📜TypingText.tsx

📦public
 ┣ 📂fonts
 ┣ 📂icons
 ┣ 📂logo
 ```

## Быстрый старт

1. Установка зависимостей

```
bun install
# или
yarn install
```

2. Запуск в режиме разработки

`npm run dev`

3. Сборка для Production

```
npm run build
npm start
```

## Юридическая информация
Проект был разработан по заказу и содержит официальные данные организации для обеспечения максимальной прозрачности:
ОГРН: 1257700108852
ИНН: 7720946228
