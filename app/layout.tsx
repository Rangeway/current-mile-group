import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://currentmile.com"),
  title: "Current Mile Group",
  description:
    "A portfolio platform across mobility, energy, infrastructure, software, and hospitality.",
  openGraph: {
    title: "Current Mile Group",
    description:
      "A portfolio built for the long road—across mobility, energy, infrastructure, software, and hospitality.",
    url: "https://currentmile.com",
    siteName: "Current Mile Group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
