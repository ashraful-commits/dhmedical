/** Colours taken from the D H Medical Support / DH Family Care artwork */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#12347F", dark: "#0B2257" },
        blue: { DEFAULT: "#1E63D6", soft: "#DCEBFF" },
        red: { DEFAULT: "#E11D2E", dark: "#B91424" },
        green: { DEFAULT: "#1F8F3F", dark: "#166B2F" },
        gold: "#FFD21F",
        sky: { DEFAULT: "#EEF5FF", 50: "#F5F9FF" },
      },
      fontFamily: { body: ["var(--font-body)", "sans-serif"], head: ["var(--font-head)", "var(--font-body)", "sans-serif"] },
    },
  },
  plugins: [],
};
