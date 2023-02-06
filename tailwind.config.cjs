/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Fantasque Sans Mono'"],
        sans: ["'Helvetica-Neue'"],
        serif: ["'Helvetica-Neue'"],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
