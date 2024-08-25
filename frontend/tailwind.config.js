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
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "background-color": "var(--background-color)",
        "accent-color": "var(--accent-color)",
        "highlight-color": "var(--highlight-color)",

      },
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          // '25%': { opacity: '0.5' },
          '50%': { opacity: '0' },
          // '75%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        rotateImage: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(45deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-45deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        cursor: 'blink 1s infinite',
        rotate: 'rotateImage 5s linear infinite',
      },
    },
  },
  plugins: [],
}
