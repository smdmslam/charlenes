"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { signUp, getAuthErrorMessage } from "@/lib/auth-service"

interface AuthSignUpProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}

export function AuthSignUp({ isOpen, onClose, onSwitchToSignIn }: AuthSignUpProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await signUp({ 
        email, 
        password, 
        displayName: displayName || undefined 
      })
      toast({
        title: "Account Created!",
        description: "Welcome to Curzon House. Your account has been created successfully.",
      })
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setDisplayName("")
      onClose()
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background border border-gold/20 w-full max-w-md p-8 md:p-12 space-y-6 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 text-cream hover:text-gold transition-colors duration-300"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-cream mb-2">
              Sign Up
            </h2>
            <p className="text-cream/70 text-sm">
              Join Curzon House
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-cream">
                Full Name (Optional)
              </Label>
              <Input
                id="signup-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-background border-gold/20 text-cream"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-cream">
                Email *
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-gold/20 text-cream"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-cream">
                Password *
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background border-gold/20 text-cream"
                placeholder="At least 6 characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password" className="text-cream">
                Confirm Password *
              </Label>
              <Input
                id="signup-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background border-gold/20 text-cream"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="text-center pt-4 border-t border-gold/20">
            <p className="text-cream/70 text-sm mb-2">
              Already have an account?
            </p>
            <button
              onClick={() => {
                onClose()
                onSwitchToSignIn()
              }}
              className="text-gold hover:text-gold/80 transition-colors duration-300 text-sm uppercase tracking-[0.1em]"
            >
              Sign In
            </button>
          </div>
        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
