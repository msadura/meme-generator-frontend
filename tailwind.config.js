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
  daisyui: {
    themes: [
      {
        mytheme: {
          /* your theme name */
          accent: '#42749B' /* Primary color */,
          'accent-focus': '#204561' /* Primary color - focused */,
          'accent-content': '#ffffff' /* Foreground content color to use on primary color */,

          secondary: '#B18C19' /* Secondary color */,
          'secondary-focus': '#f3cc30' /* Secondary color - focused */,
          'secondary-content': '#ffffff' /* Foreground content color to use on secondary color */,

          primary: '#559D9D' /* Accent color */,
          'primary-focus': '#2aa79b' /* Accent color - focused */,
          'primary-content': '#ffffff' /* Foreground content color to use on accent color */,

          neutral: '#2a2e37',
          'neutral-focus': '#16181d',
          'neutral-content': '#ffffff',

          'base-100': '#162f42',
          'base-200': '#092134',
          'base-300': '#151722',
          'base-content': '#ebecf0',

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#f3cc30' /* Warning */,
          error: '#ff5724' /* Error */
        }
      }
    ]
  }
};
