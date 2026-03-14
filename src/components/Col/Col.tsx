import styles from "./Col.module.css";

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";

type Props = {
  children: React.ReactNode;
  span?: ColSize;
  md?: ColSize;
  className?: string;
};

const Col = ({ children, span = 12, md, className = "" }: Props) => {
  const style: React.CSSProperties = {
    "--col-span": span === "auto" ? 12 : span,
    ...(md !== undefined && { "--col-md": md === "auto" ? 12 : md }),
  } as React.CSSProperties;

  return (
    <div className={`${styles.root} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

export default Col;
