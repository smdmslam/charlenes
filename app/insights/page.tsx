"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createSurveySession } from "@/lib/survey-service"

export default function InsightsLandingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Required Fields",
        description: "Please provide both your name and email address.",
        variant: "destructive",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create survey session with name and email
      const sessionId = await createSurveySession({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      })

      // Redirect to survey
      router.push(`/insights/take?session=${sessionId}`)
    } catch (error) {
      console.error("Error creating survey session:", error)
      toast({
        title: "Error",
        description: "Unable to start survey. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      {/* Decorative corner elements */}
      <div className="fixed top-6 right-6 w-8 h-8 border-t border-r border-gold/40 pointer-events-none hidden lg:block" />
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b border-l border-gold/40 pointer-events-none hidden lg:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-12"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-cream">
              Insights
            </h1>
            <div className="h-px w-24 mx-auto bg-gold/60" />
            <p className="text-sm tracking-[0.2em] uppercase text-gold">
              Market Intelligence
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-cream font-light leading-relaxed tracking-wide"
          >
            Your insights shape the future
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-cream text-sm tracking-[0.1em] uppercase">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-gold/50 text-cream placeholder:text-cream/60 h-12 text-base focus-visible:border-gold focus-visible:ring-gold/30"
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-cream text-sm tracking-[0.1em] uppercase">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-gold/50 text-cream placeholder:text-cream/60 h-12 text-base focus-visible:border-gold focus-visible:ring-gold/30"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 border border-gold/70 text-cream bg-transparent hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Starting..." : "Begin Survey"}
            </Button>
          </div>
        </motion.form>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center space-y-2"
        >
          <div className="h-px w-24 mx-auto bg-gold/50" />
          <p className="text-xs tracking-[0.2em] uppercase text-cream/80">
            8-12 minutes • Confidential
          </p>
        </motion.div>
      </motion.div>
    </main>
  )
}
