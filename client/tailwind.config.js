/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#FFD700',
          light: '#FFF0CA',
        },
        onPrimary: {
          main: '#5B4D00',
        },
        tertiary: {
          main: '#005246',
        },
        secondary: {
          main: '#B5A26D',
        },
        text: {
          main: '3A1500',
        },
      },
      screens: {
        '6xl': '1150px',
      },
    },
  },
  plugins: [],
};
