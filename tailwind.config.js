/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        themeColor : "#18191A",
        themeColor2 : "#242526",
        pmColor : "#4cd137",
        secColor: "#44bd32"
      },
      fontFamily : {
        poppins : ["Poppins", "sans-serif"],
        montserrat : ["Montserrat", "sans-serif"]
      },
      screens: {
        'xs': {'max': '320px'},
      },
    },
  },
  plugins: [],
}

