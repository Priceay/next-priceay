/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",

    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#03A4CA",
        primaryWarning: "#F9D70B",
      },

      fontSize: {
        xs: "10px",
        xss: "13px",
      },
      fontFamily: {
        Almarai: ["Almarai"],
        Cairo: ["Cairo"],
        IBM: ["IBM Plex Sans Arabic"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
