import clsx from 'clsx'
import type {PrismTheme} from 'prism-react-renderer'

export const simeonGriggsTheme: PrismTheme = {
  plain: {
    color: clsx('var(--color-blue-50)'),
    backgroundColor: clsx('var(--color-carbon-blue-900)'),
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: clsx('var(--color-blue-100)'),
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: clsx('var(--color-red-400)'),
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: clsx('var(--color-green-100)'),
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: clsx('var(--color-carbon-blue-300)'),
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: clsx('var(--color-green-100)'),
      },
    },
    {
      types: ['variable'],
      style: {
        color: clsx('var(--color-teal-100)'),
      },
    },
    {
      types: ['number'],
      style: {
        color: clsx('var(--color-orange-100)'),
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: clsx('var(--color-cyan-200)'),
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: clsx('var(--color-blue-400)'),
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: clsx('var(--color-magenta-200)'),
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: clsx('var(--color-cyan-200)'),
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: clsx('var(--color-teal-200)'),
      },
    },
    {
      types: ['boolean'],
      style: {
        color: clsx('var(--color-red-200)'),
      },
    },
    {
      types: ['property'],
      style: {
        color: clsx('var(--color-purple-200)'),
      },
    },
    {
      types: ['namespace'],
      style: {
        color: clsx('var(--color-blue-200)'),
      },
    },
  ],
}
