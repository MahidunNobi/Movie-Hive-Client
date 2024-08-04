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
  daisyui: {
    themes: [
      {
        netflixTheme: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#db0000",
          secondary: "teal",
          // ".btn.btn-primary": {
          //   color: "#fff"
          // }
        },
      },
    ],
  },
};
