"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { getSurveySession, updateSurveySession, saveSurveyAnswer } from "@/lib/survey-service"
import { getAllQuestions, getQuestionById, calculateCompletion, type Question } from "@/lib/survey-questions"
import { SurveyQuestionRenderer } from "@/components/survey-question-renderer"

export default function SurveyTakePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const sessionId = searchParams.get("session")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [sessionName, setSessionName] = useState("")

  const questions = getAllQuestions()
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const completionPercentage = calculateCompletion(answers)

  useEffect(() => {
    if (!sessionId) {
      router.push("/insights")
      return
    }

    loadSession()
  }, [sessionId])

  const loadSession = async () => {
    if (!sessionId) return

    try {
      const session = await getSurveySession(sessionId)
      if (!session) {
        toast({
          title: "Session Not Found",
          description: "Please start a new survey.",
          variant: "destructive",
        })
        router.push("/insights")
        return
      }

      setSessionName(session.name)
      setAnswers(session.answers || {})
      
      // Resume from last question if in progress
      if (session.metadata?.lastQuestionId) {
        const lastIndex = questions.findIndex((q) => q.id === session.metadata?.lastQuestionId)
        if (lastIndex >= 0) {
          setCurrentQuestionIndex(lastIndex)
        }
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error loading session:", error)
      toast({
        title: "Error",
        description: "Failed to load survey session.",
        variant: "destructive",
      })
      router.push("/insights")
    }
  }

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const saveProgress = async () => {
    if (!sessionId) return

    setIsSaving(true)
    try {
      await updateSurveySession(sessionId, {
        answers,
        metadata: {
          lastQuestionId: currentQuestion.id,
          completionPercentage,
        },
      })
    } catch (error) {
      console.error("Error saving progress:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    // Validate required question
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      toast({
        title: "Required Question",
        description: "Please answer this question before continuing.",
        variant: "destructive",
      })
      return
    }

    // Save progress
    await saveProgress()

    // Move to next question or complete
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Complete survey
      await completeSurvey()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const completeSurvey = async () => {
    if (!sessionId) return

    setIsSaving(true)
    try {
      await updateSurveySession(sessionId, {
        status: "completed",
        answers,
        metadata: {
          completionPercentage: 100,
        },
      })

      toast({
        title: "Survey Completed",
        description: "Thank you for your insights.",
      })

      // Redirect to thank you page
      router.push(`/insights/complete?session=${sessionId}`)
    } catch (error) {
      console.error("Error completing survey:", error)
      toast({
        title: "Error",
        description: "Failed to complete survey. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-cream text-lg tracking-wide">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-px bg-border/20 z-50">
        <motion.div
          className="h-full bg-gold origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-8 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-light tracking-[0.15em] text-cream">
              Insights
            </h1>
            {sessionName && (
              <p className="text-xs tracking-[0.2em] uppercase text-gold mt-1">
                {sessionName}
              </p>
            )}
          </div>
          <div className="text-sm text-cream tracking-wide">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </header>

      {/* Question content */}
      <div className="pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Question number and title */}
            <div className="space-y-4">
              <div className="text-xs tracking-[0.2em] uppercase text-gold">
                Question {currentQuestionIndex + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] text-cream leading-relaxed">
                {currentQuestion.title}
              </h2>
              {currentQuestion.description && (
                <p className="text-base text-cream font-light leading-relaxed">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Question renderer */}
            <div className="pt-4">
              <SurveyQuestionRenderer
                question={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-8 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-sm border-t border-gold/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isSaving}
            variant="outline"
            className="border-gold/50 text-cream hover:bg-gold/10 hover:border-gold disabled:opacity-30"
          >
            Previous
          </Button>

          <div className="text-xs text-cream tracking-wide">
            {isSaving && "Saving..."}
          </div>

          <Button
            onClick={handleNext}
            disabled={isSaving}
            className="border border-gold/70 text-cream bg-transparent hover:bg-gold/10 hover:border-gold uppercase tracking-[0.2em] text-sm font-light"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </footer>
    </main>
  )
}
