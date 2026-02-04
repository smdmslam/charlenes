"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { getProfile, saveProfile, MemberProfile } from "@/lib/profile-service"

interface MemberProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function MemberProfile({ isOpen, onClose }: MemberProfileProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [gender, setGender] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")

  // Form state
  const [formData, setFormData] = useState<Partial<MemberProfile>>({
    fullName: "",
    gender: "",
    address: "",
    country: "",
    telephone1: "",
    telephone2: "",
    email: "",
    linkedin: "",
    dateOfBirth: "",
    nationality: "",
    occupation: "",
    companyName: "",
    companyAddress: "",
    personalInterests: "",
    personalBiography: "",
    membershipType: undefined,
  })

  // Load profile when modal opens
  useEffect(() => {
    if (isOpen && user) {
      loadProfile()
    }
  }, [isOpen, user])

  const loadProfile = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const profile = await getProfile(user.uid)
      if (profile) {
        setFormData(profile)
        setGender(profile.gender || "")
        setMembershipType(profile.membershipType || "")
      } else {
        // Initialize with user email if no profile exists
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          fullName: user.displayName || "",
        }))
        setGender("")
        setMembershipType("")
      }
    } catch (error: any) {
      console.error("Error loading profile:", error)
      const errorMessage = error.message || "Failed to load your profile. Please try again."
      toast({
        title: "Error Loading Profile",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    try {
      await saveProfile(user.uid, {
        ...formData,
        gender,
        membershipType: membershipType as "founder" | "standard" | "premium" | "vip" | undefined,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      })
    } catch (error: any) {
      console.error("Error saving profile:", error)
      const errorMessage = error.message || "Failed to save your profile. Please try again."
      toast({
        title: "Save Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof MemberProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
        className="fixed inset-0 z-[201] flex items-start justify-center p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background border border-gold/20 w-full max-w-4xl p-8 md:p-12 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
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
              Member Profile
            </h2>
            <p className="text-cream/70 text-sm">
              Update your profile information
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-cream/70">Loading profile...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-fullName" className="text-cream">Full Name</Label>
                  <Input
                    id="profile-fullName"
                    value={formData.fullName || ""}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-gender" className="text-cream">Gender</Label>
                  <Select 
                    value={gender} 
                    onValueChange={(value) => {
                      setGender(value)
                      handleChange("gender", value)
                    }}
                  >
                    <SelectTrigger className="bg-background border-gold/20 text-cream">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="z-[250]">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="profile-address" className="text-cream">Address</Label>
                <Textarea
                  id="profile-address"
                  rows={3}
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="profile-country" className="text-cream">Country</Label>
                <Input
                  id="profile-country"
                  value={formData.country || ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                />
              </div>

              {/* Telephone 1 and Telephone 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-telephone1" className="text-cream">Telephone 1</Label>
                  <Input
                    id="profile-telephone1"
                    type="tel"
                    value={formData.telephone1 || ""}
                    onChange={(e) => handleChange("telephone1", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-telephone2" className="text-cream">Telephone 2</Label>
                  <Input
                    id="profile-telephone2"
                    type="tel"
                    value={formData.telephone2 || ""}
                    onChange={(e) => handleChange("telephone2", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
              </div>

              {/* Email and LinkedIn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-email" className="text-cream">Email</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-linkedin" className="text-cream">LinkedIn (URL)</Label>
                  <Input
                    id="profile-linkedin"
                    type="url"
                    value={formData.linkedin || ""}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
              </div>

              {/* Date of Birth and Nationality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-dateOfBirth" className="text-cream">Date of Birth</Label>
                  <Input
                    id="profile-dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth || ""}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-nationality" className="text-cream">Nationality</Label>
                  <Input
                    id="profile-nationality"
                    value={formData.nationality || ""}
                    onChange={(e) => handleChange("nationality", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
              </div>

              {/* Occupation and Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-occupation" className="text-cream">Occupation</Label>
                  <Input
                    id="profile-occupation"
                    value={formData.occupation || ""}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-companyName" className="text-cream">Company Name</Label>
                  <Input
                    id="profile-companyName"
                    value={formData.companyName || ""}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    className="bg-background border-gold/20 text-cream"
                  />
                </div>
              </div>

              {/* Company Address */}
              <div className="space-y-2">
                <Label htmlFor="profile-companyAddress" className="text-cream">Company Address</Label>
                <Textarea
                  id="profile-companyAddress"
                  rows={3}
                  value={formData.companyAddress || ""}
                  onChange={(e) => handleChange("companyAddress", e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                />
              </div>

              {/* Personal Interests */}
              <div className="space-y-2">
                <Label htmlFor="profile-personalInterests" className="text-cream">Personal Interests</Label>
                <Textarea
                  id="profile-personalInterests"
                  rows={4}
                  value={formData.personalInterests || ""}
                  onChange={(e) => handleChange("personalInterests", e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                />
              </div>

              {/* Membership Type */}
              <div className="space-y-2">
                <Label htmlFor="profile-membershipType" className="text-cream">Membership Type</Label>
                <Select 
                  value={membershipType} 
                  onValueChange={(value) => {
                    setMembershipType(value)
                    handleChange("membershipType", value)
                  }}
                >
                  <SelectTrigger className="bg-background border-gold/20 text-cream">
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent className="z-[250]">
                    <SelectItem value="founder">Founder</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Personal Biography */}
              <div className="space-y-2">
                <Label htmlFor="profile-personalBiography" className="text-cream">
                  Personal Biography ("Tell us your story")
                </Label>
                <Textarea
                  id="profile-personalBiography"
                  rows={6}
                  value={formData.personalBiography || ""}
                  onChange={(e) => handleChange("personalBiography", e.target.value)}
                  className="bg-background border-gold/20 text-cream"
                  placeholder="Please provide a brief biography..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-4 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
