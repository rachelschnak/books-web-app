/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [
      require('tailwind-scrollbar-hide'),
  ],
  corePlugins: {
    preflight: false,
  }
}

