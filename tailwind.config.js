/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./client/src/**/*.{js,jsx}'],
  theme: {
    extend: {

      fontFamily: {
        sans: ["Source Code Pro", 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
