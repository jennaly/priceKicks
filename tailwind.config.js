/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{ejs,js}"],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"']
      },
    },
  },
  plugins: [require("daisyui")],
 
 
}

