import React from "react"
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/auth-context'
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
  title: {
    default: "Curzon House | Private Members Club | Mayfair",
    template: "%s | Curzon House"
  },
  description: "A cultural work, built to last in the heart of London. An invitation-only members club in Mayfair, offering exclusive access to luxury and London's elite.",
  keywords: ['private members club', 'Mayfair', 'London', 'luxury', 'exclusive', 'Curzon House', 'London networking', 'elite lifestyle'],
  authors: [{ name: 'Curzon House' }],
  creator: 'Curzon House',
  publisher: 'Curzon House',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Curzon House | Private Members Club | Mayfair",
    description: "A cultural work, built to last in the heart of London. An invitation-only members club in Mayfair.",
    type: 'website',
    url: 'https://www.thecurzonhouse.co.uk',
    siteName: "Curzon House",
    locale: 'en_GB',
    images: [
      {
        url: 'https://www.thecurzonhouse.co.uk/images/Lobby1.png',
        width: 1200,
        height: 630,
        alt: 'Curzon House Lobby - Private Members Club in Mayfair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Curzon House | Private Members Club | Mayfair",
    description: "A cultural work, built to last in the heart of London.",
    images: ['https://www.thecurzonhouse.co.uk/images/Lobby1.png'],
  },
  alternates: {
    canonical: 'https://www.thecurzonhouse.co.uk',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://www.thecurzonhouse.co.uk'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Curzon House',
  url: 'https://www.thecurzonhouse.co.uk',
  logo: 'https://www.thecurzonhouse.co.uk/favicon.svg',
  description: 'An invitation-only private members club in Mayfair, London.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mayfair',
    addressRegion: 'London',
    addressCountry: 'GB',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Membership Inquiry',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} font-serif antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
