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
          "The street emerged during London's westward expansion in the late 17th and early 18th centuries, as Mayfair transformed from open fields into an enclave of power. Named after the Curzon family—an Anglo-Norman dynasty with deep English roots—the street quickly became home to Britain's elite. Members of Parliament, future Prime Ministers like Benjamin Disraeli (who lived there until 1881), and influential diplomats like Lord Macartney chose Curzon Street as their London base. These weren't casual residents; they were the architects of British political and intellectual life, and their presence stamped the street with an authority it has never lost.",
          "The Georgian townhouses that line Curzon Street, predominantly dating from the 1750s-60s and largely Grade II listed, still reflect this heritage. Post-World War II redevelopment converted many into luxury apartments, but the facades remained—a deliberate choice to preserve the street's aristocratic character even as its function evolved.",
        ],
      },
      {
        heading: "Literature's Favorite Address",
        paragraphs: [
          "Oscar Wilde understood Curzon Street's symbolic power. He placed his most memorable characters there: Lord Henry Wotton from The Picture of Dorian Gray and Mrs Erlynne from Lady Windermere's Fan (specifically at 84A Curzon Street). Roald Dahl and William Makepeace Thackeray also set scenes on this street. Through their fiction, these authors transformed Curzon into shorthand for sophisticated West End society—a literary code that readers immediately recognized as the seat of elegance and moral complexity.",
        ],
      },
      {
        heading: "The Modern Cultural Hub",
        paragraphs: [
          "The Curzon Mayfair Cinema, built between 1963-66, represents one of London's most significant post-war cinema buildings and stands as a Grade II listed structure. For over 90 years, it hosted West End film premieres and shaped London's film culture—until its closure in 2025 due to redevelopment by landlord Fantasio. The cinema's departure marks a pivotal moment in the street's evolution, as the historic venue transitions toward a new vision that includes a members' club and restaurant alongside a reimagined cinema.",
          "Beyond the cinema, Curzon Street anchors one of the world's densest concentrations of visual culture. Over 130 art galleries operate within the broader Mayfair and St James area, positioning the street as a nexus for contemporary and fine art.",
        ],
      },
      {
        heading: "Luxury Reimagined",
        paragraphs: [
          "Recent developments demonstrate how Curzon Street maintains its prestige while embracing modern luxury. 60 Curzon, an eight-storey residential building designed by French architect Thierry W. Despont, features 32 Art Deco-inspired residences that marry contemporary amenities with classical aesthetics. The building occupies the site of the historic Mirabelle restaurant, which operated from 1936 and attracted everyone from Winston Churchill to Leonardo DiCaprio—illustrating how the street's legendary venues continue to shape London's cultural memory even as they evolve.",
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
