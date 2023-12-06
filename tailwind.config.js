const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cosmic-blue': '#29ABE2',
        'cosmic-blue-10': '#ECF9FE',
        'cosmic-bright-blue': '#3DBFF5',
        'cosmic-dark-blue': '#004880',
        'cosmic-deep-blue': '#01669E',
        'cosmic-blue-lighter': '#3DBFF5',
        'cosmic-blue-link': '#007CBF',
        'cosmic-deep-purple': '#18161D',
        'cosmic-deeper-blue': '#06364A',
        'cosmic-deepest-blue': '#032636',
        'bright-teal': '#40C5DB',
        'cosmic-gray': '#D4DCF1',
        'cosmic-black': '#2C405A',
        'cosmic-nepal': '#8DABC4',
        'cosmic-fiord': '#404B6A',
        'cosmic-gray-100': '#5E6988',
        'cosmic-fade-blue': '#009393',
        'cosmic-teal-blue': '#6CEEF6',
        'cosmic-dark-teal': '#02131A',
        'cosmic-off-white': '#F8F7F9',
        'cosmic-blue-aa-text': '#007CBF',
        'cosmic-blue-aaa-text': '#006F9D',
        transparent: 'transparent',
        current: 'currentColor',
        gray: {
          50: '#F7FBFC',
          100: '#EBF2F5',
          200: '#DDEAF0',
          300: '#ABBBC2',
          400: '#879499',
          500: '#697980',
          600: '#4B5E66',
          700: '#29373D',
          800: '#182125',
          900: '#11171A',
        },
        blue: {
          10: '#ECF9FE',
          20: '#D8F2FD',
          50: '#F1F8FF',
          100: '#DBEDFF',
          200: '#C8E1FF',
          300: '#79B8FF',
          400: '#2188FF',
          500: '#0366D6',
          600: '#005CC5',
          700: '#044289',
          800: '#032F62',
          900: '#05264C',
        },
        purple: {
          50: '#F5F0FF',
          100: '#E6DCFD',
          200: '#D1BCF9',
          300: '#B392F0',
          400: '#8A63D2',
          500: '#6F42C1',
          600: '#5A32A3',
          700: '#4C2888',
          800: '#3A1D6E',
          900: '#29134E',
        },
        pink: {
          50: '#FFEEF8',
          100: '#FEDBF0',
          200: '#F9B3DD',
          300: '#F692CE',
          400: '#EC6CB9',
          500: '#EA4AAA',
          600: '#D03592',
          700: '#B93A86',
          800: '#99306F',
          900: '#6D224F',
        },
        red: {
          50: '#FFE4E4',
          100: '#FFC6C6',
          200: '#F5A8A8',
          300: '#FF8080',
          400: '#F26060',
          500: '#E23A3A',
          600: '#C82121',
          700: '#9D2323',
          800: '#710000',
          900: '#3F0000',
        },
        orange: {
          50: '#FFF4E0',
          100: '#FAEACD',
          200: '#EED6AC',
          300: '#E8C78B',
          400: '#FFAD31',
          500: '#E58A00',
          600: '#CB6100',
          700: '#AC5300',
          800: '#7B3B01',
          900: '#3D1D00',
        },
        yellow: {
          50: '#FFFBDD',
          100: '#FFF5B1',
          200: '#FFEA7F',
          300: '#FFDF5D',
          400: '#FFD33D',
          500: '#F9C513',
          600: '#DBAB09',
          700: '#B08800',
          800: '#735C0F',
          900: '#403308',
        },
        green: {
          50: '#F0FFF4',
          100: '#DCFFE4',
          200: '#BEF5CB',
          300: '#85E89D',
          400: '#34D058',
          500: '#28A745',
          600: '#22863A',
          700: '#176F2C',
          800: '#165C26',
          900: '#144620',
        },
        teal: {
          50: '#F3FFFF',
          100: '#E9FBF5',
          200: '#BEECDC',
          300: '#9AE1C9',
          400: '#69CAAA',
          500: '#21C08B',
          600: '#009987',
          700: '#008272',
          800: '#005349',
          900: '#1C332B',
        },
        white: '#FFFFFF',
        black: '#0C1013',
        'divide-color': '#EBF0F6',
        'dark-divide-color': '#1F2339',
        'light-background': '#FFFFFF',
        'dark-background': '#0C1013',
        'dark-gray': {
          900: '#F7FBFC',
          800: '#EBF2F5',
          700: '#DDEAF0',
          600: '#ABBBC2',
          500: '#879499',
          400: '#697980',
          300: '#4B5E66',
          200: '#29373D',
          100: '#182125',
          50: '#11171A',
        },
        'dark-blue': {
          900: '#F1F8FF',
          800: '#DBEDFF',
          700: '#C8E1FF',
          600: '#79B8FF',
          500: '#2188FF',
          400: '#0366D6',
          300: '#005CC5',
          200: '#044289',
          100: '#032F62',
          50: '#05264C',
        },
        'dark-purple': {
          900: '#F5F0FF',
          800: '#E6DCFD',
          700: '#D1BCF9',
          600: '#B392F0',
          500: '#8A63D2',
          400: '#6F42C1',
          300: '#5A32A3',
          200: '#4C2888',
          100: '#3A1D6E',
          50: '#29134E',
          gradient: '#8C4CFF',
        },
        'dark-pink': {
          900: '#FFEEF8',
          800: '#FEDBF0',
          700: '#F9B3DD',
          600: '#F692CE',
          500: '#EC6CB9',
          400: '#EA4AAA',
          300: '#D03592',
          200: '#B93A86',
          100: '#99306F',
          50: '#6D224F',
        },
        'dark-red': {
          900: '#FFE4E4',
          800: '#FFC6C6',
          700: '#F5A8A8',
          600: '#FF8080',
          500: '#F26060',
          400: '#E23A3A',
          300: '#C82121',
          200: '#9D2323',
          100: '#710000',
          50: '#3F0000',
        },
        'dark-orange': {
          900: '#FFF4E0',
          800: '#FAEACD',
          700: '#EED6AC',
          600: '#E8C78B',
          500: '#FFAD31',
          400: '#E58A00',
          300: '#CB6100',
          200: '#AC5300',
          100: '#7B3B01',
          50: '#3D1D00',
        },
        'dark-yellow': {
          900: '#FFFBDD',
          800: '#FFF5B1',
          700: '#FFEA7F',
          600: '#FFDF5D',
          500: '#FFD33D',
          400: '#F9C513',
          300: '#DBAB09',
          200: '#B08800',
          100: '#735C0F',
          50: '#403308',
        },
        'dark-green': {
          900: '#F0FFF4',
          800: '#DCFFE4',
          700: '#BEF5CB',
          600: '#85E89D',
          500: '#34D058',
          400: '#28A745',
          300: '#22863A',
          200: '#176F2C',
          100: '#165C26',
          50: '#144620',
        },
        'dark-teal': {
          900: '#F3FFFF',
          800: '#E9FBF5',
          700: '#BEECDC',
          600: '#9AE1C9',
          500: '#69CAAA',
          400: '#21C08B',
          300: '#009987',
          200: '#008272',
          100: '#005349',
          50: '#1C332B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
