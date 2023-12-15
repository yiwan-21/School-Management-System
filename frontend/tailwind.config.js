/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-school": "url('images/bg-school.jpg')",
      },
    },
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32',
        },
      ],
    },
    fontSize: {
      sm: "0.875rem", // Small
      base: "1rem", // Base
      lg: "1.125rem", // Large
      xl: "1.25rem", // Extra Large
    },
  },
  plugins: [],
};
