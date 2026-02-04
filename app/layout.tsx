import React from "react"
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

export const viewport: Viewport = {
  themeColor: '#0f0d0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Curzon House | Private Members Club | Mayfair",
  description: "A cultural work, built to last in the heart of London. An invitation-only members club in Mayfair.",
  keywords: ['private members club', 'Mayfair', 'London', 'luxury', 'exclusive', "Curzon House"],
  openGraph: {
    title: "Curzon House | Private Members Club | Mayfair",
    description: "A cultural work, built to last in the heart of London.",
    type: 'website',
    url: 'https://www.charlenes.co.uk',
    siteName: "Curzon House",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Curzon House | Private Members Club | Mayfair",
    description: "A cultural work, built to last in the heart of London.",
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
  },
  metadataBase: new URL('https://www.charlenes.co.uk'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} font-serif antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
