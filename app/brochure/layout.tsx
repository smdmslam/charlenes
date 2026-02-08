import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Digital Brochure | Curzon House Private Members Club",
  description: "Explore the vision, history, and exclusive experience of Curzon House. A cultural hospitality platform in Mayfair, London.",
  openGraph: {
    title: "Curzon House Digital Brochure",
    description: "A cultural hospitality platform at the intersection of luxury, art, and high-trust relationships.",
    images: ['/images/Lobby1.png'],
  }
}


export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
