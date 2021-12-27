module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        // primary: '#151722',
        // 'white-primary': 'rgba(255, 255, 255, 0.87)',
        // 'white-secondary': 'rgba(255, 255, 255, 0.6)',
        // 'white-faded': 'rgba(255, 255, 255, 0.38)',
        // 'black-primary': 'rgba(0, 0, 0, 0.87)',
        // 'black-secondary': 'rgba(0, 0, 0, 0.6)',
        // 'black-faded': 'rgba(0, 0, 0, 0.38)',
        // 'blue-primary': '#204561',
        // 'blue-dark': '#092134',
        // 'blue-light': '#42749B',
        // 'blue-light-text': '#7fd6ed',
        // 'green-primary': '#316565',
        // 'green-dark': '#0F2C2C',
        // 'green-light': '#559D9D',
        // 'red-primary': '#ca4954',
        // 'red-dark': '#871D33',
        // 'red-light': '#F88186',
        // 'primary-light': '#23395d',
        // 'primary-mid': '#1c2e4a',
        // 'primary-dark': '#152238'
      },
      screens: {
        portrait: { raw: '(orientation: portrait)' },
        // => @media (orientation: portrait) { ... }
        landscape: { raw: '(orientation: landscape)' }
      },
      translate: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%'
      },
      boxShadow: {
        mdh: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.8)'
      },
      borderWidth: {
        3: '3px'
      },
      fontSize: {
        xxs: '.6rem'
      }
    },
    // boxShadow: {
    //   glow: '0 0 3px 2px #7fd6ed'
    // },
    // textShadow: {
    //   glow: '0 0 3px #FFFFFF',
    //   green: '0 0 3px #559D9D'
    // }
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      8: '8px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-textshadow'), require('daisyui')],
  daisyui: {}
};
