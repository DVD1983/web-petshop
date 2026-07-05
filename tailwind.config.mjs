/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['"Baloo 2"', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#E1F5FE',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#0288D1',
          600: '#0277BD',
          700: '#01579B',
        },
        accent: {
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#E1BEE7',
          300: '#CE93D8',
        },
      },
    },
  },
  plugins: [],
};
