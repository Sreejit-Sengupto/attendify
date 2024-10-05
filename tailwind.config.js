/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#050316",
        background: "#fbfbfe",
        primary: "#2f27ce",
        secondary: "#dddbff",
        accent: "#443dff",
      },
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
