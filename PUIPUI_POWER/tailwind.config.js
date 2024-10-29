/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "logo-cream": "rgba(244,240,237,1)", // Changed 255 to 1 for proper RGBA format
      },
    },
  },
  plugins: [],
}
