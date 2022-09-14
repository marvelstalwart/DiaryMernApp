/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255, 0.17",
      },
      animation: {
        bounce: 'bounce 2.3s ',
        fadeIn: 'fade 0.5s ',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: '0%',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1,1)',
          },
          '100%' : {
            opacity: '1'
          }
        }
      }
    },
    theme: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      }
    }
  },
  plugins: []
}
