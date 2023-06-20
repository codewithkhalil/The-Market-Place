/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#407CCC'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

