"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { getSurveySession } from "@/lib/survey-service"

export default function SurveyCompletePage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")
  const [sessionName, setSessionName] = useState("")

  useEffect(() => {
    if (sessionId) {
      loadSession()
    }
  }, [sessionId])

  const loadSession = async () => {
    if (!sessionId) return

    try {
      const session = await getSurveySession(sessionId)
      if (session) {
        setSessionName(session.name)
      }
    } catch (error) {
      console.error("Error loading session:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      {/* Decorative corner elements */}
      <div className="fixed top-6 right-6 w-8 h-8 border-t border-r border-gold/20 pointer-events-none hidden lg:block" />
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b border-l border-gold/20 pointer-events-none hidden lg:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-12 text-center"
      >
        {/* Success message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="h-px w-32 mx-auto bg-gold/30" />
          
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-cream">
            Thank You
          </h1>
          
          {sessionName && (
            <p className="text-lg text-cream/80 font-light tracking-wide">
              {sessionName}
            </p>
          )}

          <div className="h-px w-32 mx-auto bg-gold/30" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-base md:text-lg text-cream/80 font-light leading-relaxed tracking-wide max-w-lg mx-auto">
            Your responses will directly inform Curzon House's development and help us create something truly distinctive in London's private club landscape.
          </p>

          <p className="text-sm text-cream/60 font-light tracking-wide">
            All responses are confidential and will be used solely for research purposes.
          </p>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8 border-t border-gold/20"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-cream/60 mb-2">
            Questions or Additional Thoughts?
          </p>
          <a
            href="mailto:smdm@dmwfinancegroup.com"
            className="text-gold hover:text-gold-muted transition-colors text-sm tracking-wide"
          >
            smdm@dmwfinancegroup.com
          </a>
        </motion.div>
      </motion.div>
    </main>
  )
}
