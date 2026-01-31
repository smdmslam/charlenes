"use client"

import { motion } from "framer-motion"

interface NavigationProps {
  sections: Array<{ id: string; title: string }>
  activeIndex: number
  onNavigate: (index: number) => void
}

export function Navigation({ sections, activeIndex, onNavigate }: NavigationProps) {
  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col"
          >
            <span className="text-2xl md:text-3xl font-light tracking-[0.15em] text-cream">
              Charlene's
            </span>
            <span className="text-xs tracking-[0.4em] text-gold-muted uppercase">
              LONDON MAYFAIR
            </span>
          </motion.div>
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
    </>
  )
}
