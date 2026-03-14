"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Col from "@/components/Col";
import Row from "@/components/Row";

import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/game");
  };

  return (
    <div className={`flex align-center ${styles.root}`}>
      <div className="container">
        <Row align="center" gap="16">
          <Col span={12} md={6} className="flex justify-center">
            <NextImage
              src="/thumbUp.svg"
              alt="Thumbs up illustration"
              width={451}
              height={356}
              priority
              className={styles.image}
            />
          </Col>
          <Col span={12} md={6}>
            <h1 className={styles.title}>Who wants to be a millionaire?</h1>
            <Button onClick={handleStart} inline>
              Start
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
