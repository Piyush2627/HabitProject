/** @type {import('tailwindcss').Config} */
import motion from "tailwindcss-motion";
import intersect from "tailwindcss-intersect";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [motion, intersect],
};
