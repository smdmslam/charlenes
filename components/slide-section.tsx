"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface SlideSectionProps {
  id: string
  title: string
  subtitle: string
  image: string
  index: number
  isActive: boolean
}

export function SlideSection({ id, title, subtitle, image, index, isActive }: SlideSectionProps) {
  return (
    <section
      id={id}
      className="relative h-screen w-screen flex-shrink-0 scroll-snap-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority={index < 2}
        />
        {/* Dark overlay for text readability */}
        <div className={`absolute inset-0 bg-gradient-to-r ${id === "entrance" ? "from-background/50 via-background/20 to-transparent" : "from-background/90 via-background/50 to-transparent"}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${id === "entrance" ? "from-background/40 via-transparent to-background/15" : "from-background/80 via-transparent to-background/30"}`} />
        
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 glossy-overlay opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 md:pb-32 lg:pb-40">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Section number */}
            <span className="mb-4 block text-sm tracking-[0.3em] text-gold-muted uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Title */}
            <h2 className="mb-4 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-cream">
              {title}
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-lg">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Vertical line accent */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 md:left-16 lg:left-24 top-1/4 h-24 w-px bg-gradient-to-b from-gold to-transparent origin-top"
      />
    </section>
  )
}
