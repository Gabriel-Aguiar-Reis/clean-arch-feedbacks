import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'select-group-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-select-group-content-height)' }
        },
        'select-group-up': {
          from: { height: 'var(--radix-select-group-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'select-group-down': 'select-group-down 0.2s ease-out',
        'select-group-up': 'select-group-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
