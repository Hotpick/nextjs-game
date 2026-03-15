import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  inline?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  onClick,
  type = "button",
  inline = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const classNames = [
    styles.root,
    inline ? styles.inline : "",
    className ?? "",
  ].join(" ");

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
