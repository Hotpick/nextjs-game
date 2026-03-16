import NextImage from "next/image";

import Button from "@/components/Button";

import styles from "./Hero.module.css";

type HeroProps = {
  title: string;
  subtitle?: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

const Hero = ({ title, subtitle, buttonLabel, onButtonClick }: HeroProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageSection}>
        <NextImage
          src="/thumbUp.svg"
          alt="Thumbs up illustration"
          width={451}
          height={356}
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.contentSection}>
        <div>
          {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
          <h1>{title}</h1>
        </div>
        <Button onClick={onButtonClick} inline className={styles.button}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
