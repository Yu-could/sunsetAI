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
          DEFAULT: '#E8843C',
          hover: '#D4732E',
          light: '#FFF5ED',
          bg: '#FFE8D6',
        },
        child: {
          DEFAULT: '#5B9BD5',
          hover: '#4A8AC4',
          light: '#F0F7FD',
          bg: '#D6EAFF',
        },
        bg: '#FFF9F5',
        card: '#ffffff',
        text: {
          DEFAULT: '#2D2D2D',
          secondary: '#5A5A5A',
          muted: '#909090',
        },
        border: '#EDE8E3',
        shadow: 'rgba(0, 0, 0, 0.06)',
        shadowHover: 'rgba(0, 0, 0, 0.10)',
        // 语义色
        success: {
          DEFAULT: '#27AE60',
          light: '#EEFAF3',
          bg: '#D5F5E3',
        },
        warning: {
          DEFAULT: '#F39C12',
          light: '#FFF9ED',
          bg: '#FDEBD0',
        },
        danger: {
          DEFAULT: '#E74C3C',
          light: '#FDEDEC',
          bg: '#FADBD8',
        },
        info: {
          DEFAULT: '#3498DB',
          light: '#EBF5FB',
          bg: '#D6EAF8',
        },
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
