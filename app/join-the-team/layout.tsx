import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Join the Team | Curzon House",
  description: "Join the founding team at Curzon House. We're assembling leaders from global fashion houses, Michelin-starred restaurants, award-winning clubs, and cultural institutions.",
  openGraph: {
    title: "Join the Team | Curzon House",
    description: "Join the founding team at Curzon House. Opportunities in luxury hospitality, cultural programming, and member experience.",
  }
}

export default function JoinTheTeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
