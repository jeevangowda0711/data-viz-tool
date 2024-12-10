/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6E59A5',
        secondary: '#F6F6F7',
        accent: '#0EA5E9',
      },
    },
  },
  plugins: [],
};