import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#102033',
          900: '#16314f',
          800: '#27476b',
          700: '#44678e',
        },
        mist: {
          50: '#f4f7fb',
          100: '#edf2f7',
          200: '#dde7f0',
          300: '#c9d7e6',
          400: '#91a6bd',
        },
        sand: {
          100: '#f7f1e8',
          200: '#efe2d1',
          400: '#d4b38f',
        },
        teal: {
          500: '#1f8a85',
          600: '#166f6b',
        },
        amber: {
          400: '#f6b24a',
        },
        rose: {
          500: '#da5d5d',
        },
        emerald: {
          500: '#2f9e75',
        },
      },
    },
  },
  plugins: [],
}

export default config
