/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('./src/images/bg.jpg')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}