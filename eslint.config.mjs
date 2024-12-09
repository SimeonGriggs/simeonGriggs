import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: ['**/node_modules', '**/build', '**/.cache', 'app/sanity/theme.js'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]
