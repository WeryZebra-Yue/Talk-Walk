module.exports = {
  mode: "jit",
  purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    theme: {
      fontFamily: {
        display: ["Inter"],
        body: ["Inter"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
