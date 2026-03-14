import PrizeLadderItem from "@/components/PrizeLadderItem";

import styles from "./PrizeLadder.module.css";

type PrizeLadderProps = {
  prizes: number[];
  currentIndex: number;
};

const PrizeLadder = ({ prizes, currentIndex }: PrizeLadderProps) => {
  // Display highest prize at top
  const reversedPrizes = [...prizes].reverse();

  return (
    <div className={styles.root}>
      {reversedPrizes.map((prize, reversedIdx) => {
        const originalIndex = prizes.length - 1 - reversedIdx;
        let state: "future" | "current" | "past";
        if (originalIndex > currentIndex) {
          state = "future";
        } else if (originalIndex === currentIndex) {
          state = "current";
        } else {
          state = "past";
        }

        return <PrizeLadderItem key={prize} prize={prize} state={state} />;
      })}
    </div>
  );
};

export default PrizeLadder;
