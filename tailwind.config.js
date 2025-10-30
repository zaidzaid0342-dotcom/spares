/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Add this line to enable dark mode
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0b1226',
          700: '#0f1724',
          600: '#111827',
        },
        // Add dark mode variants for existing colors if needed
        dark: {
          bg: '#0f172a', // Dark background
          card: '#1e293b', // Dark card background
          border: '#334155', // Dark border color
          text: '#e2e8f0', // Dark text color
          muted: '#94a3b8', // Dark muted text
        }
      }
    },
  },
  plugins: [],
}