/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obagi: {
          navy: 'var(--obagi-navy, #21275c)',
          deep: 'var(--obagi-deep, #0e2238)',
          gold: 'var(--obagi-gold, #b1843b)',
          canvas: 'var(--obagi-canvas, #f8f7f5)',
          dark: 'var(--obagi-dark, #1a1c20)',
          muted: 'var(--obagi-muted, #86868f)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
