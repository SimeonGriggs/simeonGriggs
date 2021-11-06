/* eslint-disable react/jsx-filename-extension */
import {MoonIcon, SunIcon} from '@heroicons/react/solid'
import {Link} from 'remix'
import {useDarkMode} from 'usehooks-ts'

import Twitter from './Twitter'
import GitHub from './GitHub'

interface SiteMeta {
  title: string
}

const Header = ({siteMeta}: {siteMeta: SiteMeta}) => {
  const {title} = siteMeta ?? {}
  const menuClasses =
    'fixed text-sm z-50 inset-0 bottom-auto md:bottom-0 md:right-auto md:w-1/12 lg:w-1/16 flex items-center justify-center'
  const buttonClasses =
    'flex items-center justify-center p-1 w-7 h-7 md:w-10 md:h-10 text-blue-500 rounded-full bg-white hover:bg-blue-900 hover:text-white'

  const {isDarkMode, toggle} = useDarkMode()

  return (
    <header className={menuClasses}>
      <div className="md:w-full bg-blue-500 py-2 px-3 md:py-8 text-white font-mono flex md:flex-col justify-center items-center">
        <Link to="/" className="text-vertical flex items-center justify-center hover:bg-blue-900">
          {title}
        </Link>

        <div className="w-12 md:h-16 lg:h-24 md:w-auto border-t md:border-t-none md:border-l border-white mx-3 md:mx-0 md:my-4" />

        <div className="flex space-x-3 md:flex-col md:space-x-0 md:space-y-3">
          <a
            className={buttonClasses}
            href="https://twitter.com/simeonGriggs/"
            target="blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-full" />
            <div className="sr-only">Twitter</div>
          </a>
          <a
            className={buttonClasses}
            href="https://github.com/SimeonGriggs/"
            target="blank"
            rel="noopener noreferrer"
          >
            <GitHub className="w-full" />
            <div className="sr-only">GitHub</div>
          </a>
          <button type="button" onClick={() => toggle()} className={buttonClasses}>
            {isDarkMode ? (
              <SunIcon className="w-full h-auto md:w-5" />
            ) : (
              <MoonIcon className="w-full h-auto md:w-5" />
            )}
            <div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
