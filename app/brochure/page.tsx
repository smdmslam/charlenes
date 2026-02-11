"use client"

import React from "react"
import Image from "next/image"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import "./brochure.css"

// Content data extracted from navigation modals
const brochureContent = {
  cover: {
    title: "Curzon House",
    subtitle: "A cultural hospitality platform at the intersection of luxury, art, cuisine, and high-trust global relationships",
    location: "London Mayfair",
    openingDate: "Scheduled to open March 2027",
    heroImage: "/images/Lobby1.png",
  },
  about: {
    title: "About This Project",
    openingMessage: "Curzon House is scheduled to open March 2027",
    quote: "A cultural hospitality platform at the intersection of luxury, art, cuisine, and high-trust global relationships—built for people defined by intellect, achievement, and discretion.",
    paragraphs: [
      "A place that reflects the evolution of culture itself: global, intelligent, emotionally resonant, and unmistakably rare. In the heart of Mayfair, we propose a new kind of cultural hospitality platform—one that is not designed to follow precedent, but to extend it.",
      "Technology plays a role including advanced personalization and operational intelligence enabling anticipatory service, comfort, and emotional ease. The experience is inviting and comfortable by design, consciously welcoming members whose expectations extend beyond the conventions of legacy clubs.",
      "The project is conceived for durability. The operating platform and capital structure are clearly delineated, governance is institutional in nature, and the ambition is long-term. This is not a lifestyle concept built for trend cycles, but a cultural asset designed to mature, evolve, and remain relevant across generations. It is a deliberate act of creation—rooted in place, elevated by art, and guided by a belief in human creativity is luxury.",
      "We present this opportunity to members who recognize that the most valuable asset are people whose lives tell an interesting story.",
    ],
  },
  experience: {
    title: "The Experience",
    paragraphs: [
      "The project is structured as a layered experience.",
      "At street level, Curzon House opens with a Michelin-calibre restaurant that engages the city directly — confident, composed, and uncompromising in quality. It establishes the tone of the house: serious cuisine, intelligent energy, and quiet relevance.",
      "Ascending through the building, the atmosphere shifts. Members' bars, lounges, and salons are arranged as a sequence of increasingly private spaces, designed for conversation, continuity, and discretion rather than spectacle. Service becomes more anticipatory, more personal — shaped by familiarity rather than formality.",
      "At the upper levels, private dining rooms and salons provide a setting for focused engagement: hosting, negotiation, celebration, and retreat. Each space is conceived as part of a coherent journey, where architecture, art, and hospitality work together to support long-form presence.",
      "The result is a layered experience — open where it should be, protected where it must be — allowing members to move fluidly between public vitality and private assurance within a single, unified house.",
    ],
  },
  timeline: {
    title: "Project Timeline",
    phases: [
      {
        phase: "Phase I",
        period: "Jan–Mar 2026",
        items: ["Formation", "Concept finalised", "Founding Circle"],
      },
      {
        phase: "Phase II",
        period: "Apr–Jun 2026",
        items: ["Design & Curation", "Architecture & interiors", "Partners appointed"],
      },
      {
        phase: "Phase III",
        period: "Jul–Nov 2026",
        items: ["Build & Preparation", "Construction & fit-out", "Staff training"],
      },
      {
        phase: "Phase IV",
        period: "Dec 2026 – Q1 2027",
        items: ["Opening", "Members' preview", "Full operations"],
      },
    ],
    caption: "Built deliberately. Opened quietly. Designed to endure.",
  },
  history: {
    title: "History",
    subtitle: "Curzon Street: From Georgian Elegance to Cultural Powerhouse",
    sections: [
      {
        heading: "The Aristocratic Foundation",
        paragraphs: [
          "Curzon Street emerged during London's westward expansion in the early 18th century, as Mayfair transformed from open fields into an enclave of power. Named after the Curzon family of Kedleston—an Anglo-Norman dynasty—it quickly became home to Britain's elite. At the heart of this development, the House was established in the mid-1750s as a grand Georgian mansion, quickly evolving into one of the area's most significant private residences. In the 1770s, it underwent a neoclassical masterpiece transformation by Robert Adam, who added the distinctive circular dining room that would anchor formal entertaining for centuries to come.",
          "This was never just a townhouse; it was a fully-fledged London mansion designed for ministerial dinners and aristocratic salons. Residents of the street included future Prime Ministers like Benjamin Disraeli and influential diplomats, whose presence stamped the street with an authority it has never lost. The House stood as a physical manifestation of this power, a stage for the architects of British political and intellectual life.",
        ],
      },
      {
        heading: "A Stage for Private Splendour",
        paragraphs: [
          "Through the 19th century, the House remained within the highest social echelon, serving as the address for Princess Sophia Matilda, granddaughter of George III. Its rooms hosted royal visitors and political musicales, cementing its reputation as a court-adjacent landmark. In the 1890s, it was expanded further with the addition of a grand ballroom and a first-floor apse, tilting even further into spectacle. It became a byword for private glamour—the kind of place where full-orchestra dances and society weddings defined the London Season.",
          "This atmosphere was captured by Oscar Wilde, who placed characters in the street to signify sophisticated West End society. Later, it became the heart of 'Curzon Street Baroque,' a term coined to describe the inter-war, intellectually fashionable interiors that blended heritage with a sharp, modern wit. From the literary cameos of The Picture of Dorian Gray to real-world royal levees, the House has always been shorthand for patrician life.",
        ],
      },
      {
        heading: "The Evolution of Hospitality",
        paragraphs: [
          "The 20th century saw the property transition from a private salon into a more dynamic cultural hub. When the legendary high-society confectioner Gunter’s occupied the building, it became a serviced entertaining hub, producing elaborate cakes and banqueting for the world's most influential figures. This period bridged the gap between the private residence and the modern club, proving that the House was uniquely suited for high-stakes sociability.",
          "Even in its later incarnations—hosting the Royal Worcester Porcelain Company and eventually becoming home to one of London's most exclusive gambling clubs in the 1980s—the House maintained its thread of genteel hospitality and late-night assurance. The same rooms that hosted cabinet dinners in the 1770s became the setting for high-stakes gaming and members-only interaction. Today, as it enters its next chapter, it remains a barometer of London's cultural aspirations—a place where history is not just preserved, but reimagined.",
        ],
      },
    ],
    closing: "In essence, Curzon Street remains what it has always been: a barometer of London's cultural and social aspirations, a place where history and innovation coexist, and where exclusivity is measured not just in price tags but in access to taste, refinement, and influence.",
  },
  gallery: {
    title: "Gallery",
    subtitle: "A selection of spaces",
    spaces: [
      {
        title: "The Entrance",
        description: "A discreet doorway in the heart of Mayfair, where London's most discerning gather.",
        image: "/images/Lobby1.png",
      },
      {
        title: "Michelin Dining",
        description: "World-class gastronomy anchors the ground floor—open to the city, uncompromising in quality.",
        image: "/images/dining1.png",
      },
      {
        title: "Members Lounge",
        description: "Privacy, hierarchy, and service that moves beyond the traditional private club model.",
        image: "/images/members loung 3.png",
      },
    ],
  },
  philanthropy: {
    title: "Philanthropy",
    categories: [
      {
        heading: "Healthcare Focused",
        organizations: [
          "St. Jude Children's Research Hospital",
          "Cancer Research UK",
          "British Heart Foundation",
          "Macmillan Cancer Support",
        ],
      },
      {
        heading: "Arts and Culture",
        organizations: [
          "Royal Opera House",
          "London Symphony Orchestra",
          "Royal Shakespeare Company",
          "Tate",
          "Museum of Pop Culture (MoPOP), Seattle",
        ],
      },
      {
        heading: "Arts in Health / Art & Healing",
        organizations: [
          "National Organization for Arts in Health (NOAH)",
          "Women With Wings Foundation",
          "UCLA Art & Global Health Center",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    email: "smdm@dmwfinancegroup.com",
    partner: {
      name: "Swiss Design & Management Partner",
      company: "DMW Finance Group",
      location: "Switzerland",
      address: "Grosspeter Tower, Grosspeteranlage 29",
      city: "4052 Basel",
      website: "www.dmwfinancegroup.com",
      websiteUrl: "https://www.dmwfinancegroup.com",
    },
  },
  membership: {
    mention: "For membership inquiries and applications, please contact us using the information provided in the Contact section.",
  },
}

export default function BrochurePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="brochure-container">
      {/* Print Button - Hidden in print */}
      <div className="no-print print-controls">
        <Button
          onClick={handlePrint}
          className="fixed top-8 right-8 z-50 bg-gold text-background hover:bg-gold-muted"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print / Export PDF
        </Button>
      </div>

      {/* Cover Page */}
      <div className="brochure-page cover-page">
        <div className="cover-image-wrapper">
          <Image
            src={brochureContent.cover.heroImage}
            alt="Curzon House"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="cover-overlay" />
        </div>
        <div className="cover-text">
          <h1 className="cover-title">{brochureContent.cover.title}</h1>
          <p className="cover-subtitle">{brochureContent.cover.subtitle}</p>
          <p className="cover-location">{brochureContent.cover.location}</p>
          <p className="cover-date">{brochureContent.cover.openingDate}</p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="brochure-page toc-page">
        <h2 className="section-title">Table of Contents</h2>
        <nav className="toc-list">
          <a href="#about" className="toc-item">
            <span className="toc-number">1</span>
            <span className="toc-text">About This Project</span>
          </a>
          <a href="#experience" className="toc-item">
            <span className="toc-number">2</span>
            <span className="toc-text">The Experience</span>
          </a>
          <a href="#timeline" className="toc-item">
            <span className="toc-number">3</span>
            <span className="toc-text">Project Timeline</span>
          </a>
          <a href="#history" className="toc-item">
            <span className="toc-number">4</span>
            <span className="toc-text">History</span>
          </a>
          <a href="#gallery" className="toc-item">
            <span className="toc-number">5</span>
            <span className="toc-text">Gallery</span>
          </a>
          <a href="#philanthropy" className="toc-item">
            <span className="toc-number">6</span>
            <span className="toc-text">Philanthropy</span>
          </a>
          <a href="#contact" className="toc-item">
            <span className="toc-number">7</span>
            <span className="toc-text">Contact</span>
          </a>
        </nav>
      </div>

      {/* About Section */}
      <div id="about" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.about.title}</h2>
        <div className="section-content">
          <p className="opening-message">{brochureContent.about.openingMessage}</p>
          <blockquote className="section-quote">{brochureContent.about.quote}</blockquote>
          {brochureContent.about.paragraphs.map((para, idx) => (
            <p key={idx} className="section-paragraph">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.experience.title}</h2>
        <div className="section-content">
          {brochureContent.experience.paragraphs.map((para, idx) => (
            <p key={idx} className="section-paragraph">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div id="timeline" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.timeline.title}</h2>
        <div className="timeline-container">
          <div className="timeline-grid">
            {brochureContent.timeline.phases.map((phase, idx) => (
              <div key={idx} className="timeline-phase">
                <div className="phase-header">
                  <h3 className="phase-title">{phase.phase}</h3>
                  <p className="phase-period">{phase.period}</p>
                </div>
                <ul className="phase-items">
                  {phase.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="timeline-caption">{brochureContent.timeline.caption}</p>
        </div>
      </div>

      {/* History Section */}
      <div id="history" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.history.title}</h2>
        <h3 className="section-subtitle">{brochureContent.history.subtitle}</h3>
        <div className="section-content">
          {brochureContent.history.sections.map((section, idx) => (
            <div key={idx} className="history-section">
              <h4 className="history-heading">{section.heading}</h4>
              {section.paragraphs.map((para, paraIdx) => (
                <p key={paraIdx} className="section-paragraph">
                  {para}
                </p>
              ))}
            </div>
          ))}
          <blockquote className="section-quote history-closing">
            {brochureContent.history.closing}
          </blockquote>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.gallery.title}</h2>
        <p className="section-subtitle">{brochureContent.gallery.subtitle}</p>
        <div className="gallery-grid">
          {brochureContent.gallery.spaces.map((space, idx) => (
            <div key={idx} className="gallery-item">
              <div className="gallery-image-wrapper">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="gallery-title">{space.title}</h3>
              <p className="gallery-description">{space.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Philanthropy Section */}
      <div id="philanthropy" className="brochure-page content-page">
        <h2 className="section-title">{brochureContent.philanthropy.title}</h2>
        <div className="philanthropy-content">
          {brochureContent.philanthropy.categories.map((category, idx) => (
            <div key={idx} className="philanthropy-category">
              <h3 className="philanthropy-heading">{category.heading}</h3>
              <ul className="philanthropy-list">
                {category.organizations.map((org, orgIdx) => (
                  <li key={orgIdx}>{org}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Mention */}
      <div className="brochure-page content-page membership-mention">
        <div className="section-content">
          <p className="section-paragraph">{brochureContent.membership.mention}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="brochure-page content-page contact-page">
        <h2 className="section-title">{brochureContent.contact.title}</h2>
        <div className="contact-content">
          <div className="contact-section">
            <h3 className="contact-heading">Email</h3>
            <p className="contact-info">{brochureContent.contact.email}</p>
          </div>
          <div className="contact-section">
            <h3 className="contact-heading">{brochureContent.contact.partner.name}</h3>
            <div className="contact-details">
              <p>{brochureContent.contact.partner.company}</p>
              <p>{brochureContent.contact.partner.location}</p>
              <p>{brochureContent.contact.partner.address}</p>
              <p>{brochureContent.contact.partner.city}</p>
              <p>
                <a
                  href={brochureContent.contact.partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  {brochureContent.contact.partner.website}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
