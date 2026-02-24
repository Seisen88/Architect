import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Government Center, E.B. Magalona — Architecture Design Showcase",
  description:
    "Architectural showcase by Erica Mae D. Pancho, BS Architecture 5C, LCC Bacolod. New Government Center for Enrique B. Magalona, Negros Occidental — Sheets A01–A05. Supervised by Ar. Gary Peter L. Bello, UAP.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
