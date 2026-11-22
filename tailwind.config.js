/** 
 * Professional Medical Design System for D H Medical Support
 * Authentic, human-crafted healthcare aesthetic (Praava Health & DocTime standard)
 */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F0F4FA",
          100: "#D9E3F3",
          DEFAULT: "#0F2854",
          dark: "#081836",
          deep: "#051024",
        },
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          soft: "#E8F1FC",
          DEFAULT: "#1D5CD8",
          dark: "#1442A6",
        },
        emerald: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          DEFAULT: "#059669",
          dark: "#047857",
        },
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          DEFAULT: "#DC2626",
          dark: "#B91C1C",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          dark: "#D97706",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "Hind Siliguri", "sans-serif"],
        head: ["var(--font-head)", "Anek Bangla", "var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 4px 12px -2px rgba(15, 40, 84, 0.06), 0 2px 6px -1px rgba(15, 40, 84, 0.03)",
        hover: "0 12px 24px -4px rgba(15, 40, 84, 0.12), 0 4px 8px -2px rgba(15, 40, 84, 0.04)",
        emergency: "0 10px 25px -3px rgba(220, 38, 38, 0.25), 0 4px 10px -2px rgba(220, 38, 38, 0.15)",
      },
    },
  },
  plugins: [],
};
