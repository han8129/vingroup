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
      }, aspectRatios: {
        '3/4': '3 / 4'
      }, minHeight: {
        '6vh': '6vh'
      }, minWidth: {
        '25vw': '25vw',
        '33vw': '33vw',
        '66vw': '66vw',
        default: '13rem'
      }
    },
  },
  plugins: [],
}
