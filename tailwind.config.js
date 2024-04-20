/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightRed: "#38bdf8",
        lightBlack: "#545353",
        lightYellow: "#f1ebd3",
      },
      fontFamily: {
        "f-woff2": "f-woff2",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
