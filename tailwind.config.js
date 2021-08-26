const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontFamily: {
        brand: 'Expletus Sans',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
