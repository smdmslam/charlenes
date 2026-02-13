"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { getAllJobApplications, updateJobApplication, JobApplication } from "@/lib/job-application-service"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ExternalLink, Download, User } from "lucide-react"
import { format } from "date-fns"

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "reviewing", label: "Reviewing" },
  { value: "set_up_interview", label: "Set Up Interview" },
  { value: "rejected", label: "Rejected" },
  { value: "offer_made", label: "Offer Made" },
  { value: "hired", label: "Hired" },
]

export default function AdminApplicationsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    if (user) {
      loadApplications()
    }
  }, [user])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(applications.filter((app) => app.status === statusFilter))
    }
  }, [applications, statusFilter])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const apps = await getAllJobApplications()
      setApplications(apps)
    } catch (error: any) {
      console.error("Error loading applications:", error)
      const errorMessage = error.code === "permission-denied" || error.message?.includes("permission")
        ? "Admin access required. Please ensure your account has the 'admin' custom claim set in Firebase Authentication."
        : "Failed to load applications. Please check if you have admin access."
      toast({
        title: "Access Denied",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: JobApplication["status"]) => {
    try {
      await updateJobApplication(applicationId, { status: newStatus })
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
      )
      toast({
        title: "Status Updated",
        description: "Application status has been updated.",
      })
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      })
    }
  }

  const handleNotesSave = async (applicationId: string) => {
    try {
      await updateJobApplication(applicationId, { notes: editingNotes })
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, notes: editingNotes } : app))
      )
      setEditingId(null)
      setEditingNotes("")
      toast({
        title: "Notes Saved",
        description: "Notes have been updated.",
      })
    } catch (error: any) {
      console.error("Error saving notes:", error)
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save notes.",
        variant: "destructive",
      })
    }
  }

  const startEditing = (app: JobApplication) => {
    setEditingId(app.id || null)
    setEditingNotes(app.notes || "")
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    try {
      if (timestamp.toDate) {
        return format(timestamp.toDate(), "MMM d, yyyy 'at' h:mm a")
      }
      return "N/A"
    } catch {
      return "N/A"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navigation sections={[]} activeIndex={0} onNavigate={() => {}} />
        <div className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-black/70">Loading applications...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation sections={[]} activeIndex={0} onNavigate={() => {}} />
      
      <div className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-black mb-2">
              Candidate Tracker
            </h1>
            <p className="text-black/70 mb-6">
              Manage and track job applications
            </p>
            
            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <Label className="text-black">Filter by Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-black/20 text-black w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-black/20">
                  <SelectItem 
                    value="all"
                    className="text-black hover:bg-black/5 focus:bg-black/10 cursor-pointer"
                  >
                    All Applications
                  </SelectItem>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-black hover:bg-black/5 focus:bg-black/10 cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-black/60">
                ({filteredApplications.length} {filteredApplications.length === 1 ? "application" : "applications"})
              </span>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-black/70">
                  {applications.length === 0 
                    ? "No applications yet." 
                    : `No applications with status "${STATUS_OPTIONS.find(o => o.value === statusFilter)?.label || statusFilter}"`}
                </p>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-black/20"
                >
                  {/* Header Section with Photo, Name, Contact, and Roles */}
                  <div className="mb-6 pb-6 border-b-2 border-black/10">
                    <div className="flex items-start gap-6 mb-4">
                      {/* Photo */}
                      {app.photoUrl && (
                        <a
                          href={app.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black/30 hover:border-gold/50 transition-colors cursor-pointer flex-shrink-0"
                        >
                          <img
                            src={app.photoUrl}
                            alt={app.fullName}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      )}
                      
                      {/* Three Column Layout */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Column 1: Name, Email, Current Role */}
                        <div>
                          <h3 className="text-2xl font-semibold text-black mb-3">{app.fullName}</h3>
                          <div className="space-y-2 text-sm">
                            <p className="text-black/80"><strong className="text-black">Email:</strong> {app.email}</p>
                            {app.currentRole && (
                              <p className="text-black/80"><strong className="text-black">Current Role:</strong> {app.currentRole}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Column 2: Phone, Company */}
                        <div className="flex items-start pt-8">
                          <div className="space-y-2 text-sm">
                            <p className="text-black/80"><strong className="text-black">Phone:</strong> {app.phone}</p>
                            {app.currentCompany && (
                              <p className="text-black/80"><strong className="text-black">Company:</strong> {app.currentCompany}</p>
                            )}
                            {app.linkedin && (
                              <a
                                href={app.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:underline flex items-center gap-1"
                              >
                                LinkedIn <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Column 3: Status */}
                        <div className="flex items-start pt-8">
                          <div className="w-full">
                            <Label className="text-black font-semibold mb-2 block text-sm">Status</Label>
                            <Select
                              value={app.status || "pending"}
                              onValueChange={(value) => handleStatusChange(app.id!, value as JobApplication["status"])}
                            >
                              <SelectTrigger className="bg-white border-2 border-black/30 text-black w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-black/20">
                                {STATUS_OPTIONS.map((option) => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="text-black hover:bg-black/5 focus:bg-black/10 cursor-pointer"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Selected Roles in Header */}
                    <div>
                      <h4 className="text-sm font-semibold text-black mb-2 uppercase tracking-wider">
                        Selected Roles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {app.selectedRoles.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-black/80 text-white text-xs font-semibold rounded-md border border-black/30"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Motivation and Notes Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left Column - Motivation */}
                    <div className="bg-black/5 rounded-lg p-4 border border-black/10 h-full flex flex-col">
                      <h4 className="text-sm font-semibold text-black mb-3 uppercase tracking-wider">
                        Motivation
                      </h4>
                      <p className="text-sm text-black/80 leading-relaxed flex-1">{app.motivation}</p>
                    </div>

                    {/* Right Column - Notes */}
                    <div className="bg-black/5 rounded-lg p-4 border border-black/10 h-full flex flex-col">
                      <h4 className="text-sm font-semibold text-black mb-3 uppercase tracking-wider">
                        Notes / Next Steps
                      </h4>
                      {editingId === app.id ? (
                        <div className="flex-1 flex flex-col">
                          <Textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            rows={8}
                            className="bg-white border-2 border-black/30 text-black text-sm flex-1"
                            placeholder="Add notes or next steps..."
                          />
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleNotesSave(app.id!)}
                              className="px-4 py-2 bg-black text-cream text-sm hover:bg-black/90 transition-colors rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null)
                                setEditingNotes("")
                              }}
                              className="px-4 py-2 border-2 border-black/30 text-black text-sm hover:bg-black/5 transition-colors rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <p className="text-sm text-black/80 flex-1 p-3 bg-white rounded border-2 border-black/10">
                            {app.notes || "No notes yet. Click to add."}
                          </p>
                          <button
                            onClick={() => startEditing(app)}
                            className="mt-3 text-xs text-gold hover:underline font-medium self-start"
                          >
                            {app.notes ? "Edit Notes" : "Add Notes"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer with Files and Timestamp */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-black/10">
                    {/* Files */}
                    <div className="flex items-center gap-4">
                      {app.cvUrl && (
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-black/80 hover:text-gold transition-colors font-medium"
                        >
                          <Download className="w-4 h-4" />
                          View CV
                        </a>
                      )}
                      {app.photoUrl && (
                        <a
                          href={app.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-black/80 hover:text-gold transition-colors font-medium"
                        >
                          <User className="w-4 h-4" />
                          View Full Photo
                        </a>
                      )}
                    </div>
                    
                    {/* Timestamp */}
                    <p className="text-xs text-black/60 font-medium">
                      Submitted: {formatDate(app.submittedAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
