/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-color': '#2d2d2d',
        'canvas-color': '#f3f3f3',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
