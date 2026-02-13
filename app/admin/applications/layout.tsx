import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Candidate Tracker | Curzon House Admin",
  description: "Manage and track job applications",
}

export default function AdminApplicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
