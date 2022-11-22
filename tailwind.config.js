/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      amber: colors.amber,
      sky: colors.sky,
      white: colors.white,
      voilet: colors.voilet,
      slate: colors.slate,
      'button-background': '#ebedf0',
      'secondary-dark': '#d4d5d8',
      'color-primary': '#3578e5',
      'color-secondary': '#ebedf0',
      'color-success': '#00a400',
      'color-info': '#54c7ec',
      'color-warning': ' #ffba00',
      'color-danger': '#fa383e',
      'color-primary-dark': '#306cce',
      'color-primary-darker': '#2d66c3',
      'color-primary-darkest': '#2554a0',
      'color-primary-light': '#538ce9',
      'color-primary-lighter': '#72a1ed',
      'color-primary-lightest': '#9abcf',
      'color-primary-contrast-background': '#ebf2fc',
      'color-primary-contrast-foreground': '#102445',
      'color-secondary-dark': '#d4d5d8',
      'secondary-darker': '#c8c9cc',
      'color-secondary-darkest': '#a4a6a8',
      'color-secondary-light': '#eef0f2',
      'color-secondary-lighter': '#f1f2f5',
      'color-secondary-lightest': '#f5f6f8',
      'color-secondary-contrast-background': '#fdfdfe',
      'color-secondary-contrast-foreground': '#474748',
      'color-success-dark': '#009400',
      'color-success-darker': '#008b00',
      'color-success-darkest': '#007300',
      'color-success-light': '#26b226',
      'color-success-lighter': '#4dbf4d',
      'color-success-lightest': '#80d280',
      'color-success-contrast-background': '#e6f6e6',
      'color-success-contrast-foreground': '#003100',
      'color-info-dark': '#4cb3d4',
      'color-info-darker': '#47a9c9',
      'color-info-darkest': '#3b8ba5',
      'color-info-light': '#6ecfef',
      'color-info-lighter': '#87d8f2',
      'color-info-lightest': '#aae3f6',
      'color-info-contrast-background': '#eef9fd',
      'color-info-contrast-foreground': '#193c47',
      'color-warning-dark': '#e6a700',
      'color-warning-darker': '#d99e00',
      'color-warning-darkest': '#b38200',
      'color-warning-light': '#ffc426',
      'color-warning-lighter': '#ffcf4d',
      'color-warning-lightest': '#ffdd80',
      'color-warning-contrast-background': '#fff8e6',
      'color-warning-contrast-foreground': '#4d3800',
      'color-danger-dark': '#e13238',
      'color-danger-darker': '#d53035',
      'color-danger-darkest': '#af272b',
      'color-danger-light': ' #fb565b',
      'color-danger-lighter': ' #fb7478',
      'color-danger-lightest': ' #fd9c9f',
      'color-danger-contrast-background': '#ffebec',
      'color-danger-contrast-foreground': '#4b1113',
      ' color-content': '#1c1e21',
      'color-content-inverse': '#fff',
      'color-content-secondary': '#525860',
      'hover-overlay': 'rgba(0, 0, 0, 0.05)',
      gray: {
        100: '#f5f6f7',
        200: '#ebedf0',
        300: '#dadde1',
        400: '#ccd0d5',
        500: '#bec3c9',
        600: '#8d949e',
        700: '#606770',
        800: '#444950',
        900: '#1c1e21',
      },
      'header-background': '#2b2b2b',
      'banner-background': 'rgba(255, 230, 164, 0.5)',
      'help-background': '#fff3d2',
      'primary-accent': '#D96146',
      'secondary-accent': '#FFE6A4',
      'mid-gray': '#61676F',
      'border-gray': '#DBDDE1',
      'dark-blue': '#323845',
      'background-light': '#F2F2F2',
      'background-lightest': '#F6F8FA',

      'banner-border': '#b2a726',
      green: '#13ce66',
      yellow: '#ffc82c',
      black: '#1a1a1a',
      'gray-dark': '#273444',

      'gray-light': '#d3dce6',
      'light-blue': '#5783db',
      teal: '#55c2da',
      extismPurple: '#4c31fc',
      'string-red': 'rgb(227, 17, 108)',
      'var-blue': 'rgb(0, 0, 159)',
    },
    fontFamily: {
      sans: ['system-ui', '-apple-system', 'Segoe UI'],
      serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times'],
      mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      body: ['system-ui', '-apple-system', 'Segoe UI'],
    },
    extend: {
      backgroundImage: {
        'chevron-right': 'url("./src/assets/chevron-right.png")',
      },
      height: {
        112: '28rem',
        128: '32rem',
        144: '38rem',
        160: '42rem',
        176: '46rem',
        192: '50rem',
      },
      maxHeight: {
        112: '28rem',
        128: '32rem',
        144: '38rem',
        160: '42rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
