/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jamaica: {
          gold: '#FED100',
          green: '#007847',
          black: '#000000'
        }
      }
    },
  },
  plugins: [],
}

