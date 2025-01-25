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
  title: 'Futuros Tech - Sinais e Análises para Day Trade',
  description: 'Entradas Diárias com Relatórios de Alta Performance Comprovada. Utilizado por +10.000 investidores ao redor do mundo. Taxa de acerto superior a 80%.',
  keywords: 'day trade, sinais, análise técnica, mercado financeiro, investimentos, futuros, trading',
  openGraph: {
    title: 'Futuros Tech - Sinais e Análises para Day Trade',
    description: 'Entradas Diárias com Relatórios de Alta Performance Comprovada. Utilizado por +10.000 investidores ao redor do mundo.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/logo.jpg',
        width: 60,
        height: 18,
        alt: 'Futuros Tech Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futuros Tech - Sinais e Análises para Day Trade',
    description: 'Entradas Diárias com Relatórios de Alta Performance Comprovada. Utilizado por +10.000 investidores ao redor do mundo.',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://futurostech.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
