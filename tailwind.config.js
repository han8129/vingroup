/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	  "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'title': '#424d54'
      }, fontFamily: {
        'Roboto' : ['Roboto', 'sans-serif'],
        'Barlow' : ['Barlow', 'sans-serif']
      }, minWidth: {
        default: '13rem'
      }, aspectRatios: {
        '3/4': '3 / 4'
      }, minHeight: {
        '6vh': '6vh'
      }
    },
  },
  plugins: [],
}
