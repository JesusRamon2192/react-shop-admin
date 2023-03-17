/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
