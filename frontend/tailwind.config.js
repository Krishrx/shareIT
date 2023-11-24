/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#031d02',
        'background': '#f6fef6',
        'primary': '#5c085e',
        'secondary': '#fac2c3',
        'accent': '#d913dd',
        'darkText': '#e3fde2',
        'darkBackground': '#010901',
        'darkPrimary': '#f5a1f7',
        'darkSecondary': '#3d0506',
        'darkAccent': '#e822ec',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
});

