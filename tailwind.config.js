import daisyui from "daisyui";
import tailwindcssMotion from 'tailwindcss-motion'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', system-ui",
        sourGummy: "'Sour Gummy', serif",
        cherrySwash: "'Cherry Swash', cursive",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // "primary-white": "#FFF7EE",
        "primary-white": "#E7E5E1",
        "light-green": "#E3E986",
        // "dark-green": "#005D32",
        "dark-green": "#485A49",
        "primary-orange": "#F6C021",
        // "light-olive": "#E7E5E1",
        // "olive-green": "#485A49"
      },
    },
  },
  plugins: [daisyui, tailwindcssMotion],
};
