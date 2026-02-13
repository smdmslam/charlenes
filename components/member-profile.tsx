"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Edit, Upload, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { getProfile, saveProfile, uploadProfilePhoto, MemberProfile } from "@/lib/profile-service"

interface MemberProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function MemberProfile({ isOpen, onClose }: MemberProfileProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [gender, setGender] = useState<string>("")
  const [membershipType, setMembershipType] = useState<string>("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

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
        setPhotoPreview(profile.photoUrl || null)
        setPhotoFile(null) // Reset photo file when loading existing profile
        setIsEditMode(false) // Show view mode if profile exists
      } else {
        // Initialize with user email if no profile exists
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          fullName: user.displayName || "",
        }))
        setGender("")
        setMembershipType("")
        setPhotoPreview(null)
        setPhotoFile(null)
        setIsEditMode(true) // Show edit mode if no profile exists
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPG, PNG, WEBP, or GIF image.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      setPhotoFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    try {
      let photoUrl = formData.photoUrl

      // Upload photo if a new one was selected
      if (photoFile) {
        setIsUploadingPhoto(true)
        try {
          photoUrl = await uploadProfilePhoto(user.uid, photoFile)
        } catch (error: any) {
          console.error("Error uploading photo:", error)
          throw new Error(`Failed to upload photo: ${error.message || "Please try again."}`)
        } finally {
          setIsUploadingPhoto(false)
        }
      }

      await saveProfile(user.uid, {
        ...formData,
        gender,
        membershipType: membershipType as "founder" | "standard" | "premium" | "vip" | undefined,
        photoUrl,
      })

      // Clear photo file state
      setPhotoFile(null)

      // Reload profile to get updated data
      await loadProfile()
      
      // Switch to view mode after successful save
      setIsEditMode(false)

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
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-cream mb-2">
                Member Profile
              </h2>
              <p className="text-cream/70 text-sm">
                {isEditMode ? "Update your profile information" : "Your profile"}
              </p>
            </div>
            {!isEditMode && (
              <button
                onClick={() => {
                  setIsEditMode(true)
                  // Reset photo file but keep preview of existing photo
                  setPhotoFile(null)
                  setPhotoPreview(formData.photoUrl || null)
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.1em] text-sm font-light"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-cream/70">Loading profile...</p>
            </div>
          ) : isEditMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-cream">Profile Photo</Label>
                <div className="flex items-center gap-6">
                  {photoPreview && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30">
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        id="profile-photo"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-gold/30 rounded-lg cursor-pointer hover:border-gold/50 transition-colors bg-background/50"
                      >
                        <ImageIcon className="w-5 h-5 text-cream/70" />
                        <div className="flex-1">
                          <p className="text-sm text-cream/80">
                            {photoFile ? photoFile.name : "Upload Photo (JPG, PNG, WEBP, GIF - Max 5MB)"}
                          </p>
                        </div>
                        <Upload className="w-4 h-4 text-cream/70" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

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
                    <SelectItem value="founder">Founders Circle (150)</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
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
                  disabled={isSaving || isUploadingPhoto}
                  className="w-full py-4 px-8 border border-gold/50 text-cream hover:bg-gold/10 hover:border-gold transition-all duration-300 uppercase tracking-[0.2em] text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingPhoto ? "Uploading Photo..." : isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* View Mode - Display Profile */}
              {formData.photoUrl && (
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold/30">
                    <img
                      src={formData.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Full Name</Label>
                    <p className="text-cream">{formData.fullName || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Gender</Label>
                    <p className="text-cream capitalize">{gender || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Email</Label>
                    <p className="text-cream">{formData.email || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Telephone 1</Label>
                    <p className="text-cream">{formData.telephone1 || "—"}</p>
                  </div>
                  {formData.telephone2 && (
                    <div>
                      <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Telephone 2</Label>
                      <p className="text-cream">{formData.telephone2}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Date of Birth</Label>
                    <p className="text-cream">{formData.dateOfBirth || "—"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Nationality</Label>
                    <p className="text-cream">{formData.nationality || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Occupation</Label>
                    <p className="text-cream">{formData.occupation || "—"}</p>
                  </div>
                  {formData.linkedin && (
                    <div>
                      <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">LinkedIn</Label>
                      <a
                        href={formData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline"
                      >
                        {formData.linkedin}
                      </a>
                    </div>
                  )}
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Company Name</Label>
                    <p className="text-cream">{formData.companyName || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Membership Type</Label>
                    <p className="text-cream">
                      {membershipType === "founder" ? "Founders Circle (150)" : 
                       membershipType === "standard" ? "Standard" : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gold/20">
                <div>
                  <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Address</Label>
                  <p className="text-cream whitespace-pre-line">{formData.address || "—"}</p>
                </div>
                <div>
                  <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Country</Label>
                  <p className="text-cream">{formData.country || "—"}</p>
                </div>
                {formData.companyAddress && (
                  <div>
                    <Label className="text-cream/70 text-xs uppercase tracking-wider mb-1">Company Address</Label>
                    <p className="text-cream whitespace-pre-line">{formData.companyAddress}</p>
                  </div>
                )}
              </div>

              {formData.personalInterests && (
                <div className="pt-4 border-t border-gold/20">
                  <Label className="text-cream/70 text-xs uppercase tracking-wider mb-2 block">Personal Interests</Label>
                  <p className="text-cream leading-relaxed whitespace-pre-line">{formData.personalInterests}</p>
                </div>
              )}

              {formData.personalBiography && (
                <div className="pt-4 border-t border-gold/20">
                  <Label className="text-cream/70 text-xs uppercase tracking-wider mb-2 block">Personal Biography</Label>
                  <p className="text-cream leading-relaxed whitespace-pre-line">{formData.personalBiography}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
