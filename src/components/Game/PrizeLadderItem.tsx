import HexagonLineCell from "../HexagonLineCell";
import styles from "./PrizeLadderItem.module.css";

type PrizeLadderItemState = "future" | "current" | "past";

type PrizeLadderItemProps = {
  prize: number;
  state: PrizeLadderItemState;
};

type StateColors = {
  border: string;
  textColor: string;
};

const COLORS: Record<PrizeLadderItemState, StateColors> = {
  future: { border: "var(--black-40)", textColor: "var(--black-100)" },
  current: { border: "var(--orange-100)", textColor: "var(--orange-100)" },
  past: { border: "var(--black-40)", textColor: "var(--black-40)" },
};

function formatPrize(prize: number): string {
  return `$${prize.toLocaleString("en-US")}`;
}

const PrizeLadderItem = ({ prize, state }: PrizeLadderItemProps) => {
  const colors = COLORS[state];

  const ladderItemStyles = {
    "--button-border-color": colors.border,
    "--button-text-color": colors.textColor,
    "--button-hover-color": colors.border,
  } as React.CSSProperties;

  return (
    <HexagonLineCell className={styles.root} style={ladderItemStyles}>
      {formatPrize(prize)}
    </HexagonLineCell>
  );
};

export default PrizeLadderItem;
