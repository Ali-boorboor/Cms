/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#38bdf8",
        secondaryColor: "#545353",
        trinityColor: "#f1ebd3",
      },
      fontFamily: {
        "f-woff2": "f-woff2",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
