"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff } from "lucide-react"
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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
      // Combine first and last name for displayName
      const displayName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") || undefined
      
      await signUp({ 
        email, 
        password, 
        displayName
      })
      toast({
        title: "Account Created!",
        description: "Welcome to Curzon House. Your account has been created successfully.",
      })
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setFirstName("")
      setLastName("")
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signup-first-name" className="text-cream">
                  First Name (Optional)
                </Label>
                <Input
                  id="signup-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-last-name" className="text-cream">
                  Last Name (Optional)
                </Label>
                <Input
                  id="signup-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                  placeholder="Last name"
                />
              </div>
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
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background border-gold/20 text-cream pr-10"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold transition-colors duration-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-confirm-password" className="text-cream">
                Confirm Password *
              </Label>
              <div className="relative">
                <Input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-background border-gold/20 text-cream pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold transition-colors duration-300"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
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
