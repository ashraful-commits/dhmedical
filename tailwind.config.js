/** 
 * D H Medical Support — Signature Healthcare Theme
 * 
 * 1. Primary: Vibrant Royal Blue (#1678F2)
 * 2. Secondary Accent: Warm Peach / Coral (#F7B296)
 * 3. Foreground: Deep Navy (#14213D) with Slate Gray body text (#6C757D)
 * 4. Surfaces: Pure White (#FFFFFF) & Soft Ice Blue (#F6F9FC)
 * 
 * Minimal, clinical, high-contrast palette across every component.
 */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF6FF",
          100: "#DCEBFF",
          200: "#B8D6FF",
          light: "#4B93F5",
          DEFAULT: "#1678F2",
          dark: "#0F63CC",
          deep: "#0A4FA6",
        },
        ink: {
          light: "#6C757D",
          DEFAULT: "#334155",
          dark: "#14213D",
        },
        surface: {
          DEFAULT: "#F6F9FC",
          card: "#FFFFFF",
          subtle: "#EEF3F8",
        },
        care: {
          50: "#FFF5F0",
          100: "#FFE5D8",
          200: "#FFC9AD",
          light: "#F9A98B",
          DEFAULT: "#F7B296",
          dark: "#E98C6B",
          deep: "#C96D4D",
        },
        love: {
          50: "#FFF5F0",
          100: "#FFE5D8",
          200: "#FFC9AD",
          light: "#F9A98B",
          DEFAULT: "#F7B296",
          dark: "#E98C6B",
          deep: "#C96D4D",
        },
        gold: {
          DEFAULT: "#F7B296",
          light: "#FFE5D8",
          dark: "#E98C6B",
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "Hind Siliguri", "sans-serif"],
        head: ["var(--font-head)", "Anek Bangla", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.18s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        clean: "0 1px 3px 0 rgba(20, 33, 61, 0.05), 0 1px 2px 0 rgba(20, 33, 61, 0.03)",
        card: "0 2px 12px 0 rgba(22, 120, 242, 0.08), 0 1px 3px 0 rgba(20, 33, 61, 0.03)",
        hover: "0 12px 28px -6px rgba(22, 120, 242, 0.20), 0 4px 10px -2px rgba(20, 33, 61, 0.05)",
        care: "0 4px 16px 0 rgba(247, 178, 150, 0.35)",
        love: "0 4px 16px 0 rgba(247, 178, 150, 0.35)",
      },
    },
  },
  plugins: [],
};
