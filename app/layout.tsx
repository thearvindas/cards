import type { Metadata } from "next";
import "nes.css/css/nes.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card Game Finder - Find Games You Can Play",
  description: "Find the perfect card game based on your cards and number of players. Discover hundreds of card games with detailed rules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
