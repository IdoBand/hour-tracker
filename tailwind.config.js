/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1b1b1b',
        light: '#f5f5f5',
        grayBorder: '#D3D3D3',
        primary: '#B63E96',
        secondary: 'rgb(56 189 248)',
        danger: 'rgb(190, 60, 60)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        upDownTop: {
          '0%': { top: '-10px' },
          '50%': { top: '40px' },
          '100%': { top: '-10px' },
        },
        upDownBottom: {
          '0%': { bottom: '0' },
          '50%': { bottom: '-60px' },
          '100%': { bottom: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'up-down-top': 'upDownTop 6s ease-in-out infinite',
        'up-down-bottom': 'upDownBottom 5s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      "xl": { max: "1279px" },
      "lg": { max: "1023px" },
      "md": { max: "767px" },
      "sm": { max: "639px" },
      "xs": { max: "479px" },
  },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
