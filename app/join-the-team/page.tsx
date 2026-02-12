"use client"

import { Navigation } from "@/components/navigation"
import Link from "next/link"

const advisoryBoardRoles = [
  {
    title: "Luxury Brand & Cultural Director",
    description: "Lead the narrative, collaborations, and visual language of Curzon House. Shape the brand identity with a fashion-house mindset, thinking in seasons, capsules, and collections. Ensure the project remains culturally fluent and aesthetically exacting over decades.",
    requirements: "Proven experience shaping the image of leading luxury maisons and luxury groups. Deep understanding of luxury brand strategy and cultural positioning.",
  },
  {
    title: "Director of Experiential Luxury & Client Engagement",
    description: "Design how Curzon House feels – from entrance to reveal, the rhythm of the night, and the afterglow. Choreograph every dinner, salon, and conversation with the precision of a runway show.",
    requirements: "Background in experiential retail, VIP activations, and immersive events for top luxury brands. Expertise in creating memorable, elevated experiences.",
  },
  {
    title: "Head of Luxury Aesthetics & Digital Expression",
    description: "Ensure the house is as alive online as it is offline. Oversee digital art direction, visual identity, and member communications. Align interfaces, photography, and film with the physical architecture.",
    requirements: "Experience in digital art direction and visual identity for luxury brands. Ability to translate physical luxury into compelling digital experiences.",
  },
  {
    title: "Fashion & Cultural Programming Curator",
    description: "Curate intimate shows, ateliers, talks with creative directors, archive presentations, and cross-disciplinary conversations. Treat Curzon House as a permanent salon for fashion, art, and ideas.",
    requirements: "Roots in fashion media, galleries, and brand collaborations. Track record of curating cultural programming that feels closer to a couture schedule than a traditional events calendar.",
  },
  {
    title: "Creative / Cultural Director",
    description: "Ensure the integration of contemporary art, design, and technology is structural rather than decorative. Lead brand-defining collaborations for global luxury houses and blue-chip cultural institutions.",
    requirements: "Proven record of brand-defining collaborations for global luxury houses and blue-chip cultural institutions. Vision for making Curzon House a cultural work that stands beside the world's most ambitious luxury projects.",
  },
  {
    title: "Design & Architecture Partner",
    description: "Create a house that can host the intensity of contemporary art and the softness of long dinners, while aging with the quiet confidence of the best townhouses and grand hotels.",
    requirements: "Award-winning work across five-star hotels, Michelin-level dining rooms, and private clubs in London and other global capitals. Studio with proven track record in luxury hospitality design.",
  },
  {
    title: "Brand & Membership Strategy Lead",
    description: "Design the membership architecture – tiers, cohorts, and growth. Curate member bases where every additional person increases the quality of the room. Ensure the founding circle becomes a long-term community.",
    requirements: "Experience from private clubs, invite-only communities, and family office networks. Track record of curating exclusive member bases with strategic growth.",
  },
  {
    title: "Personal Introductions Liaison",
    description: "Turn cold scenarios warm. Orchestrate introductions – business, creative, and personal – with the nuance of a world-class socialite and the memory of a bespoke concierge. Typically one liaison for every 20–30 members.",
    requirements: "Inspired by the best hosts in Monaco and Mayfair. Exceptional interpersonal skills, cultural fluency, and ability to make meaningful connections. Supported by in-house software for social reach and behavioural analysis.",
  },
  {
    title: "Cohort Captain",
    description: "Shape programming, partnerships, and membership funnels for specific segments. Build 'silent pipelines' of the right people into Curzon House. Deeply rooted in key cohorts: lifestyle 21–30, classical music enthusiasts, bankers, founders, lawyers, Oxbridge alumni, philanthropists, and deal-makers.",
    requirements: "Deep roots in one or more key segments. Ability to shape programming and partnerships for specific communities. Track record of building exclusive networks.",
  },
]

export default function JoinTheTeamPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation sections={[]} activeIndex={0} onNavigate={() => {}} />
      
      <div className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-light tracking-wide text-black mb-6">
              Join the Team
            </h1>
            <p className="text-lg md:text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
              Curzon House is built on a dual spine: maison-grade luxury and precision hospitality. 
              We're assembling a founding team that brings together leaders from global fashion houses, 
              Michelin-starred restaurants, award-winning clubs, and cultural institutions.
            </p>
          </div>

          {/* Advisory Board Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-black mb-2 text-center">
              Advisory Board
            </h2>
            <p className="text-center text-black/70 mb-12 text-sm uppercase tracking-wider">
              Cultural & Strategic Leadership
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisoryBoardRoles.map((role, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md border border-black/10 hover:shadow-lg transition-all duration-300 hover:border-gold/40"
                >
                  <h3 className="text-xl font-light tracking-wide text-black mb-4 leading-tight">
                    {role.title}
                  </h3>
                  <p className="text-black/75 mb-6 leading-relaxed text-sm">
                    {role.description}
                  </p>
                  <div className="pt-4 border-t border-black/15">
                    <p className="text-xs uppercase tracking-wider text-black/60 mb-2 font-medium">Requirements</p>
                    <p className="text-black/70 text-sm leading-relaxed">
                      {role.requirements}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C Suite Section Placeholder */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-black mb-2 text-center">
              C Suite
            </h2>
            <p className="text-center text-black/70 mb-12 text-sm uppercase tracking-wider">
              Operational Leadership
            </p>
            <div className="text-center text-black/60">
              <p className="text-sm">Coming soon</p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center pt-12 border-t border-black/15">
            <p className="text-black/80 mb-6 text-lg">
              Interested in joining our team?
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border-2 border-black/30 text-black hover:bg-black hover:text-cream transition-all duration-300 uppercase tracking-wider text-sm font-light"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
