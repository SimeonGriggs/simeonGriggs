import {MoonIcon, SunIcon} from '@heroicons/react/solid'
import {useFetcher, useLoaderData} from '@remix-run/react'

import {buttonClasses} from '~/components/Header'
// import {cookieNames} from '~/cookies'

export default function ThemeToggle() {
  const cookieToggle = useFetcher()
  const {themePreference} = useLoaderData()

  const isDarkMode = themePreference === `dark`

  //   const {isDarkMode, toggle} = useDarkMode(
  //     [`dark`, `light`].includes(currentThemePreference) ? currentThemePreference === 'dark' : false
  //   )

  //   useEffect(() => {
  // console.log(cookieToggle)

  //   toggle()
  //   const newPreference = isDarkMode ? `light` : `dark`

  //   // todo: write new cookie

  //   document
  //     .querySelector('meta[name="color-scheme"]')
  //     ?.setAttribute(`content`, `only ${newPreference}`)
  //   }, [cookieToggle.data])

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
