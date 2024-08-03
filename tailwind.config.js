/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      "primary-dark": "var(--color-primary-dark)",
      secondary: "var(--color-secondary)",
      "secondary-dark": "var(--color-secondary-dark)",
      background: "var(--color-background)",
      danger: "var(--color-danger)",
      "danger-dark": "var(--color-danger-dark)",
      success: "var(--color-success)",
      gray: "var(--color-gray)",
      "light-gray": "var(--color-light-gray)",
      porcelain: "var(--color-porcelain)",
      white: "#ffffff",
      black: "#000000",
      medium: "var(--color-medium)",
      lighter: "var(--color-lighter)",
      lightest: "var(--color-lightest)",
      transparent: "transparent",
      text: "var(--color-text)",
    },
    boxShadow: {
      softest: "0px 1px 8px 2px rgba(0, 0, 0, 0.15)",
      soft: "0px 0px 9px 2px rgba(0, 0, 0, 0.10)",
    },
    extend: {},
  },
  plugins: [],
};
