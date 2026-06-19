/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parent: {
          DEFAULT: '#d4a574',
          hover: '#c49564',
          light: '#fffbf7',
          bg: '#ffe8cc',
        },
        child: {
          DEFAULT: '#74a5d4',
          hover: '#6495c4',
          light: '#f7fcff',
          bg: '#cce8ff',
        },
        bg: '#f8f6f3',
        card: '#ffffff',
        text: {
          DEFAULT: '#1a1a1a',
          secondary: '#555555',
          muted: '#888888',
        },
        border: '#e8e5e0',
        info: {
          bg: '#f5f3f0',
        },
        shadow: 'rgba(0, 0, 0, 0.08)',
        shadowHover: 'rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'sans-serif'],
        title: ['Microsoft YaHei', 'PingFang SC', 'sans-serif'],
        body: ['Microsoft YaHei', 'PingFang SC', 'sans-serif'],
      },
      fontSize: {
        'title-xl': '2.5rem',
        'title-lg': '1.625rem',
        'title-md': '1.25rem',
        'body-lg': '1.125rem',
        'body-base': '1rem',
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        regular: 400,
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      transitionProperty: {
        'fast': '0.2s ease',
        'normal': '0.3s ease',
        'slow': '0.4s ease',
      },
    },
  },
  plugins: [],
}
