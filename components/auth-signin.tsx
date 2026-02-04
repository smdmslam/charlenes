"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { signIn, resetPassword, getAuthErrorMessage } from "@/lib/auth-service"

interface AuthSignInProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}

export function AuthSignIn({ isOpen, onClose, onSwitchToSignUp }: AuthSignInProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn({ email, password })
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
      setEmail("")
      setPassword("")
      onClose()
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await resetPassword(email)
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for instructions to reset your password.",
      })
      setShowForgotPassword(false)
    } catch (error: any) {
      toast({
        title: "Error",
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
        <div className="bg-background border border-gold/20 w-full max-w-md p-8 md:p-12 space-y-6">
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
              Sign In
            </h2>
            <p className="text-cream/70 text-sm">
              Welcome back to Curzon House
            </p>
          </div>

          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-cream">
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-gold/20 text-cream"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-cream">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background border-gold/20 text-cream pr-10"
                    placeholder="Enter your password"
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

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-gold hover:text-gold/80 transition-colors duration-300"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-cream">
                  Email
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-gold/20 text-cream"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 py-3 px-8 border border-gold/20 text-cream hover:bg-gold/10 transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="flex-1 py-3 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          )}

          {/* Switch to Sign Up */}
          <div className="text-center pt-4 border-t border-gold/20">
            <p className="text-cream/70 text-sm mb-2">
              Don't have an account?
            </p>
            <button
              onClick={() => {
                onClose()
                onSwitchToSignUp()
              }}
              className="text-gold hover:text-gold/80 transition-colors duration-300 text-sm uppercase tracking-[0.1em]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
