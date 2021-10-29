const Button = ({ children, to, className, href, disabled, target, type }) => {
  if (type === 'submit') {
    return (
      <button
        disabled={disabled}
        className={`button ${className || ''}`}
        type="submit"
      >
        <span className="px-3">{children}</span>
      </button>
    )
  }

  // Open in new window?
  const attributes = {}
  if (target === '_blank') {
    attributes.target = '_blank'
    attributes.rel = 'noopener'
  }

  if (href) {
    return (
      <a {...attributes} className={`button ${className || ''}`} href={href}>
        <span className="hidden md:block w-6 border-t border-white" />
        <span className="px-3">{children}</span>
        <span className="hidden md:block w-6 border-t border-white" />
      </a>
    )
  }

  return (
    <a className={`button ${className || ''}`} href={to}>
      {children}
    </a>
  )
}

export default Button
