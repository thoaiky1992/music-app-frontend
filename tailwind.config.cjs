/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#0b1928",
        primary: "#111f35",
        secondary: "#20253e",
        third: "#172533",
        "high-light": "#ff404e",
        "text-1": "#72859b",
        "text-2": "#aebed3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      scale: {
        160: "1.6",
        170: "1.7",
        180: "1.8",
        190: "1.9",
        200: "2",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    screens: {
      xs: "375px",

      sm: "480px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1900px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
