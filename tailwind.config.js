const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      theme: 'var(--theme)',
      'theme-hover': 'var(--theme-hover)',
      'theme-secondary': 'var(--theme-secondary)',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      tertiary: 'var(--tertiary)',
      'fg-primary': 'var(--fg-primary)',
      'fg-secondary': 'var(--fg-secondary)',
      error: '#ee4242',
      success: '#539b3d',
      black: '#000000',
      white: '#ffffff'
    },
    extend: {
      backgroundImage: {
        hero: "radial-gradient(circle at center, var(--primary-faded-lg), var(--primary-faded-sm) 50%, var(--primary) 80%, var(--primary)), url('/media/images/hero.png')",
        stats: "url('/media/images/stats.png')"
      },
      animation: {
        spinner: 'spinner 2s infinite'
      },
      keyframes: {
        spinner: {
          '0%': {
            transform: 'rotate(0)'
          },
          '20%': {
            transform: 'rotate(-80deg)'
          },
          '70%': {
            transform: 'rotate(760deg)'
          },
          '80%': {
            transform: 'rotate(720deg)'
          },
          '100%': {
            transform: 'rotate(720deg)'
          }
        }
      }
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    }
  },
  plugins: []
};
