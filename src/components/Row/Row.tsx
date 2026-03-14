import styles from "./Row.module.css";

type Props = {
  children: React.ReactNode;
  gap?: string;
  className?: string;
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
};

const Row = ({
  children,
  gap = "0",
  align = "start",
  justify = "start",
  direction = "row",
  className = "",
}: Props) => {
  const style: React.CSSProperties = {
    gap: `${gap}px`,
    "--row-gap": `${gap}px`,
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
  } as React.CSSProperties;

  return (
    <div className={`${styles.root} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

export default Row;
