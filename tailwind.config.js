const { fontFamily } = require("./src/Styles/fontFamily");
const { colors } = require("./src/Styles/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: { fontFamily, colors },
  },
  plugins: [],
};
