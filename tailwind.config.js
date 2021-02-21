module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {"circle": "100%"},
      zIndex: {1: "1", 2: "2", 3 : "3"},
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
      ringColor: ["hover", "active"],
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
}
