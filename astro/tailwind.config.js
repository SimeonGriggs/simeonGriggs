const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  corePlugins: {
    // Disable the default container
    container: false,
  },
  theme: {
    // Overrides
    fontFamily: {
      mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    // Extensions
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      width: {
        '1/16': `${100 / 16}%`,
        '3/16': `${(100 / 16) * 3}%`,
        '4/16': `${(100 / 16) * 4}%`,
        '5/16': `${(100 / 16) * 5}%`,
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('tracking.tighter')
            },
            h2: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('tracking.tighter')
            },
            'h2 a': {
              textDecoration: 'none',
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              tracking: theme('tracking.tighter'),
              display: 'block',
              '&:hover': {
                backgroundColor: theme('colors.blue.500'),
                color: theme('colors.white')
              }
            },
            h3: {
              color: theme('colors.blue.500'),
              fontWeight: theme('fontWeight.black'),
              letterSpacing: theme('tracking.tighter')
            },
            'code::before': false,
            code: false,
            'code::after': false,
            "ul > li::before": { backgroundColor: theme("colors.blue.500") },
            "ol > li::before": { color: theme("colors.blue.500") },
            hr: { borderColor: theme("colors.blue.500") },
          },
        },
        dark: {
          css: {
            color: theme("colors.blue.50"),
            a: { color: theme("colors.blue.100") },
            strong: { color: theme("colors.blue.50") },
            blockquote: {
              color: theme("colors.blue.50"),
              borderLeftColor: theme("colors.blue.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
