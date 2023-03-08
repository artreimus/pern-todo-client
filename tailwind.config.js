/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        200: '275px 1fr',
      },
      fontSize: {
        xxs: '0.6rem',
      },
    },
    minHeight: {
      '4/5': '75%',
    },
    minWidth: {
      110: '110px',
    },
    maxWidth: {
      80: '83.33%',
    },
  },
  plugins: [],
};
