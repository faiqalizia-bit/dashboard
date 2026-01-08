/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c2410c",   // orange-700
        secondary: "#000000", // black
        neutral: "#ffffff",   // white
      }
    },
  },
  plugins: [],
}

