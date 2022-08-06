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
        scale_enter: "scale_enter 400ms ease-in-out forwards",
        scale_leave: "scale_leave 300ms ease-in-out forwards",
        skeleton: "skeleton 2s infinite",
      },
      keyframes: {
        scale_enter: {
          "0%": {
            opacity: "0",
            transform: "scale(0) rotate(0deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(360deg)",
          },
        },
        scale_leave: {
          "0%": {
            opacity: "1",
            transform: "scale(1) rotate(360deg)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0) rotate(0deg)",
          },
        },
        skeleton: {
          "0%": {
            opacity: 0,
            left: "0%",
          },
          "50%": {
            opacity: 1,
            left: "100%",
          },
          "100%": {
            opacity: 0,
            left: "0%",
          },
        },
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
