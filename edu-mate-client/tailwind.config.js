/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#3b82f6",
        secondary:"#",
        third:"#d8f8f2"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
