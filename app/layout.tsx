import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    images: [
      {
        url: "/brand/cmg-social-512.png",
        width: 512,
        height: 512,
        alt: "Current Mile Group CMG monogram",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Current Mile Group",
    description:
      "A portfolio built for the long road—across mobility, energy, infrastructure, software, and hospitality.",
    images: ["/brand/cmg-social-512.png"],
  },
  icons: {
    icon: "/brand/cmg-favicon-16-divider.svg",
    shortcut: "/brand/cmg-favicon-16-divider.svg",
    apple: "/brand/cmg-app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
