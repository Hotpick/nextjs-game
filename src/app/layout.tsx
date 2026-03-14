import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GameProvider } from "@/context/GameContext";

import styles from "./layout.module.css";

import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Who Wants to Be a Millionaire?",
  description: "Test your knowledge and win up to $1,000,000!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <GameProvider>
          <div className={styles.root}>
            <main className={styles.main}>{children}</main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
