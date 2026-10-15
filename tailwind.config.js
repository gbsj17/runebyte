/** @type {import('tailwindcss').Config} */
module.exports = {
  // Todas as páginas HTML (inclui classes escritas em strings no <script> das páginas)
  content: ['./*.html', './runelog/**/*.html', './runefiscal/**/*.html', './fab.software/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        brand: {
          dark: '#0a1424',    /* Fundo escuro */
          base: '#152e50',    /* Azul corporativo */
          light: '#2a4a7f',   /* Azul bordas/hover */
          accent: '#f59e0b',  /* Âmbar / Dourado */
          accentHover: '#d97706',
        },
      },
    },
  },
  plugins: [],
};
