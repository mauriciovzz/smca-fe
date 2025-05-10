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
        // gray-detail
        graydetails: '#e5e7eb',

        // slate-400
        neutral: '#94a3b8',

        // sky-600
        main: '#0284c7',
        // sky-700
        'main-dark': '#0369a1',
        // sky-300
        'main-alt': '#7dd3fc',

        // slate-150
        disabled: '#EDF2F7',
        enabled: '#f8fafc',

        // NODE STATES ------------------------------
        active: '#07bc0c',
        inactive: '#dc2626',

        // NODE TYPES  ------------------------------
        outdoor: '#38bdf8',
        indoor: '#a3a3a3',

        // NODE Visibility  ------------------------------
        public: '#38bdf8',
        private: '#a3a3a3',

        // VARIABLE TYPES  ------------------------------
        meteorological: '#0089e3',
        enviromental: '#00cc00',

        // COMPONENTS  ------------------------------
        board: '#005EAA',
        other: '#a1a1aa',
        sensor: '#53789E',
        camera: '#7A8DA4',

        // AQI
        aqi1: '#00E400',
        aqi2: '#FFFF00',
        aqi3: '#FF7E00',
        aqi4: '#FF0000',
        aqi5: '#8F3F97',
        aqi6: '#7E0023',

        // UVI
        uvi1: '#009900',
        uvi2: '#FFFF00',
        uvi3: '#FFA500',
        uvi4: '#FF0000',
        uvi5: '#8F3F97',
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
            height: '5px',
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
  safelist: [
    'row-span-1',
    'row-span-2',
    'row-span-3',
    'col-span-12',
    'col-span-6',
    'col-span-4',
    'col-span-3',
  ],
};
