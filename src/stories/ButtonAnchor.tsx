import clsx from "clsx";
import "./buttonAnchor.css";

interface ButtonAnchorProps {
  size: string;
  title: string;
  primary?: boolean;
  href: string;
}

const ButtonAnchor = ({
  size,
  title,
  primary,
  href,
  ...props
}: ButtonAnchorProps) => {
  const mode = primary ? "storybook-button--primary" : "storybook-button";
  const classnames = clsx({
    [`storybook-button--${size}`]: true,
    [mode]: true,
  });
  return (
    <button type="button" className={classnames} {...props}>
      <a href={href}>{title}</a>
    </button>
  );
};

export default ButtonAnchor;
