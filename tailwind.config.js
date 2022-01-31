module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "lc-green": "#56B046",
        "lc-green-light": "#7CD146",
        "bg-darker": "#1C1B29",
        "bg-dark": "#292841",
        "text-light": "#DCDDDE",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
