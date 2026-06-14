/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a',
          dark: '#1e293b',
          light: '#3b82f6',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}
