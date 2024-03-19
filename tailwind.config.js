/* Remove all the codes which is there after installation and add the below lines of codes */
// These should be added on using of tailwindcss 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}