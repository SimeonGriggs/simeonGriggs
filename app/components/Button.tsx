import {Link} from '@remix-run/react'

interface Props {
  children: string
  to?: string
  className?: string
  href?: string
  disabled?: boolean
  target?: string
  type?: string
}

interface Attributes {
  target?: string
  rel?: string
}

const buttonClasses = (className = ``) => {
  return className ? [`button`, className].join(` `) : `button`
}

const Button = ({children, to, className, href, disabled, target, type}: Props) => {
  if (type === 'submit') {
    return (
      <button disabled={disabled} className={buttonClasses(className)} type="submit">
        <span className="hidden w-6 border-t border-white md:block" />
        <span className="px-3">{children}</span>
        <span className="hidden w-6 border-t border-white md:block" />
      </button>
    )
  }

  // Open in new window?
  const attributes: Attributes = {}
  if (target === '_blank') {
    attributes.target = '_blank'
    attributes.rel = 'noopener'
  }

  if (href) {
    return (
      <a {...attributes} className={buttonClasses(className)} href={href}>
        <span className="hidden w-6 border-t border-white md:block" />
        <span className="px-3">{children}</span>
        <span className="hidden w-6 border-t border-white md:block" />
      </a>
    )
  }

  if (to) {
    return (
      <Link className={buttonClasses(className)} to={to}>
        {children}
      </Link>
    )
  }

  return <>children</>
}

export default Button
