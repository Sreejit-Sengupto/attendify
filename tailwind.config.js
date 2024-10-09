/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#E5E5E7",
        textSecondary: "#A9A9AB",
        background: "#18181C",
        primary: "#121215",
        secondary: "#1C1D20",
        accent: "#FC356C",
        border: "#2D2C31",
      },
      fontFamily: {
        // garamond: ["EB Garamond", "serif"],
        // roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
};
