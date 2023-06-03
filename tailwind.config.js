/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xl: { min: "367px" },
      sm: { min: "567px" },
      md: { min: "767px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      xsl: { max: "367px" },
      sml: { max: "567px" },
      med: { max: "767px" },
      lar: { max: "1024px" },
      xlarge: { max: "1280px" },
    },
    extend: {
      colors: {
        light: {
          primary: "#ffffff", // Define your light mode primary color
          background: "#f5f5f5", // Define your light mode background color
          // Add more light mode color definitions if needed
        },
        dark: {
          primary: "#110c4d", // Define your dark mode primary color
          background: "#090a41", // Define your dark mode background color
          // Add more dark mode color definitions if needed
        },
      },
    },
    fontFamily: {
      signature: ["Cormorant Garamond"],
    },
  },
  plugins: [],
};
