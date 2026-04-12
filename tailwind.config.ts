import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C4714F',
          50: '#F9EDE7',
          100: '#F3DBCF',
          200: '#E8B79F',
          300: '#DC936F',
          400: '#D0804F',
          500: '#C4714F',
          600: '#A85D3F',
          700: '#8B4A30',
          800: '#6E3824',
          900: '#512619',
        },
        ivory: {
          DEFAULT: '#FDF6EE',
          dark: '#F5EDE3',
        },
        teal: {
          deep: '#1D4E4A',
          DEFAULT: '#1D4E4A',
          light: '#2A6E68',
        },
        gold: {
          DEFAULT: '#E8B84B',
          light: '#F0CC7A',
          dark: '#C99B2F',
        },
        surface: '#F5EDE3',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-ivara': 'linear-gradient(135deg, #FDF6EE 0%, #F5EDE3 50%, #F0E0CE 100%)',
        'gradient-teal': 'linear-gradient(135deg, #1D4E4A 0%, #2A6E68 100%)',
        'gradient-terracotta': 'linear-gradient(135deg, #C4714F 0%, #D0804F 100%)',
      },
      boxShadow: {
        'ivara': '0 4px 24px rgba(196, 113, 79, 0.12)',
        'ivara-md': '0 8px 32px rgba(196, 113, 79, 0.16)',
        'ivara-lg': '0 16px 48px rgba(196, 113, 79, 0.20)',
        'card': '0 2px 16px rgba(26, 26, 26, 0.08)',
        'card-hover': '0 8px 32px rgba(26, 26, 26, 0.12)',
      },
      borderRadius: {
        'ivara': '16px',
        'ivara-lg': '24px',
      },
    },
  },
  plugins: [],
}

export default config
