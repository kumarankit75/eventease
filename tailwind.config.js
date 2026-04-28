/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#F0D98E',
          dark:    '#8B6914',
        },
        deep: {
          DEFAULT: '#0D0D12',
          2:       '#16161F',
          3:       '#1E1E2A',
        },
        surface: {
          DEFAULT: '#232332',
          2:       '#2A2A3D',
        },
        brand: {
          text:    '#F0EDE6',
          muted:   '#9B96A8',
          dim:     '#5E5A6E',
          accent:  '#E8745A',
          accent2: '#7B6CF6',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        brand:      '14px',
        'brand-lg': '22px',
        'brand-xl': '32px',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(240,217,142,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(240,217,142,0.08) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(201,168,76,0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(123,108,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 60%, rgba(232,116,90,0.05) 0%, transparent 60%)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      boxShadow: {
        gold: '0 8px 24px rgba(201,168,76,0.3)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'float-up':  'floatUp 6s linear infinite',
        'fade-up':   'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.8)' },
        },
        floatUp: {
          '0%':   { transform: 'translateY(0) rotate(0deg)',        opacity: '0' },
          '10%':  { opacity: '0.6' },
          '90%':  { opacity: '0.2' },
          '100%': { transform: 'translateY(-120px) rotate(360deg)', opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}