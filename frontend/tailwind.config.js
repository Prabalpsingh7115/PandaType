/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['Jaini Purva', "sans-serif"],
        // Add more custom font families as needed
      },
      keyframes:{
        blink:{
          '0%':{opacity:'100'},
          '25%':{opacity:'50'},
          '50%':{opacity:'0'},
          '75%':{opacity:'50'},
          '10%':{opacity:'100'},
        }
      },
      animation:{
        'cursor':'blink 1s infinite'
      },
    },
  },
  plugins: [],
}