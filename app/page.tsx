"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { SlideSection } from "@/components/slide-section"
import { Navigation } from "@/components/navigation"
import { ScrollArrows } from "@/components/scroll-arrows"
import { IntroOverlay } from "@/components/intro-overlay"

const sections = [
  {
    id: "entrance",
    title: "The Entrance",
    subtitle: "A discreet doorway in the heart of Mayfair, where London's most discerning gather.",
    image: "/images/Lobby 1.png",
  },
  {
    id: "dining",
    title: "Michelin Dining",
    subtitle: "World-class gastronomy anchors the ground floor—open to the city, uncompromising in quality.",
    image: "/images/dining1.png",
  },
  {
    id: "bar",
    title: "Members Bar",
    subtitle: "Intimate conversations over rare spirits. A sanctuary of refined taste and quiet luxury.",
    image: "/images/bar1.png",
  },
  {
    id: "terrace",
    title: "Garden Terrace",
    subtitle: "A secret garden suspended above Mayfair. Where the city fades and tranquility begins.",
    image: "/images/terrace1.png",
  },
  {
    id: "staircase",
    title: "The Staircase",
    subtitle: "Architecture as art. A grand ascent through curated contemporary works.",
    image: "/images/staircase1.png",
  },
  {
    id: "lounge",
    title: "Members Lounge",
    subtitle: "Privacy, hierarchy, and service that moves beyond the traditional private club model.",
    image: "/images/memberslounge1.quantease_a_super_posh_english_private_members_club_Members_Lou_5e4a8c52-605c-48e6-993e-9d08397b5b2b.png",
  },
  {
    id: "salon",
    title: "Private Salons",
    subtitle: "Intimate dining rooms for those moments that require absolute discretion.",
    image: "/images/private1.png",
  },
]

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const touchStartRef = useRef<number>(0)
  const touchEndRef = useRef<number>(0)

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current || isScrollingRef.current) return
    
    const clampedIndex = Math.max(0, Math.min(index, sections.length - 1))
    isScrollingRef.current = true
    
    containerRef.current.scrollTo({
      left: clampedIndex * window.innerWidth,
      behavior: "smooth",
    })
    
    setActiveIndex(clampedIndex)
    
    setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }, [])

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft
        const width = window.innerWidth
        const newIndex = Math.round(scrollLeft / width)
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex)
        }
      }, 50)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [activeIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        scrollToIndex(activeIndex - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, showIntro, scrollToIndex])

  // Handle wheel events for horizontal scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container || showIntro) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrollingRef.current) return
      
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      
      if (delta > 30) {
        scrollToIndex(activeIndex + 1)
      } else if (delta < -30) {
        scrollToIndex(activeIndex - 1)
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [activeIndex, showIntro, scrollToIndex])

  // Handle touch events for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (isScrollingRef.current) return
    
    const diff = touchStartRef.current - touchEndRef.current
    const minSwipeDistance = 50
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        scrollToIndex(activeIndex + 1)
      } else {
        scrollToIndex(activeIndex - 1)
      }
    }
  }, [activeIndex, scrollToIndex])

  // Dismiss intro after delay
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  const handleIntroComplete = () => {
    setIsReady(true)
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Intro overlay */}
      <IntroOverlay isVisible={showIntro} onComplete={handleIntroComplete} />

      {/* Main horizontal slider */}
      <div
        ref={containerRef}
        className="flex h-full w-full overflow-x-auto scroll-snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sections.map((section, index) => (
          <SlideSection
            key={section.id}
            {...section}
            index={index}
            isActive={isReady && activeIndex === index}
          />
        ))}
      </div>

      {/* Navigation */}
      {isReady && (
        <>
          <Navigation
            sections={sections}
            activeIndex={activeIndex}
            onNavigate={scrollToIndex}
          />
          <ScrollArrows
            onPrev={() => scrollToIndex(activeIndex - 1)}
            onNext={() => scrollToIndex(activeIndex + 1)}
            canGoPrev={activeIndex > 0}
            canGoNext={activeIndex < sections.length - 1}
          />
        </>
      )}

      {/* Decorative corner elements */}
      {isReady && (
        <>
          <div className="fixed top-6 right-6 w-8 h-8 border-t border-r border-gold/20 pointer-events-none hidden lg:block" />
          <div className="fixed bottom-6 left-6 w-8 h-8 border-b border-l border-gold/20 pointer-events-none hidden lg:block" />
        </>
      )}
    </main>
  )
}
