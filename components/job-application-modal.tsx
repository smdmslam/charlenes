"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, FileText, Image as ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { submitJobApplication, validateCVFile, validatePhotoFile } from "@/lib/job-application-service"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  roles: Array<{
    title: string
    description: string
    requirements: string
  }>
}

export function JobApplicationModal({ isOpen, onClose, roles }: JobApplicationModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedRoleForDescription, setSelectedRoleForDescription] = useState<string | null>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    currentRole: "",
    currentCompany: "",
    motivation: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRoleToggle = (roleTitle: string) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleTitle)) {
        const newRoles = prev.filter((r) => r !== roleTitle)
        // If we removed the role that was showing description, clear it
        if (selectedRoleForDescription === roleTitle) {
          setSelectedRoleForDescription(newRoles.length > 0 ? newRoles[0] : null)
        }
        return newRoles
      } else {
        const newRoles = [...prev, roleTitle]
        // Show description for newly selected role
        setSelectedRoleForDescription(roleTitle)
        return newRoles
      }
    })
  }

  const handleFileChange = (field: "cv" | "photo", file: File | null) => {
    if (!file) {
      if (field === "cv") {
        setCvFile(null)
      } else {
        setPhotoFile(null)
      }
      return
    }

    // Validate file
    const validation = field === "cv" ? validateCVFile(file) : validatePhotoFile(file)
    
    if (!validation.valid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      })
      return
    }

    if (field === "cv") {
      setCvFile(file)
    } else {
      setPhotoFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedRoles.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one role you're interested in.",
        variant: "destructive",
      })
      return
    }

    if (!cvFile) {
      toast({
        title: "CV Required",
        description: "Please upload your CV.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitJobApplication(
        {
          ...formData,
          selectedRoles,
          motivation: formData.motivation,
        },
        cvFile,
        photoFile || undefined
      )

      toast({
        title: "Application Submitted",
        description: "Thank you for your interest. We will review your application and get back to you soon.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        currentRole: "",
        currentCompany: "",
        motivation: "",
      })
      setSelectedRoles([])
      setSelectedRoleForDescription(null)
      setCvFile(null)
      setPhotoFile(null)
      onClose()
    } catch (error: any) {
      console.error("Error submitting application:", error)
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedRoleData = roles.find((r) => r.title === selectedRoleForDescription)

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

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-cream border border-black/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
              {/* Close Button */}
              <div className="sticky top-0 bg-cream border-b border-black/10 flex justify-end p-4 md:p-6 z-10">
                <button
                  onClick={onClose}
                  className="p-2 text-black hover:text-gold transition-colors duration-300"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide text-black mb-8">
                  Job Application
                </h2>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-light tracking-wide text-black mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-black">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className="bg-white border-black/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-white border-black/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-black">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-white border-black/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-black">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        className="bg-white border-black/20 text-black"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentRole" className="text-black">Current Role</Label>
                      <Input
                        id="currentRole"
                        value={formData.currentRole}
                        onChange={(e) => handleChange("currentRole", e.target.value)}
                        className="bg-white border-black/20 text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentCompany" className="text-black">Current Company</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => handleChange("currentCompany", e.target.value)}
                        className="bg-white border-black/20 text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div className="space-y-4 pt-4 border-t border-black/10">
                  <h3 className="text-xl font-light tracking-wide text-black mb-4">Documents</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CV Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="cv" className="text-black">CV/Resume *</Label>
                      <div className="relative">
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          required
                          onChange={(e) => handleFileChange("cv", e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label
                          htmlFor="cv"
                          className="flex items-center gap-3 p-4 border-2 border-dashed border-black/20 rounded-lg cursor-pointer hover:border-gold/40 transition-colors bg-white"
                        >
                          <FileText className="w-5 h-5 text-black/60" />
                          <div className="flex-1">
                            <p className="text-sm text-black/80">
                              {cvFile ? cvFile.name : "Upload CV (PDF, DOC, DOCX - Max 10MB)"}
                            </p>
                          </div>
                          <Upload className="w-4 h-4 text-black/60" />
                        </label>
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-black">Photo</Label>
                      <div className="relative">
                        <input
                          id="photo"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label
                          htmlFor="photo"
                          className="flex items-center gap-3 p-4 border-2 border-dashed border-black/20 rounded-lg cursor-pointer hover:border-gold/40 transition-colors bg-white"
                        >
                          <ImageIcon className="w-5 h-5 text-black/60" />
                          <div className="flex-1">
                            <p className="text-sm text-black/80">
                              {photoFile ? photoFile.name : "Upload Photo (JPG, PNG, WEBP, GIF - Max 5MB)"}
                            </p>
                          </div>
                          <Upload className="w-4 h-4 text-black/60" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-4 pt-4 border-t border-black/10">
                  <h3 className="text-xl font-light tracking-wide text-black mb-4">Select Roles of Interest *</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Role List */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {roles.map((role) => (
                        <label
                          key={role.title}
                          className="flex items-start gap-3 p-4 border border-black/10 rounded-lg cursor-pointer hover:border-gold/40 transition-colors bg-white"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRoles.includes(role.title)}
                            onChange={() => handleRoleToggle(role.title)}
                            className="mt-1 accent-gold"
                          />
                          <span className="text-sm font-medium text-black flex-1">
                            {role.title}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Role Description */}
                    <div className="lg:sticky lg:top-4">
                      {selectedRoleData ? (
                        <div className="bg-white border border-black/10 rounded-lg p-6 h-full">
                          <h4 className="text-lg font-medium text-black mb-3">
                            {selectedRoleData.title}
                          </h4>
                          <p className="text-black/75 mb-4 text-sm leading-relaxed">
                            {selectedRoleData.description}
                          </p>
                          <div className="pt-4 border-t border-black/10">
                            <p className="text-xs uppercase tracking-wider text-black/60 mb-2 font-medium">
                              Requirements
                            </p>
                            <p className="text-black/70 text-sm leading-relaxed">
                              {selectedRoleData.requirements}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white border border-black/10 rounded-lg p-6 h-full flex items-center justify-center">
                          <p className="text-black/50 text-sm text-center">
                            Select a role to view its description
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-2 pt-4 border-t border-black/10">
                  <Label htmlFor="motivation" className="text-black">Motivation *</Label>
                  <Textarea
                    id="motivation"
                    required
                    rows={6}
                    value={formData.motivation}
                    onChange={(e) => handleChange("motivation", e.target.value)}
                    className="bg-white border-black/20 text-black"
                    placeholder="Tell us why you're interested in joining Curzon House and what you would bring to the team..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-black/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 border-2 border-black/30 text-black hover:bg-black hover:text-cream transition-all duration-300 uppercase tracking-wider text-sm font-light disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
