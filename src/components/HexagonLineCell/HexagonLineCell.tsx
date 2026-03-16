import { ButtonHTMLAttributes, HTMLAttributes } from "react";

import styles from "./HexagonLineCell.module.css";

type Props = {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> &
  Omit<HTMLAttributes<HTMLDivElement>, "prefix">;

const HexagonLineCell = ({
  children,
  prefix,
  suffix,
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
          <span className={styles.content}>
            {prefix && <span className={styles.prefix}>{prefix}</span>}
            <span className={styles.contentInner}>{children}</span>
            {suffix && <span className={styles.suffix}>{suffix}</span>}
          </span>
        </span>
      </span>
    </Tag>
  );
};

export default HexagonLineCell;
