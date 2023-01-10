/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-bg':'#22223b'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
