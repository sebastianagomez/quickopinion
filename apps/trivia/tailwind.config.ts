import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          100: '#FFD4C7',
          200: '#FFAC96',
          300: '#FF8465',
          400: '#FF753D',
          500: '#FF6B35',
          600: '#E04D1C',
          700: '#B03716',
          800: '#802811',
          900: '#50190B',
        },
        secondary: {
          DEFAULT: '#004E89',
          50: '#E5EDF4',
          100: '#B8D2E8',
          200: '#8BB7DC',
          300: '#5D9CD0',
          400: '#3081C4',
          500: '#004E89',
          600: '#003E6E',
          700: '#002F53',
          800: '#001F38',
          900: '#00101D',
        },
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
