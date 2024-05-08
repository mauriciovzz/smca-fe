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
        // lime-500
        active: '#84cc16',
        // yellow-400
        inactive: '#facc15',
        // red-600
        terminated: '#dc2626',

        // NODE TYPES  ------------------------------
        // sky-400
        outdoor: '#38bdf8',
        // neutral-400
        indoor: '#a3a3a3',

        // NODE Visibility  ------------------------------
        // sky-400
        public: '#38bdf8',
        // neutral-400
        private: '#a3a3a3',

        // VARIABLE TYPES  ------------------------------
        // cyan-600
        meteorological: '#0891b2',

        // green-600
        enviromental: '#16a34a',

        // COMPONENTS  ------------------------------
        // lime-400
        board: '#a3e635',
        // teal-400
        sensor: '#2dd4bf',
        // blue-400
        'rain-sensor': '#60a5fa',
        // purple-400
        camera: '#c084fc',
        // rose-400
        screen: '#fb7185',
        // zinc-400
        other: '#a1a1aa',
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
