import { Link } from "react-router-dom";

interface Props {
  children: string;
  to?: string;
  className?: string;
  href?: string;
  disabled?: boolean;
  target?: string;
  type?: string;
}

interface Attributes {
  target?: string;
  rel?: string;
}

const Button = ({
  children,
  to,
  className,
  href,
  disabled,
  target,
  type,
}: Props) => {
  if (type === "submit") {
    return (
      <button
        disabled={disabled}
        className={`button ${className || ""}`}
        type="submit"
      >
        <span className="px-3">{children}</span>
      </button>
    );
  }

  // Open in new window?
  const attributes: Attributes = {};
  if (target === "_blank") {
    attributes.target = "_blank";
    attributes.rel = "noopener";
  }

  if (href) {
    return (
      <a {...attributes} className={`button ${className || ""}`} href={href}>
        <span className="hidden md:block w-6 border-t border-white" />
        <span className="px-3">{children}</span>
        <span className="hidden md:block w-6 border-t border-white" />
      </a>
    );
  }

  return (
    <Link className={`button ${className || ""}`} to={to}>
      {children}
    </Link>
  );
};

export default Button;
