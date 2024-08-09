import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}', './src/**'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
