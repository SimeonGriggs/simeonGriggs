import {MoonIcon, SunIcon} from '@heroicons/react/24/solid'
import {useFetcher, useLoaderData} from '@remix-run/react'

import {buttonClasses} from '~/components/Header'

export default function ThemeToggle() {
  const cookieToggle = useFetcher()
  const {themePreference} = useLoaderData()

  const isDarkMode = themePreference === `dark`

  return (
    <cookieToggle.Form method="post" action="/action/toggle-theme">
      <input type="hidden" name="themePreference" value={isDarkMode ? `light` : `dark`} />
      <button
        type="submit"
        className={buttonClasses}
        disabled={cookieToggle.state === 'submitting'}
      >
        {isDarkMode ? (
          <SunIcon className="h-auto w-full md:w-5" />
        ) : (
          <MoonIcon className="h-auto w-full md:w-5" />
        )}
        <div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
      </button>
    </cookieToggle.Form>
  )
}
