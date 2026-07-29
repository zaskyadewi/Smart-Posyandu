/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0052CC',
          dark: '#003D99',
          light: '#E8F1FE',
          soft: '#D2E4FC',
        },
        navy: {
          DEFAULT: '#0F1B2D',
          dark: '#0B192C',
          hover: '#1A2C47',
        }
      }
    },
  },
  plugins: [],
};
