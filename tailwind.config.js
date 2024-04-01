/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      nunito: ['Nunito Sans', 'sans-serif'],
    },
    boxShadow: {
      input: '0px 2px 9px 0px rgba(0, 0, 0, 0.05)',
      header: '0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
      box: '0px 0px 7px 2px rgba(0, 0, 0, 0.03)',
      back: '0px 0px 7px 0px rgba(0, 0, 0, 0.29)',
      list: '0px 0px 4px 1px rgba(0, 0, 0, 0.10)',
    },
    screens: {
      'sm': "640px",
      'lg': "1024px",
      'xl': "1440px",
    },
    extend: {},
  },
  plugins: [],
}
