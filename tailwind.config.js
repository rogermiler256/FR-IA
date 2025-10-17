/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // 👈 Escanea todos tus componentes
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite", // animación lenta
      },
    },
  },
  plugins: [],
};
