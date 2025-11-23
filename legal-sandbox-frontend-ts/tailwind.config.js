/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f12',
        surface: '#15161a',
        border: '#23242b',
        text: '#e9e9ee',
        muted: '#a3a3ad',
        accent: '#5b8cff',
        ok: '#22c55e',
        warn: '#f59e0b',
        danger: '#ef4444'
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(0,0,0,0.25)'
      },
      borderRadius: {
        xl2: '1rem'
      }
    },
  },
  plugins: [],
}
