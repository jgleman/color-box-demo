/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "avenir next",
          "avenir",
          "segoe ui",
          "helvetica neue",
          "helvetica",
          "Cantarell",
          "Ubuntu",
          "roboto",
          "noto",
          "arial",
          "sans-serif",
        ],
        mono: [
          "Menlo",
          "Consolas",
          "Monaco",
          "Liberation Mono",
          "Lucida Console",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
