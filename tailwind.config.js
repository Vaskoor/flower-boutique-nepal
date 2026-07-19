/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#da798a',
          light: '#fde9da',
          dark: '#c95f73',
          fade: 'rgba(218, 121, 138, 0.05)',
        },
        text: {
          DEFAULT: '#212121',
          light: '#646464',
          dark: '#000000',
        },
        bg: {
          DEFAULT: '#ffffff',
          secondary: '#f7f9fa',
          light: '#f2f2f2',
        },
        border: {
          DEFAULT: '#f0f0f0',
          light: '#f6f6f6',
          dark: '#bdbdbd',
        },
        sale: {
          bg: '#f9dee5',
          text: '#af7b88',
        },
        error: {
          DEFAULT: '#721C24',
          bg: '#F8D7DA',
          border: '#F5C6CB',
        },
      },
      fontFamily: {
        heading: ['Iskry', 'Georgia', 'serif'],
        body: ['"Libre Franklin"', 'Inter', 'sans-serif'],
        nav: ['"Libre Franklin"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
