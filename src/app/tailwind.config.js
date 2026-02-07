
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./index.tsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#14b8a6',
          600: '#0d9488',
          950: '#042f2e',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
