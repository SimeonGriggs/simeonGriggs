import {SiGithub, SiX, SiYoutube} from '@icons-pack/react-simple-icons'
import {Link} from 'react-router'

import ThemeToggle from '~/components/ThemeToggle'

const menuClasses =
  'fixed text-sm z-[100] inset-0 bottom-auto md:bottom-0 md:right-auto md:w-1/12 lg:w-1/16 flex items-center justify-center'
export const buttonClasses =
  'flex items-center justify-center p-1 w-7 h-7 md:w-10 md:h-10 text-blue-500 rounded-full bg-white hover:bg-blue-900 hover:text-white'

type HeaderProps = {
  title: string
}

const Header = (props: HeaderProps) => {
  const {title} = props

  return (
    <header className={menuClasses}>
      <div className="flex items-center justify-center border-l-2 border-r-2 border-blue-500 bg-blue-500 px-3 py-2 font-mono text-white md:w-full md:flex-col md:border-none md:py-8">
        <Link
          to="/"
          className="md:text-vertical flex items-center justify-center hover:bg-blue-900"
        >
          {title}
        </Link>

        <div className="md:border-t-none mx-3 w-12 border-t border-white md:mx-0 md:my-4 md:h-16 md:w-auto md:border-l lg:h-24" />

        <div className="flex space-x-3 md:flex-col md:space-x-0 md:space-y-3">
          <a
            className={buttonClasses}
            href="https://x.com/simeonGriggs/"
            target="blank"
            rel="noopener noreferrer"
          >
            <SiX className="w-full" />
            <div className="sr-only">Twitter</div>
          </a>
          <a
            className={buttonClasses}
            href="https://github.com/SimeonGriggs/"
            target="blank"
            rel="noopener noreferrer"
          >
            <SiGithub className="w-full" />
            <div className="sr-only">GitHub</div>
          </a>
          <a
            className={buttonClasses}
            href="https://www.youtube.com/@simeonGriggs/"
            target="blank"
            rel="noopener noreferrer"
          >
            <SiYoutube className="w-full" />
            <div className="sr-only">YouTube</div>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
