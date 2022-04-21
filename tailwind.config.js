module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  // important: true,
  theme: {
    extend: {
      screens: {
        desktop: '1360px',
      },
      backgroundImage: {
        ['landing-hero']: "url('/hero-bg.png')",
        ['landing-overlay-hero']: `linear-gradient(
          89.85deg,
          rgba(255, 158, 14, 0.5) 0.06%,
          rgba(132, 132, 132, 0) 99.82%
        )`,
      },
      colors: {
        primary: {
          1500: '#633b10',
          1400: '#7c4a15',
          1300: '#945819',
          1200: '#ad671d',
          1100: '#c67621',
          1000: '#de8425',
          900: '#ff9e0e',
          800: '#f89e3e',
          700: '#f9a954',
          600: '#f9b369',
          500: '#fabe7f',
          400: '#fbc994',
          300: '#fcd4a9',
          200: '#fddfbf',
          100: '#fde9d4',
          50: '#fef4ea',
        },
      },
      borderWidth: {
        1: '1px',
      },
      fontSize: {
        '2xs': '0.75rem',
        xs: '0.8125rem',
        md: '0.9375rem',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
  },
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#ff9e0e',
        },
      },
      'light',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'light',
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
