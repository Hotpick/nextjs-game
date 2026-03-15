"use client";

import { useRouter } from "next/navigation";

import Hero from "@/components/Hero/Hero";

import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/game");
  };

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <Hero
          title="Who wants to be a millionaire?"
          buttonLabel="Start"
          onButtonClick={handleStart}
        />
      </div>
    </div>
  );
}
