const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: '#383635',
      darker: '#2a2a2a',
      darkest: '#0f0f0f',
      primary: '#ffffff',
      primaryhover: '#cccccc',
      secondary: '#bdbdbd',
      theme: '#b58863',
      themehover: '#997353',
      error: '#ee4242',
      success: '#539b3d'
    },
    extend: {
      backgroundImage: {
        hero: "radial-gradient(circle at center, #383635aa, #383635e0 50%, #383635 80%, #383635), url('/media/images/hero.png')",
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
