/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#60A5FA",
        },
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#111827",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1F2937",
        },
        text: {
          DEFAULT: "#1F2937",
          dark: "#F9FAFB",
          secondary: {
            DEFAULT: "#4B5563",
            dark: "#9CA3AF",
          },
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
        },
      },
    },
  },
  plugins: [],
}
