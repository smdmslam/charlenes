"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ScrollArrowsProps {
  onPrev: () => void
  onNext: () => void
  canGoPrev: boolean
  canGoNext: boolean
}

export function ScrollArrows({ onPrev, onNext, canGoPrev, canGoNext }: ScrollArrowsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-6">
      {/* Previous arrow */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: canGoPrev ? 1 : 0.3, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        onClick={onPrev}
        disabled={!canGoPrev}
        className="group flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Previous section"
      >
        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300 group-disabled:opacity-30">
          <ChevronLeft className="w-5 h-5 text-gold" />
        </div>
      </motion.button>

      {/* Scroll hint text */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="text-xs tracking-[0.3em] text-gold-muted uppercase"
      >
        Scroll to Explore
      </motion.span>

      {/* Next arrow */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: canGoNext ? 1 : 0.3, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        onClick={onNext}
        disabled={!canGoNext}
        className="group flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Next section"
      >
        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300 group-disabled:opacity-30">
          <ChevronRight className="w-5 h-5 text-gold" />
        </div>
      </motion.button>
    </div>
  )
}
