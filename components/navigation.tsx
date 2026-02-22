"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { submitMembershipApplication } from "@/lib/membership-service"
import { AuthSignIn } from "@/components/auth-signin"
import { AuthSignUp } from "@/components/auth-signup"
import { MemberProfile } from "@/components/member-profile"
import { useAuth } from "@/contexts/auth-context"
import { logout, getAuthErrorMessage } from "@/lib/auth-service"
import { useAdmin } from "@/hooks/use-admin"
import Link from "next/link"

interface NavigationProps {
  sections: Array<{ id: string; title: string }>
  activeIndex: number
  onNavigate: (index: number) => void
}

export function Navigation({ sections, activeIndex, onNavigate }: NavigationProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Determine if we're on a light background page
  const isLightPage = Boolean(pathname && (pathname.startsWith('/join-the-team') || pathname.startsWith('/admin')))

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isTimelineOpen, setIsTimelineOpen] = useState(false)
  const [isExperienceOpen, setIsExperienceOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isMembershipOpen, setIsMembershipOpen] = useState(false)
  const [isPhilanthropyOpen, setIsPhilanthropyOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isFoundersCircleOpen, setIsFoundersCircleOpen] = useState(false)

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [gender, setGender] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")
  const { toast } = useToast()
  const { user } = useAuth()
  const { isAdmin } = useAdmin()

  const handleSignOut = async () => {
    try {
      await logout()
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
      setIsMenuOpen(false)
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      })
    }
  }
  return (
    <>
      {/* Top header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6 ${isLightPage
        ? 'bg-cream/95 backdrop-blur-sm'
        : 'bg-transparent'
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          {isHomePage ? (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => onNavigate(0)}
              className="flex flex-col text-left cursor-pointer hover:opacity-80 transition-opacity duration-300"
              aria-label="Navigate to home"
            >
              <div className="flex flex-col text-left">
                <h1 className={`text-2xl md:text-3xl font-light tracking-[0.15em] leading-tight ${isLightPage ? 'text-black' : 'text-cream'
                  }`}>
                  Curzon House
                </h1>
                <span className={`text-xs tracking-[0.4em] uppercase ${isLightPage ? 'text-black/70' : 'text-gold'
                  }`}>
                  LONDON MAYFAIR
                </span>
              </div>
            </motion.button>
          ) : (
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col text-left cursor-pointer hover:opacity-80 transition-opacity duration-300"
                aria-label="Navigate to home"
              >
                <div className="flex flex-col text-left">
                  <h1 className={`text-2xl md:text-3xl font-light tracking-[0.15em] leading-tight ${isLightPage ? 'text-black' : 'text-cream'
                    }`}>
                    Curzon House
                  </h1>
                  <span className={`text-xs tracking-[0.4em] uppercase ${isLightPage ? 'text-black/70' : 'text-gold'
                    }`}>
                    LONDON MAYFAIR
                  </span>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onClick={() => setIsMenuOpen(true)}
            className={`p-2 transition-colors duration-300 ${isLightPage ? 'text-black hover:text-gold' : 'text-cream hover:text-gold'
              }`}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </header>

      {/* Side navigation dots */}
      {sections.map((section, index) => {
        const verticalOffset = (index - (sections.length - 1) / 2) * 2.5 // Increased vertical spacing between dots
        return (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            onClick={() => onNavigate(index)}
            className="group fixed left-8 md:left-12 z-50 hidden md:flex items-center gap-3 cursor-pointer"
            style={{
              top: `calc(50% + ${verticalOffset}rem)`,
              transform: `translateY(-50%)`,
            }}
            aria-label={`Navigate to ${section.title}`}
          >
            {/* Dot */}
            <div className="relative w-2 h-2">
              <motion.div
                className="absolute inset-0 rounded-full bg-cream"
                initial={false}
                animate={{
                  scale: activeIndex === index ? 1 : 0.5,
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
              {activeIndex === index && (
                <motion.div
                  layoutId={`nav-ring-${index}`}
                  className="absolute -inset-1.5 rounded-full border border-cream/50"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
            {/* Label (appears on hover) */}
            <span className="text-xs tracking-[0.2em] text-gold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left" style={{ textShadow: '0 0 10px rgba(191, 155, 88, 0.5)' }}>
              {section.title}
            </span>
          </motion.button>
        )
      })}

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
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
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
                  {/* Top Group */}
                  <div className="flex flex-col gap-8">
                    {/* ABOUT */}
                    <button
                      onClick={() => {
                        setIsAboutOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      ABOUT THIS PROJECT
                    </button>

                    {/* THE EXPERIENCE */}
                    <button
                      onClick={() => {
                        setIsExperienceOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      THE EXPERIENCE
                    </button>

                    {/* FOUNDERS CIRCLE */}
                    <button
                      onClick={() => {
                        setIsFoundersCircleOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      Founders Circle | 150
                    </button>

                    {/* MEMBERSHIP */}
                    <button
                      onClick={() => {
                        setIsMembershipOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      Apply for Membership
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gold/20"></div>

                  {/* Bottom Group */}
                  <div className="flex flex-col gap-8">
                    {/* HISTORY */}
                    <button
                      onClick={() => {
                        setIsHistoryOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      History
                    </button>

                    {/* PHILANTHROPY */}
                    <button
                      onClick={() => {
                        setIsPhilanthropyOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      Philanthropy
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gold/20"></div>

                    {/* PROJECT TIMELINE */}
                    <button
                      onClick={() => {
                        setIsTimelineOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      PROJECT TIMELINE
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
                                  className={`text-left text-base tracking-[0.1em] uppercase transition-colors duration-300 ${activeIndex === index
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

                    {/* CONTACT */}
                    <button
                      onClick={() => {
                        setIsContactOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      Contact
                    </button>
                  </div>

                  {/* JOIN THE TEAM */}
                  <div className="pt-4 border-t border-gold/20">
                    <a
                      href="/join-the-team"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                    >
                      Join the Team
                    </a>
                  </div>

                  {/* ADMIN - CANDIDATE TRACKER */}
                  {isAdmin && (
                    <div className="pt-4 border-t border-gold/20">
                      <Link
                        href="/admin/applications"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                      >
                        Candidate Tracker
                      </Link>
                    </div>
                  )}

                  {/* SURVEY - Only visible to s.moralesmed@gmail.com */}
                  {user?.email === "s.moralesmed@gmail.com" && (
                    <div className="pt-4 border-t border-gold/20">
                      <Link
                        href="/insights"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300"
                      >
                        Survey
                      </Link>
                    </div>
                  )}

                  {/* AUTHENTICATION */}
                  <div className="pt-4 border-t border-gold/20">
                    {user ? (
                      <>
                        <div className="mb-4">
                          <p className="text-cream/70 text-sm mb-1">Signed in as</p>
                          <p className="text-cream text-base">{user.email || user.displayName || "Member"}</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsProfileOpen(true)
                            setIsMenuOpen(false)
                          }}
                          className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300 w-full mb-4"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300 w-full"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setIsSignInOpen(true)
                          setIsMenuOpen(false)
                        }}
                        className="text-left text-xl tracking-[0.15em] uppercase text-cream hover:text-gold transition-colors duration-300 w-full"
                      >
                        Sign In
                      </button>
                    )}
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
                {/* Header */}
                <div className="sticky top-0 bg-background border-b border-gold/20 flex justify-end items-center px-8 md:px-12 py-4 gap-8">
                  <span className="text-[10px] md:text-xs tracking-[0.2em] text-gold uppercase font-light">
                    Curzon House is scheduled to open March 2027
                  </span>
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
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-8">
                    About This Project
                  </h1>

                  <div className="space-y-1">
                    <h2 className="text-4xl md:text-5xl font-light tracking-[0.1em] text-cream">
                      Curzon House
                    </h2>
                    <p className="text-sm md:text-base text-cream/60 italic tracking-[0.1em]">
                      Fraternitas Hereditatis et Luxūs
                    </p>
                  </div>

                  <div className="py-8">
                    <p className="text-lg md:text-xl text-cream/90 leading-relaxed italic pl-8 md:pl-12 border-l-2 border-gold/30">
                      "A cultural hospitality platform at the intersection of luxury, art, cuisine, and high-trust global relationships—built for people defined by intellect, achievement, and discretion."
                    </p>
                  </div>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    A place that reflects the evolution of culture itself: global, intelligent, emotionally resonant, and unmistakably rare. In the heart of Mayfair, we propose a new kind of cultural hospitality platform—one that is not designed to follow precedent, but to extend it.
                  </p>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    Technology plays a role including advanced personalization and operational intelligence enabling anticipatory service, comfort, and emotional ease. The experience is inviting and comfortable by design, consciously welcoming members whose expectations extend beyond the conventions of legacy clubs.
                  </p>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    The project is conceived for durability. The operating platform and capital structure are clearly delineated, governance is institutional in nature, and the ambition is long-term. This is not a lifestyle concept built for trend cycles, but a cultural asset designed to mature, evolve, and remain relevant across generations. It is a deliberate act of creation—rooted in place, elevated by art, and guided by a belief in human creativity is luxury.
                  </p>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    We present this opportunity to members who recognize that the most valuable asset are people whose lives tell an interesting story.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Project Timeline Modal */}
      <AnimatePresence>
        {isTimelineOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsTimelineOpen(false)}
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
              <div className="bg-background border border-gold/20 max-w-5xl w-full max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <div className="sticky top-0 bg-background border-b border-gold/20 flex justify-end p-6">
                  <button
                    onClick={() => setIsTimelineOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-8">
                    Project Timeline
                  </h1>

                  <div className="relative pb-8 md:pb-16">
                    {/* Timeline Line */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-gold/30 hidden md:block" />

                    {/* Timeline Phases */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
                      {/* Phase I */}
                      <div className="relative">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-2 border-background hidden md:block z-10" />
                        <div className="pt-8 md:pt-12">
                          <div className="text-xl md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase I</div>
                          <div className="text-lg md:text-lg text-cream mb-4 font-light text-center md:text-left">Jan–Mar 2026</div>
                          <div className="text-base md:text-sm text-cream/90 leading-relaxed space-y-1 text-center md:text-left font-light">
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
                          <div className="text-xl md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase II</div>
                          <div className="text-lg md:text-lg text-cream mb-4 font-light text-center md:text-left">Apr–Jun 2026</div>
                          <div className="text-base md:text-sm text-cream/90 leading-relaxed space-y-1 text-center md:text-left font-light">
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
                          <div className="text-xl md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase III</div>
                          <div className="text-lg md:text-lg text-cream mb-4 font-light text-center md:text-left">Jul–Nov 2026</div>
                          <div className="text-base md:text-sm text-cream/90 leading-relaxed space-y-1 text-center md:text-left font-light">
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
                          <div className="text-xl md:text-lg text-gold uppercase tracking-[0.2em] mb-3 font-medium text-center md:text-left">Phase IV</div>
                          <div className="text-lg md:text-lg text-cream mb-4 font-light text-center md:text-left">Dec 2026 – Q1 2027</div>
                          <div className="text-base md:text-sm text-cream/90 leading-relaxed space-y-1 text-center md:text-left font-light">
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
                    <p className="text-sm text-gold italic tracking-[0.1em]" style={{ textShadow: '0 0 10px rgba(191, 155, 88, 0.5)' }}>
                      Built deliberately. Opened quietly. Designed to endure.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {isExperienceOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsExperienceOpen(false)}
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
                    onClick={() => setIsExperienceOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-6 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-8">
                    THE EXPERIENCE
                  </h1>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans">
                    The project is structured as a layered experience.
                  </p>

                  <p className="text-base md:text-lg text-cream/80 leading-relaxed font-sans pl-8 md:pl-12 border-l-2 border-gold/20">
                    At street level, Curzon House opens with a Michelin-calibre restaurant that engages the city directly — confident, composed, and uncompromising in quality. It establishes the tone of the house: serious cuisine, intelligent energy, and quiet relevance.
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

                  {/* CTA Button */}
                  <div className="pt-8 mt-8 border-t border-gold/20">
                    <button
                      onClick={() => {
                        setIsExperienceOpen(false)
                        setIsMembershipOpen(true)
                      }}
                      className="w-full py-4 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light"
                    >
                      Apply for Membership
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsHistoryOpen(false)}
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
                    onClick={() => setIsHistoryOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-6">
                    History
                  </h1>

                  {/* Main Title */}
                  <h2 className="text-xl md:text-2xl font-light tracking-[0.1em] text-cream mb-6">
                    Curzon Street: From Georgian Elegance to Cultural Powerhouse
                  </h2>

                  {/* Introduction */}
                  <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                    Curzon Street has long been synonymous with London's most exclusive and culturally refined corners. What began as aristocratic real estate in the 18th century evolved into a street where literary giants, politicians, and creative visionaries shaped British culture—and where that legacy continues to define luxury and taste today.
                  </p>

                  {/* The Aristocratic Foundation */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <h3 className="text-lg md:text-xl font-light tracking-[0.1em] text-gold uppercase">
                      The Aristocratic Foundation
                    </h3>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      The street emerged during London's westward expansion in the late 17th and early 18th centuries, as Mayfair transformed from open fields into an enclave of power. Named after the Curzon family—an Anglo-Norman dynasty with deep English roots—the street quickly became home to Britain's elite. Members of Parliament, future Prime Ministers like Benjamin Disraeli (who lived there until 1881), and influential diplomats like Lord Macartney chose Curzon Street as their London base. These weren't casual residents; they were the architects of British political and intellectual life, and their presence stamped the street with an authority it has never lost.
                    </p>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      The Georgian townhouses that line Curzon Street, predominantly dating from the 1750s-60s and largely Grade II listed, still reflect this heritage. Post-World War II redevelopment converted many into luxury apartments, but the facades remained—a deliberate choice to preserve the street's aristocratic character even as its function evolved.
                    </p>
                  </div>

                  {/* Literature's Favorite Address */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <h3 className="text-lg md:text-xl font-light tracking-[0.1em] text-gold uppercase">
                      Literature's Favorite Address
                    </h3>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      Oscar Wilde understood Curzon Street's symbolic power. He placed his most memorable characters there: Lord Henry Wotton from <em className="text-cream/90">The Picture of Dorian Gray</em> and Mrs Erlynne from <em className="text-cream/90">Lady Windermere's Fan</em> (specifically at 84A Curzon Street). Roald Dahl and William Makepeace Thackeray also set scenes on this street. Through their fiction, these authors transformed Curzon into shorthand for sophisticated West End society—a literary code that readers immediately recognized as the seat of elegance and moral complexity.
                    </p>
                  </div>

                  {/* The Modern Cultural Hub */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <h3 className="text-lg md:text-xl font-light tracking-[0.1em] text-gold uppercase">
                      The Modern Cultural Hub
                    </h3>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      The Curzon Mayfair Cinema, built between 1963-66, represents one of London's most significant post-war cinema buildings and stands as a Grade II listed structure. For over 90 years, it hosted West End film premieres and shaped London's film culture—until its closure in 2025 due to redevelopment by landlord Fantasio. The cinema's departure marks a pivotal moment in the street's evolution, as the historic venue transitions toward a new vision that includes a members' club and restaurant alongside a reimagined cinema.
                    </p>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      Beyond the cinema, Curzon Street anchors one of the world's densest concentrations of visual culture. Over 130 art galleries operate within the broader Mayfair and St James area, positioning the street as a nexus for contemporary and fine art.
                    </p>
                  </div>

                  {/* Luxury Reimagined */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <h3 className="text-lg md:text-xl font-light tracking-[0.1em] text-gold uppercase">
                      Luxury Reimagined
                    </h3>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      Recent developments demonstrate how Curzon Street maintains its prestige while embracing modern luxury. 60 Curzon, an eight-storey residential building designed by French architect Thierry W. Despont, features 32 Art Deco-inspired residences that marry contemporary amenities with classical aesthetics. The building occupies the site of the historic Mirabelle restaurant, which operated from 1936 and attracted everyone from Winston Churchill to Leonardo DiCaprio—illustrating how the street's legendary venues continue to shape London's cultural memory even as they evolve.
                    </p>
                  </div>

                  {/* The Mayfair Context */}
                  <div className="space-y-4 pt-4 border-t border-gold/10">
                    <h3 className="text-lg md:text-xl font-light tracking-[0.1em] text-gold uppercase">
                      The Mayfair Context
                    </h3>
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed">
                      Curzon Street cannot be understood in isolation. It sits at the heart of Mayfair, London's most exclusive district, which takes its name from the annual May Fair held from 1686 to 1764 at Shepherd Market—between Piccadilly and Curzon Street itself. Today, Mayfair houses major corporate headquarters, the highest concentration of five-star hotels and restaurants in London, and properties that serve as benchmarks for global luxury living.
                    </p>
                  </div>

                  {/* Closing */}
                  <div className="pt-4 border-t border-gold/10">
                    <p className="text-base md:text-lg text-cream/80 leading-relaxed italic pl-4 md:pl-6 border-l-2 border-gold/30">
                      In essence, Curzon Street remains what it has always been: a barometer of London's cultural and social aspirations, a place where history and innovation coexist, and where exclusivity is measured not just in price tags but in access to taste, refinement, and influence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Apply for Membership Modal */}
      <AnimatePresence>
        {isMembershipOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsMembershipOpen(false)}
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
                    onClick={() => setIsMembershipOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8 font-sans">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-light tracking-[0.1em] text-cream mb-2">
                      Curzon House
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-gold">
                      Application for Membership
                    </h2>
                  </div>

                  <form
                    className="space-y-6"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      setIsSubmitting(true)

                      try {
                        const formData = new FormData(e.currentTarget)

                        // Validate required fields
                        const requiredFields = ['fullName', 'gender', 'address', 'country', 'telephone1', 'email', 'dateOfBirth', 'nationality', 'occupation', 'companyName', 'companyAddress', 'membership']
                        const missingFields = requiredFields.filter(field => {
                          if (field === 'membership') {
                            return !membershipType
                          }
                          if (field === 'gender') {
                            return !gender
                          }
                          return !formData.get(field)
                        })

                        if (missingFields.length > 0) {
                          toast({
                            title: "Missing Required Fields",
                            description: `Please fill in all required fields: ${missingFields.join(', ')}`,
                            variant: "destructive",
                          })
                          setIsSubmitting(false)
                          return
                        }

                        // Collect form data
                        const application = {
                          fullName: formData.get('fullName') as string,
                          gender: gender,
                          address: formData.get('address') as string,
                          country: formData.get('country') as string,
                          telephone1: formData.get('telephone1') as string,
                          telephone2: formData.get('telephone2') as string || undefined,
                          email: formData.get('email') as string,
                          linkedin: formData.get('linkedin') as string || undefined,
                          dateOfBirth: formData.get('dateOfBirth') as string,
                          nationality: formData.get('nationality') as string,
                          occupation: formData.get('occupation') as string,
                          companyName: formData.get('companyName') as string,
                          companyAddress: formData.get('companyAddress') as string,
                          personalInterests: formData.get('personalInterests') as string || undefined,
                          personalBiography: formData.get('personalBiography') as string || undefined,
                          membershipType: membershipType as "standard" | "elite" | "architect",
                        }

                        // Submit to Firebase
                        const docId = await submitMembershipApplication(application)

                        toast({
                          title: "Application Submitted Successfully",
                          description: "Thank you for your interest in Curzon House. We will review your application and get back to you soon.",
                        })

                        // Reset form
                        e.currentTarget.reset()
                        setGender("")
                        setMembershipType("")
                      } catch (error) {
                        console.error("Error submitting application:", error)
                        toast({
                          title: "Submission Failed",
                          description: "There was an error submitting your application. Please try again or contact us directly.",
                          variant: "destructive",
                        })
                      } finally {
                        setIsSubmitting(false)
                      }
                    }}
                  >
                    {/* Gender - Top */}
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="gender" className="text-cream text-sm">Gender</Label>
                      <Select name="gender" value={gender} onValueChange={setGender}>
                        <SelectTrigger className="bg-background border-gold/20 text-cream h-9 text-sm">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Basic Information - Compact Layout */}
                    <div className="space-y-3 pb-4 border-b border-gold/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="fullName" className="text-cream text-sm">Full Name</Label>
                          <Input id="fullName" name="fullName" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dateOfBirth" className="text-cream text-sm">Date of Birth</Label>
                          <Input id="dateOfBirth" name="dateOfBirth" type="date" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-cream text-sm">Email</Label>
                          <Input id="email" name="email" type="email" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="telephone1" className="text-cream text-sm">Telephone</Label>
                          <Input id="telephone1" name="telephone1" type="tel" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="telephone2" className="text-cream text-sm">Telephone 2 (Optional)</Label>
                          <Input id="telephone2" name="telephone2" type="tel" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="address" className="text-cream text-sm">Address</Label>
                          <Textarea id="address" name="address" rows={1} className="bg-background border-gold/20 text-cream text-sm min-h-[36px] resize-y" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="country" className="text-cream text-sm">Country</Label>
                          <Input id="country" name="country" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="nationality" className="text-cream text-sm">Nationality</Label>
                          <Input id="nationality" name="nationality" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="occupation" className="text-cream text-sm">Occupation</Label>
                          <Input id="occupation" name="occupation" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="linkedin" className="text-cream text-sm">LinkedIn (URL)</Label>
                          <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="companyName" className="text-cream text-sm">Company Name</Label>
                          <Input id="companyName" name="companyName" className="bg-background border-gold/20 text-cream h-9 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="companyAddress" className="text-cream text-sm">Company Address</Label>
                          <Textarea id="companyAddress" name="companyAddress" rows={1} className="bg-background border-gold/20 text-cream text-sm min-h-[36px] resize-y" />
                        </div>
                      </div>
                    </div>

                    {/* Personal Interests - Prominent */}
                    <div className="space-y-3 pt-4">
                      <Label htmlFor="personalInterests" className="text-cream text-lg font-light">Personal Interests</Label>
                      <Textarea id="personalInterests" name="personalInterests" rows={6} className="bg-background border-gold/30 text-cream text-base leading-relaxed" placeholder="Share your passions, hobbies, and interests..." />
                    </div>

                    {/* Personal Biography - Prominent */}
                    <div className="space-y-3 pt-6 border-t border-gold/30">
                      <Label htmlFor="personalBiography" className="text-cream text-lg font-light">Personal Biography</Label>
                      <p className="text-cream/80 text-sm italic mb-2">"Tell us your story"</p>
                      <Textarea id="personalBiography" name="personalBiography" rows={8} className="bg-background border-gold/30 text-cream text-base leading-relaxed" placeholder="Please provide a brief biography..." />
                    </div>

                    {/* Membership Selection */}
                    <div className="space-y-4 pt-4 border-t border-gold/20">
                      <Label className="text-cream text-lg">Membership Type (waiting list)</Label>

                      {/* Membership Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-gold/20">
                              <th className="text-left py-3 px-4 text-cream font-light uppercase tracking-[0.1em] text-sm">Membership</th>
                              <th className="text-right py-3 px-4 text-cream font-light uppercase tracking-[0.1em] text-sm">Annual Fee</th>
                              <th className="text-right py-3 px-4 text-cream font-light uppercase tracking-[0.1em] text-sm">Membership Fee</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gold/10">
                              <td className="py-3 px-4">
                                <label className="flex items-start cursor-pointer">
                                  <input
                                    type="radio"
                                    name="membership"
                                    value="standard"
                                    checked={membershipType === "standard"}
                                    onChange={(e) => setMembershipType(e.target.value)}
                                    className="mr-3 accent-gold mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="text-cream">Standard Membership</div>
                                  </div>
                                </label>
                              </td>
                              <td className="text-right py-3 px-4 text-cream">£2,000</td>
                              <td className="text-right py-3 px-4 text-cream">£2,500</td>
                            </tr>
                            <tr className="border-b border-gold/10">
                              <td className="py-3 px-4">
                                <label className="flex items-start cursor-pointer">
                                  <input
                                    type="radio"
                                    name="membership"
                                    value="elite"
                                    checked={membershipType === "elite"}
                                    onChange={(e) => setMembershipType(e.target.value)}
                                    className="mr-3 accent-gold mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="text-cream">Elite Membership</div>
                                    <div className="text-cream/70 text-sm mt-1">Founders Rate: £7,500/year (limited to first 150)</div>
                                  </div>
                                </label>
                              </td>
                              <td className="text-right py-3 px-4 text-cream">£10,000</td>
                              <td className="text-right py-3 px-4 text-cream">£2,500</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4">
                                <label className="flex items-start cursor-pointer">
                                  <input
                                    type="radio"
                                    name="membership"
                                    value="architect"
                                    checked={membershipType === "architect"}
                                    onChange={(e) => setMembershipType(e.target.value)}
                                    className="mr-3 accent-gold mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="text-cream">Architect Membership</div>
                                  </div>
                                </label>
                              </td>
                              <td className="text-right py-3 px-4 text-cream">£20,000</td>
                              <td className="text-right py-3 px-4 text-cream">£2,500</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Membership Fee Note */}
                      <p className="text-sm text-cream/70 italic mt-4">
                        * Membership Fees are charged one time only.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Philanthropy Modal */}
      <AnimatePresence>
        {isPhilanthropyOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsPhilanthropyOpen(false)}
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
                    onClick={() => setIsPhilanthropyOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-8 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-8">
                    Philanthropy
                  </h1>

                  <div className="space-y-8">
                    {/* Healthcare Focused */}
                    <div>
                      <h2 className="text-lg md:text-xl text-gold mb-4 uppercase tracking-[0.1em]">Healthcare Focused</h2>
                      <ul className="space-y-2 text-cream/80">
                        <li>St. Jude Children's Research Hospital</li>
                        <li>Cancer Research UK</li>
                        <li>British Heart Foundation</li>
                        <li>Macmillan Cancer Support</li>
                      </ul>
                    </div>

                    {/* Arts and Culture */}
                    <div>
                      <h2 className="text-lg md:text-xl text-gold mb-4 uppercase tracking-[0.1em]">Arts and Culture</h2>
                      <ul className="space-y-2 text-cream/80">
                        <li>Royal Opera House</li>
                        <li>London Symphony Orchestra</li>
                        <li>Royal Shakespeare Company</li>
                        <li>Tate</li>
                        <li>Museum of Pop Culture (MoPOP), Seattle</li>
                      </ul>
                    </div>

                    {/* Arts in Health / Art & Healing */}
                    <div>
                      <h2 className="text-lg md:text-xl text-gold mb-4 uppercase tracking-[0.1em]">Arts in Health / Art & Healing</h2>
                      <ul className="space-y-2 text-cream/80">
                        <li>National Organization for Arts in Health (NOAH)</li>
                        <li>Women With Wings Foundation</li>
                        <li>UCLA Art & Global Health Center</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[102]"
              onClick={() => setIsContactOpen(false)}
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
                    onClick={() => setIsContactOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-6 font-sans">
                  <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-gold uppercase mb-8">
                    Contact
                  </h1>

                  <div className="space-y-8 text-cream/80">
                    <div>
                      <h2 className="text-lg md:text-xl text-gold mb-3 uppercase tracking-[0.1em]">Email</h2>
                      <p className="text-cream/80 text-base md:text-lg">smdm@dmwfinancegroup.com</p>
                    </div>

                    <div>
                      <h2 className="text-lg md:text-xl text-gold mb-3 uppercase tracking-[0.1em]">Swiss Design & Management Partner</h2>
                      <div className="space-y-1 text-cream/80 text-base md:text-lg">
                        <p>DMW Finance Group</p>
                        <p>Switzerland</p>
                        <p>Grosspeter Tower, Grosspeteranlage 29</p>
                        <p>4052 Basel</p>
                        <p>
                          <a
                            href="https://www.dmwfinancegroup.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-muted transition-colors duration-300 no-underline"
                          >
                            www.dmwfinancegroup.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modals */}
      <AuthSignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => setIsSignUpOpen(true)}
      />
      <AuthSignUp
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => setIsSignInOpen(true)}
      />
      <MemberProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Founders Circle Description Modal */}
      <AnimatePresence>
        {isFoundersCircleOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[104]"
              onClick={() => setIsFoundersCircleOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[105] flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background border border-gold/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <div className="sticky top-0 bg-background border-b border-gold/20 flex justify-end p-6">
                  <button
                    onClick={() => setIsFoundersCircleOpen(false)}
                    className="p-2 text-cream hover:text-gold transition-colors duration-300"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <h2 className="text-cream text-2xl font-light tracking-wide">Founders Circle</h2>

                  <div className="space-y-4 text-cream/90 leading-relaxed">
                    <p>
                      Imagine a city where most rooms are already full. The restaurants are busy, the clubs are polished, the guest lists are long. But the thing that is actually scarce is not another dining room or another bar; it is the feeling that, when you walk into a place, everyone you meet could change the trajectory of your life — and not only in London.
                    </p>

                    <p>
                      The <span className="text-gold">Founders Circle</span> at Curzon House is built around that scarcity. It is capped at <span className="text-gold">150 people</span> for a reason that is both practical and psychological: it is small enough that you can know the room, and large enough that the room can surprise you. Each founder arrives with their own gravity – a family office in Dubai, a studio in Paris, a fund in Mayfair, a collection in New York – and the house's job is to quietly bend those orbits toward one another.
                    </p>

                    <p>
                      To make that happen, each member is paired with a <span className="text-gold">Personal Introductions Liaison</span>. Think of this as a professionalised version of the best host you have ever known. Their craft is simple but rare: they know who you are, what you are building, what you are curious about, and they spend their days turning cold encounters into warm ones. Software does the counting – social reach, shared interests, overlapping histories – and the liaison does the human part: "You two need to talk," "Sit here tonight," "Stay five more minutes."
                    </p>

                    <p>
                      From there, the effects compound. A <span className="text-gold">Michelin‑calibre restaurant</span> that behaves like a salon, not a trophy. Programming that treats fashion, art, and ideas as working materials, not decorations. A calendar that feels closer to the release schedule of a great luxury house than the noticeboard of a club. Over time, the value of the <span className="text-gold">Founders Circle</span> is not the priority table, the early booking, or even the events; it is the quiet accumulation of conversations that could not have happened anywhere else at 8 p.m. on a Tuesday.
                    </p>

                    <p>
                      Curzon House – a carefully engineered social system: a place in London where the probability of the right encounter is permanently, deliberately tilted in your favour.
                    </p>


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
