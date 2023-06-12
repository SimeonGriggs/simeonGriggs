/** @type {import('tailwindcss').Config} */
const {colors} = require('@carbon/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const {fractionWidths} = require('tailwindcss-fraction-widths')

const carbonColors = Object.keys(colors).reduce((acc, color) => {
  if (Object.keys(colors[color]).length === 1) {
    return {...acc, [color]: colors[color][0]}
  }

  const palette = Object.keys(colors[color]).reduce((paletteAcc, stop) => {
    const stopNumber = Number(stop + '0')
    paletteAcc[stopNumber] = colors[color][stop]
    return paletteAcc
  }, {})

  return {...acc, [color]: palette}
}, {})

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './remix.config.js'],
  darkMode: 'class',
  corePlugins: {
    // Disable the default container
    container: false,
  },
  theme: {
    // Overrides
    fontFamily: {
      mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    // Extensions
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      colors: {
        ...carbonColors,
        blue: {
          50: '#fafaff',
          100: '#f0f0ff',
          200: '#bfbefe',
          300: '#8886fd',
          400: '#5754fd',
          500: '#2522fc',
          600: '#0703d8',
          700: '#050297',
          800: '#030156',
          900: '#010014',
          // 50: ['#fafaff', 'color(display-p3 0.863 0.863 1 / <alpha-value>)'],
          // 100: ['#f0f0ff', 'color(display-p3 0.71 0.706 0.996 / <alpha-value>)'],
          // 200: ['#bfbefe', 'color(display-p3 0.573 0.565 0.992 / <alpha-value>)'],
          // 300: ['#8886fd', 'color(display-p3 0.435 0.427 0.992 / <alpha-value>)'],
          // 400: ['#5754fd', 'color(display-p3 0.282 0.271 0.988 / <alpha-value>)'],
          // 500: ['#2522fc', 'color(display-p3 0.145 0.133 0.988 / <alpha-value>)'],
          // 600: ['#0703d8', 'color(display-p3 0.027 0.012 0.925 / <alpha-value>)'],
          // 700: ['#050297', 'color(display-p3 0.024 0.012 0.729 / <alpha-value>)'],
          // 800: ['#030156', 'color(display-p3 0.016 0.008 0.553 / <alpha-value>)'],
          // 900: ['#010014', 'color(display-p3 0.012 0.004 0.376 / <alpha-value>)'],
          // 950: ['#010014', 'color(display-p3 0.004 0.004 0.176 / <alpha-value>)'],
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('letterSpacing.tighter'),
            },
            h2: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('letterSpacing.tighter'),
            },
            'h2 a': {
              textDecoration: 'none',
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('letterSpacing.tighter'),
              display: 'block',
              '&:hover': {
                backgroundColor: theme('colors.blue.500'),
                color: theme('colors.white'),
              },
            },
            h3: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('letterSpacing.tighter'),
            },
            'code::before': false,
            code: false,
            'code::after': false,
            'ul > li::before': {backgroundColor: theme('colors.blue.500')},
            'ol > li::before': {color: theme('colors.blue.500')},
            hr: {borderColor: theme('colors.blue.500')},
            pre: {padding: false},
            'a:hover': {
              backgroundColor: theme('colors.blue.500'),
              color: 'white',
              textDecoration: 'none',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.blue.50'),
            a: {color: theme('colors.blue.100')},
            strong: {color: theme('colors.blue.50')},
            blockquote: {
              color: theme('colors.blue.50'),
              borderLeftColor: theme('colors.blue.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    fractionWidths([8, 16]),
  ],
}
