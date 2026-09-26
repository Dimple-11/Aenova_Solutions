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
        aevona: {
          50: '#FDFBF7',
          100: '#F8F4EB',
          200: '#EFE7D5',
          300: '#E2D3B7',
          400: '#D4B483',
          500: '#A6815B',
          600: '#8A6848',
          700: '#6B4E3A',
          800: '#473224',
          900: '#2E1F17',
          950: '#1A110B',
        },
        cream: {
          DEFAULT: '#F8F4EB',
          light: '#FDFBF7',
          dark: '#EFE8D8',
        },
        gold: {
          light: '#E6D3B6',
          DEFAULT: '#D4B483',
          dark: '#B89663',
        },
        bronze: {
          DEFAULT: '#A6815B',
          dark: '#8B6743',
        },
        brown: {
          light: '#88674E',
          DEFAULT: '#6B4E3A',
          dark: '#4A3425',
          coffee: '#2E1F17',
        },
        darkbg: {
          base: '#170E09',
          surface: '#241812',
          card: '#2F2018',
          border: '#463226',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 180, 131, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 180, 131, 0.35)',
        'brown-soft': '0 10px 30px -5px rgba(46, 31, 23, 0.08)',
        'dark-soft': '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      }
    },
  },
  plugins: [],
}
