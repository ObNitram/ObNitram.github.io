/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          500: '#235816',
          600: '#1a4211',
          700: '#143109',
          900: '#0d2006',
        },
        blue: {
          DEFAULT: "#3066FF",
          500: "#3066FF",
        },
        yellow: {
          DEFAULT: "#F19937",
          500: "#F19937",
        },
        red: {
          DEFAULT: "#EA4E3D",
          500: "#EA4E3D",
        },
        green: {
          DEFAULT: "#3c9b24ff",
          // 500: "#368423ff",
        },
        sky: {
          DEFAULT: "#55A6F8",
          500: "#55A6F8",
        },
        slate: {
          DEFAULT: "#64748B",
          500: "#64748B",
        },
        dark: {
          DEFAULT: "#1E293B",
          500: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
