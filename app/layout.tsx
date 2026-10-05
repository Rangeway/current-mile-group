import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Outfit } from "next/font/google";
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

const chargeVia = Outfit({
  variable: "--font-chargevia",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://currentmile.com"),
  title: "Current Mile Group",
  description:
    "A portfolio parent in development for companies working across mobility, energy, infrastructure, software, and hospitality.",
  openGraph: {
    title: "Current Mile Group",
    description:
      "A strategic umbrella for Rangeway, ChargeVia by Rangeway, and AmpIQ. Different businesses. A shared perspective.",
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
      "A strategic umbrella for Rangeway, ChargeVia by Rangeway, and AmpIQ. Different businesses. A shared perspective.",
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
      <body className={`${archivo.variable} ${ibmPlexMono.variable} ${chargeVia.variable}`}>
        {children}
      </body>
    </html>
  );
}
