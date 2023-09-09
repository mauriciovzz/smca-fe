/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        bluey: '#A3CFD9',
        pinky: '#F2DCEF',
        greeny: '#B3F2BD',
      },
      boxShadow: {
        t: '0 -1px 3px  0px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.01)',
      },
    },
    screens: {
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
