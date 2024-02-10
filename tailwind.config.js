/** @type {import('tailwindcss').Config} */
const tailwindcssForms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // slate-100
        background: '#f1f5f9',
        // sky-600
        main: '#0284c7',
        // sky-700
        'main-dark': '#0369a1',
        // sky-300
        'main-alt': '#7dd3fc',
      },
      gridTemplateColumns: {
        layout: 'repeat(auto-fit, 230px);',
      },
    },
  },
  plugins: [
    tailwindcssForms,
    plugin(({ addComponents }) => {
      addComponents({
        '.small-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            'border-radius': '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            'border-radius': '5px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
