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
      boxShadow: {
        '3xs': '0 1px 2px 0 rgba(2, 44, 54, 0.05)',
        '2xs': '0 1px 3px 0 rgba(2, 44, 54, 0.07), 0 1px 2px -1px rgba(2, 44, 54, 0.05)',
        'xs': '0 2px 6px -1px rgba(2, 44, 54, 0.10), 0 1px 3px -1px rgba(2, 44, 54, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-up': 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
};
