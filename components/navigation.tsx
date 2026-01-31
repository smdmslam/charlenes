"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"

interface NavigationProps {
  sections: Array<{ id: string; title: string }>
  activeIndex: number
  onNavigate: (index: number) => void
}

export function Navigation({ sections, activeIndex, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => onNavigate(0)}
            className="flex flex-col text-left cursor-pointer hover:opacity-80 transition-opacity duration-300"
            aria-label="Navigate to home"
          >
            <span className="text-2xl md:text-3xl font-light tracking-[0.15em] text-cream">
              Charlene's
            </span>
            <span className="text-xs tracking-[0.4em] text-gold-muted uppercase">
              LONDON MAYFAIR
            </span>
          </motion.button>

          {/* Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-cream hover:text-gold transition-colors duration-300"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </header>

      {/* Side navigation dots */}
      <nav className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            onClick={() => onNavigate(index)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Navigate to ${section.title}`}
          >
            {/* Label (appears on hover) */}
            <span className="text-xs tracking-[0.2em] text-gold-muted uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right">
              {section.title}
            </span>
            
            {/* Dot */}
            <div className="relative w-2 h-2">
              <motion.div
                className="absolute inset-0 rounded-full bg-gold"
                initial={false}
                animate={{
                  scale: activeIndex === index ? 1 : 0.5,
                  opacity: activeIndex === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
              {activeIndex === index && (
                <motion.div
                  layoutId="nav-ring"
                  className="absolute -inset-1.5 rounded-full border border-gold/50"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.button>
        ))}
      </nav>

      {/* Bottom navigation bar - mobile */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 py-4"
      >
        <div className="flex justify-center gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onNavigate(index)}
              className="group p-2 cursor-pointer"
              aria-label={`Navigate to ${section.title}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gold scale-150"
                    : "bg-gold/30 scale-100"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="fixed bottom-0 left-0 right-0 h-px bg-border/20 origin-left"
      >
        <motion.div
          className="h-full bg-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (activeIndex + 1) / sections.length }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Modal Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 bottom-0 w-1/2 bg-background border-l border-gold/20 z-[101] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-cream hover:text-gold transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Menu Content */}
              <div className="px-8 pb-8">
                <nav className="flex flex-col gap-8">
                  {/* ABOUT */}
                  <button
                    onClick={() => {
                      setIsAboutOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                  >
                    ABOUT
                  </button>

                  {/* THE EXPERIENCE */}
                  <button
                    onClick={() => {
                      // TODO: Navigate to experience section
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                  >
                    THE EXPERIENCE
                  </button>

                  {/* MEMBERSHIP */}
                  <button
                    onClick={() => {
                      // TODO: Navigate to membership section
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                  >
                    MEMBERSHIP
                  </button>

                  {/* GALLERY */}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                      className="flex items-center justify-between text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      <span>GALLERY</span>
                      {isGalleryOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    
                    {/* Gallery Submenu */}
                    <AnimatePresence>
                      {isGalleryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pl-6 border-l border-gold/20">
                            {sections.map((section, index) => (
                              <button
                                key={section.id}
                                onClick={() => {
                                  onNavigate(index)
                                  setIsMenuOpen(false)
                                }}
                                className={`text-left text-base tracking-[0.1em] uppercase transition-colors duration-300 ${
                                  activeIndex === index
                                    ? "text-gold"
                                    : "text-cream/70 hover:text-gold-muted"
                                }`}
                              >
                                {section.title}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsAboutOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[103] flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background border border-gold/20 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <div className="sticky top-0 bg-background border-b border-gold/20 flex justify-end p-6">
                  <button
                    onClick={() => setIsAboutOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-8 md:p-12 space-y-6 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-4">
                    ABOUT
                  </h1>
                  
                  <h2 className="text-4xl md:text-5xl font-light tracking-[0.1em] text-cream mb-4">
                    Charlene's
                  </h2>
                  
                  {/* Opening Message */}
                  <div className="mb-8">
                    <p className="text-xl md:text-2xl text-cream font-light tracking-[0.1em]">
                      Charlene's is scheduled to open December 2026
                    </p>
                  </div>
                  
                  <p className="text-lg md:text-xl text-cream/90 leading-relaxed italic pl-8 md:pl-12 border-l-2 border-gold/30">
                    "A cultural hospitality platform at the intersection of luxury, art, cuisine, and high-trust global relationships—built for people defined by intellect, achievement, and discretion rather than pedigree alone."
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    A place that reflects the evolution of culture itself: global, intelligent, emotionally resonant, and unmistakably rare. In the heart of Mayfair, we propose a new kind of cultural hospitality platform—one that is not designed to follow precedent, but to extend it.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    The project is structured as a layered experience.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans pl-8 md:pl-12 border-l-2 border-gold/20">
                    At street level, Charlene's opens with a Michelin-calibre restaurant that engages the city directly — confident, composed, and uncompromising in quality. It establishes the tone of the house: serious cuisine, intelligent energy, and quiet relevance.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans pl-8 md:pl-12 border-l-2 border-gold/20">
                    Ascending through the building, the atmosphere shifts. Members' bars, lounges, and salons are arranged as a sequence of increasingly private spaces, designed for conversation, continuity, and discretion rather than spectacle. Service becomes more anticipatory, more personal — shaped by familiarity rather than formality.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans pl-8 md:pl-12 border-l-2 border-gold/20">
                    At the upper levels, private dining rooms and salons provide a setting for focused engagement: hosting, negotiation, celebration, and retreat. Each space is conceived as part of a coherent journey, where architecture, art, and hospitality work together to support long-form presence.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans pl-8 md:pl-12 border-l-2 border-gold/20">
                    The result is a layered experience — open where it should be, protected where it must be — allowing members to move fluidly between public vitality and private assurance within a single, unified house.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    Technology plays a role. Advanced personalization and operational intelligence are embedded quietly, enabling anticipatory service, comfort, and emotional ease—felt rather than seen. The experience is inclusive by design, consciously welcoming women, families, collectors, and global members whose expectations extend beyond the conventions of legacy clubs.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    The project is conceived for durability. The operating platform and capital structure are clearly delineated, governance is institutional in nature, and the ambition is long-term. This is not a lifestyle concept built for trend cycles, but a cultural asset designed to mature, evolve, and remain relevant across generations. It is a deliberate act of creation—rooted in place, elevated by art, and guided by a belief in human creativity as the ultimate luxury.
                  </p>
                  
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    We present this opportunity to members who recognize that the most valuable asset are people whose lives tell an interesting story.
                  </p>
                  
                  {/* Timeline */}
                  <div className="mt-12 space-y-8">
                    <h3 className="text-2xl md:text-3xl font-light tracking-[0.15em] text-gold uppercase mb-8">
                      Project Timeline
                    </h3>
                    <div className="relative pb-8 md:pb-16">
                      {/* Timeline Line */}
                      <div className="absolute top-6 left-0 right-0 h-0.5 bg-gold/30 hidden md:block" />
                      
                      {/* Timeline Phases */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
                        {/* Phase I */}
                        <div className="relative">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-2 border-background hidden md:block z-10" />
                          <div className="pt-8 md:pt-12">
                            <div className="text-base md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase I</div>
                            <div className="text-base md:text-lg text-cream mb-4 font-light text-center md:text-left">Jan–Mar 2026</div>
                            <div className="text-xs text-cream/70 leading-relaxed space-y-1 text-center md:text-left">
                              <div>Formation</div>
                              <div>Concept finalised</div>
                              <div>Founding Circle</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Phase II */}
                        <div className="relative">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-2 border-background hidden md:block z-10" />
                          <div className="pt-8 md:pt-12">
                            <div className="text-base md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase II</div>
                            <div className="text-base md:text-lg text-cream mb-4 font-light text-center md:text-left">Apr–Jun 2026</div>
                            <div className="text-xs text-cream/70 leading-relaxed space-y-1 text-center md:text-left">
                              <div>Design & Curation</div>
                              <div>Architecture & interiors</div>
                              <div>Partners appointed</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Phase III */}
                        <div className="relative">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-2 border-background hidden md:block z-10" />
                          <div className="pt-8 md:pt-12">
                            <div className="text-base md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase III</div>
                            <div className="text-base md:text-lg text-cream mb-4 font-light text-center md:text-left">Jul–Nov 2026</div>
                            <div className="text-xs text-cream/70 leading-relaxed space-y-1 text-center md:text-left">
                              <div>Build & Preparation</div>
                              <div>Construction & fit-out</div>
                              <div>Staff training</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Phase IV */}
                        <div className="relative">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-2 border-background hidden md:block z-10" />
                          <div className="pt-8 md:pt-12">
                            <div className="text-base md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase IV</div>
                            <div className="text-base md:text-lg text-cream mb-4 font-light text-center md:text-left">Dec 2026 – Q1 2027</div>
                            <div className="text-xs text-cream/70 leading-relaxed space-y-1 text-center md:text-left">
                              <div>Opening</div>
                              <div>Members' preview</div>
                              <div>Full operations</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Caption */}
                    <div className="text-center pt-6 border-t border-gold/10">
                      <p className="text-sm text-gold-muted italic tracking-[0.1em]">
                        Built deliberately. Opened quietly. Designed to endure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
