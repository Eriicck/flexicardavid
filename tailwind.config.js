/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flexigreen: '#00c283',
        flexidark: '#0f172a',
      }
    },
  },
  plugins: [],
}