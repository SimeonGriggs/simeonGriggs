export function getBodyClassNames(themePreference?: string): string {
  // Use browser default if cookie is not set
  const isDarkMode =
    !themePreference && typeof document !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : themePreference === `dark`
  return [
    `transition-colors duration-1000 ease-in-out min-h-screen`,
    isDarkMode ? `dark bg-blue-900 text-white` : `bg-white`,
  ]
    .join(' ')
    .trim()
}
