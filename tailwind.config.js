/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1440px',
      custom1138: '1138px',
      semixl: '1200px'
    },
    // colors: {
    //   primary: '#1D4ED8',
    //   'secondary-blue': '#1E40AF',
    //   'secondary-green': '#047857',
    //   'secondary-black': '#2C2E3E',
    //   'secondary-white': '#FEFEFE',
    //   'secondary-gray': '#FBFBFB',
    //   'text-black': '#2C2E3E',
    //   'text-dark-gray': '#46474F',
    //   'text-medium-gray': '#585858',
    //   'text-light-gray': '#7E7D7D',
    //   'text-ultra-light-gray': '#BBBBBB',
    //   danger: '#EF2020',
    //   success: '#10FF61'
    // },
    fontFamily: {
      dm: ['DM Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#1D4ED8',
        'primary-blue': '#2563EB',
        'secondary-blue': '#1E40AF',
        'secondary-light-blue': '#EBF0FF',
        'secondary-ultra-light-blue': '#F9FBFE',
        'secondary-dark-blue': '#1E3A8A',
        'secondary-green': '#047857',
        'secondary-light-green': '#DEFFE4',
        'secondary-medium-green': '#075F46',
        'secondary-dark-green': '#054D38',
        'secondary-black': '#2C2E3E',
        'secondary-white': '#FEFEFE',
        'secondary-gray': '#FBFBFB',
        'text-black': '#2C2E3E',
        'text-light-black': '#161618',
        'text-light-black2': '#292D34',
        'dark-gray': '#121D32',
        'text-gray': '#51605C',
        'text-gray2': '#666666',
        'text-dark-gray': '#46474F',
        'text-medium-gray': '#585858',
        'text-light-gray': '#7E7D7D',
        'text-light-gray2': '#A6A6A6',
        'bg-gray': '#FBFDFF',
        'text-ultra-light-gray': '#BBBBBB',
        'danger-light': '#FFDEDE',
        'disabled-input': '#E4E4E4',
        danger: '#EF2020',
        success: '#10FF61',
        'primary-purple': '#6F6AF5'
      },
      boxShadow: {
        custom: '0px 0px 31px rgba(29, 78, 216, 0.1)'
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem'
      },
      height: {
        'header-calc-viewport': 'calc(100vh - 94px)'
      },
      minHeight: {
        'hero-height': 'calc(100vh - 76px)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/assets/images/sidebar/sidebarellipses.png')",
        'landing-hero-bg': "url('/assets/images/landing/hero-bg.png')",
        'landing-hero-circle': "url('/assets/images/landing/hero-circle.png')",
        'howitworks-bg': "url('/assets/images/landing/howitworks/howitwork-bg.png')",
        'form-wrapper': "url('/assets/images/bg.png')",
        checked: "url('/assets/icons/check.svg')",
        unchecked: "url('/assets/unchecked.png')",
        tick: "url('/assets/icons/tick_icon.svg')",
        dateicon: "url('/assets/images/icons/date-icon.png')"
      }
    }
  },
  plugins: []
};
