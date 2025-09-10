import type {Config} from 'tailwindcss'
import {colors} from '@carbon/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import {fractionWidths} from 'tailwindcss-fraction-widths'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

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

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
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
  plugins: [typography, aspectRatio, fractionWidths([8, 16])],
} satisfies Config
