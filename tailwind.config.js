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
        default: '10rem'
      },
    },
  },
  plugins: [],
}
