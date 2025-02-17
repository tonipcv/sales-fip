import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import FacebookPixel from '@/components/FacebookPixel';

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIP - K17",
  description: "Formação para Investidor Profissional - K17",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "FIP - K17",
    description: "Formação para Investidor Profissional - K17",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FIP - K17",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4ADE80" />
        <FacebookPixel />
      </head>
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}