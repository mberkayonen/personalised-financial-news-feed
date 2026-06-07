import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emerald: '#6BDBCB',
        periwinkle: '#ABB6FF',
        woodsmoke: '#101112',
        'woodsmoke-80': '#404141',
        blush: '#F79880',
        sunflower: '#FFC880',
        'muted-emerald': '#A8D0CA',
        'muted-periwinkle': '#B5BAD7',
        'muted-white': '#CFCFD0',
        'card-bg': '#1A1B1C',
        'card-border': '#2A2B2C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
