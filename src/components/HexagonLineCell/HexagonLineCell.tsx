import { ButtonHTMLAttributes, HTMLAttributes } from "react";

import styles from "./HexagonLineCell.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLAttributes<HTMLDivElement>;

const HexagonLineCell = ({
  children,
  onClick,
  className,
  disabled,
  ...props
}: Props) => {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      disabled={disabled}
      className={`${styles.root} ${className ?? ""}`}
      onClick={onClick}
      {...props}
    >
      <span className={styles.line} aria-hidden="true"></span>
      <span className={styles.body}>
        <span className={styles.inner}>
          <span className={styles.content}>{children}</span>
        </span>
      </span>
    </Tag>
  );
};

export default HexagonLineCell;
