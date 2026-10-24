/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#080808',
        darkCard: '#111111',
        darkElevated: '#171717',
        borderMuted: 'rgba(255, 255, 255, 0.08)',
        borderHover: 'rgba(255, 255, 255, 0.22)',
        neon: {
          DEFAULT: '#00FF87',
          glow: 'rgba(0, 255, 135, 0.35)',
        },
        cyanAccent: {
          DEFAULT: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.3)',
        },
        accentPurple: {
          DEFAULT: '#B600A8',
          dark: '#7621B0',
        }
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulseFade 2s ease-in-out infinite',
        'scroll-down': 'scrollLine 1.8s ease-in-out infinite',
        'scrollLine': 'scrollLine 1.8s ease-in-out infinite',
        'slideUp': 'slideUp 0.3s ease-out forwards',
        'fadeIn': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        pulseFade: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        scrollLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
