module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 18s linear infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#00b14f',
          dark: '#00a04a',
        },
        surface: {
          light: '#f8fafc',
          dark: '#18181c',
        },
        card: {
          light: '#fff',
          dark: '#23272f',
        },
        text: {
          light: '#18181c',
          dark: '#f3f4f6',
        },
        border: {
          light: '#e5e7eb',
          dark: '#23272f',
        },
      },
    },
  },
  plugins: [],
};
