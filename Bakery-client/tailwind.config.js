/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          bakery: {
            pink: "#FFDEE2",
            darkPink: "#FFB6C1",
            purple: "#9b87f5",
            darkPurple: "#7E69AB",
            white: "#FFFFFF",
          },
        },
      },
    },
    plugins: [],
  };
  