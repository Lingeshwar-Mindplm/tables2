/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // This will tell Tailwind to scan all JS/JSX/TS/TSX files inside the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
