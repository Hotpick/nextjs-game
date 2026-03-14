import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  inline?: boolean;
};

const Button = ({
  children,
  onClick,
  type = "button",
  inline = false,
  disabled = false,
}: ButtonProps) => {
  const classNames = inline ? `${styles.root} ${styles.inline}` : styles.root;

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
