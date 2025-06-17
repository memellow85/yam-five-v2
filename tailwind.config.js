/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': {
            opacity: 0.2,
          },
          '20%': {
            opacity: 1,
          },
        },
      },
      animation: {
        wave: 'wave 1.4s both infinite',
      },
      fontFamily: {
        special: ['Pacifico', 'cursive'],
      },
      colors: {
        yamfive: '#00A676',
        blue: '#15BDFF',
        orange: '#FB8600',
        pink: '#D10EE9',
        violet: '#7046FF',
      },
    },
  },
  plugins: [],
}
