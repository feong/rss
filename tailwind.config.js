/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        scaleIn: {
          '0%': { transform: '0%' },
          '100%': { width: '100%' }
        },
        scaleOut: {
          '0%': { width: '24rem' },
          '100%': { width: 0 }
        },
      },
      animation: {
        scaleIn: 'scaleIn 1s ease-in-out',
        scaleOut: 'scaleOut 1s ease-in-out',
      }
    },
  },
  plugins: [],
};
