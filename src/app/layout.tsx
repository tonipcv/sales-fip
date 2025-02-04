import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FacebookPixel from '@/components/FacebookPixel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'FIP - Formação para Investidor Profissional + Acesso ao APP',
  description: 'Formação completa do zero ao avançado com acesso ao APP exclusivo para sinais de operações todos os dias da semana.',
  openGraph: {
    title: 'FIP - Formação para Investidor Profissional + Acesso ao APP',
    description: 'Formação completa do zero ao avançado com acesso ao APP exclusivo para sinais de operações todos os dias da semana.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FIP - Formação para Investidor Profissional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIP - Formação para Investidor Profissional + Acesso ao APP',
    description: 'Formação completa do zero ao avançado com acesso ao APP exclusivo para sinais de operações todos os dias da semana.',
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
        <link rel="icon" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="shortcut icon" href="/logo.jpg" />
        <link rel="canonical" href="https://futurostech.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <FacebookPixel />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}