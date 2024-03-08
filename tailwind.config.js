/** @type {import('tailwindcss').Config} */
const tailwindcssForms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        // UI COLORS ------------------------------
        // slate-100
        background: '#f1f5f9',

        // sky-600
        main: '#0284c7',
        // sky-700
        'main-dark': '#0369a1',
        // sky-300
        'main-alt': '#7dd3fc',

        // slate-150
        disabled: '#EDF2F7',
        // slate-50
        enabled: '#f8fafc',

        // NODE STATES ------------------------------
        // green-600
        activo: '#16a34a',
        // green-700
        'activo-dark': '#15803d',

        // yellow-400
        inactivo: '#facc15',
        // yellow-500
        'inactivo-dark': '#eab308',

        // red-600
        terminado: '#dc2626',
        // red-700
        'terminado-dark': '#b91c1c',

        // NODE TYPES  ------------------------------
        // sky-400
        outdoor: '#38bdf8',
        // sky-500
        'outdoor-dark': '#0ea5e9',

        // stone-500
        indoor: '#78716c',
        // stone-600
        'indoor-dark': '#57534e',

        // VARIABLE TYPES  ------------------------------
        // cyan-600
        meteorological: '#0891b2',

        // emerald-600
        enviromental: '#059669',

        // COMPONENTS  ------------------------------  ------------------------------
        board: '#9DB28C',
        sensor: '#C8C8C7',
        camera: '#8F8D8E',
        screen: '#A3A6B5',
        other: '#A89A8E',
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
