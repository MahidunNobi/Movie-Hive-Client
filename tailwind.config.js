/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "net-red": "#db0000",
        "net-black": "#000000",
        "net-gray": "#564d4d",
      },
    },
  },
  plugins: [require("daisyui")],
};
