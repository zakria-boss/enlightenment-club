/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EEAE13',
        secondary: '#30323B',
        tertiary: "#FC8E45",
        brown: "#5E5E5E",
      },
    },
  },
  plugins: [],
}