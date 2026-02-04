import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Curzon House",
  description: "Curzon House brochure - A cultural hospitality platform in the heart of Mayfair",
  robots: {
    index: false,
    follow: false,
  },
}

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
