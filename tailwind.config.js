/** 
 * D H Medical Support — Signature 2-Color Design System
 * 
 * 1. Primary Signature Accent: Deep Medical Sapphire / Royal Azure (#0F52BA / #0B459E)
 *    - Unique, authoritative, healthcare-specific, differentiated from generic blues
 * 2. Secondary Neutral / Foreground: Deep Slate Charcoal (#111827 / #0F172A)
 *    - Modern, sharp typography with ultra-high contrast
 * 3. Clinical Surfaces: Crisp Pure White (#FFFFFF) & Soft Ice White (#F8FAFC)
 * 
 * Zero rainbow colors. Strictly 1-2 brand colors across every component.
 */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF4FC",
          100: "#E0ECF8",
          200: "#C1D9F3",
          light: "#246CD4",
          DEFAULT: "#0F52BA", // Unique Signature Sapphire
          dark: "#0B4196",
          deep: "#072D6B",
        },
        ink: {
          light: "#334155",
          DEFAULT: "#1E293B",
          dark: "#0F172A", // Deep slate for headings
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          subtle: "#F1F5F9",
        },
        care: {
          50: "#FFF0F3",
          100: "#FFE1E7",
          200: "#FFC7D3",
          light: "#FF8DA3",
          DEFAULT: "#FF5E7E", // Lovable Warm Rose Coral ("নিজের পরিবারের মতো ভালোবাসা")
          dark: "#E03E60",
          deep: "#B32644",
        },
        love: {
          50: "#FFF0F3",
          100: "#FFE1E7",
          200: "#FFC7D3",
          light: "#FF8DA3",
          DEFAULT: "#FF5E7E", // Lovable Warm Rose Coral
          dark: "#E03E60",
          deep: "#B32644",
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
        clean: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        card: "0 2px 12px 0 rgba(15, 82, 186, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.03)",
        hover: "0 10px 25px -4px rgba(15, 82, 186, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
        care: "0 4px 16px 0 rgba(255, 94, 126, 0.28)",
        love: "0 4px 16px 0 rgba(255, 94, 126, 0.28)",
      },
    },
  },
  plugins: [],
};
