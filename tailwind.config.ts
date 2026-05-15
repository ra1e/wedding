import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FDFcf8',
        champagne: '#efeae0',
        'powder-pink': '#ffd8e1',
        'powder-blue': '#b9d8f3',
        teal: '#80d7e0',
        navy: '#1b2a4a',
      },
      fontFamily: {
        sans:   ['Georgia', 'Times New Roman', 'serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'card': '0 4px 40px rgba(27, 42, 74, 0.08)',
        'card-hover': '0 8px 60px rgba(27, 42, 74, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
