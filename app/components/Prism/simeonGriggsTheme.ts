import {colors} from '@carbon/colors'
import type {PrismTheme} from 'prism-react-renderer'

var theme: PrismTheme = {
  plain: {
    color: '#fafaff',
    backgroundColor: colors.blue['100'],
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: colors.blue['20'],
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: colors.red['50'],
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: colors.green['20'],
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: colors.blue['50'],
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: colors.green['20'],
      },
    },
    {
      types: ['variable'],
      style: {
        color: colors.teal['20'],
      },
    },
    {
      types: ['number'],
      style: {
        color: colors.orange['20'],
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: colors.cyan['40'],
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#5754fd',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: colors.magenta['40'],
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: colors.cyan['40'],
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: colors.teal['40'],
      },
    },
    {
      types: ['boolean'],
      style: {
        color: colors.red['30'],
      },
    },
    {
      types: ['property'],
      style: {
        color: colors.purple['40'],
      },
    },
    {
      types: ['namespace'],
      style: {
        color: colors.blue['20'],
      },
    },
  ],
}

export default theme
