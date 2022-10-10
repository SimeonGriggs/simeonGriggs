/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
      sans: ['Supreme', ...defaultTheme.fontFamily.sans],
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
        },
        pink: colors.pink,
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
    require('tailwindcss-fraction-widths')([8, 16]),
  ],
}
