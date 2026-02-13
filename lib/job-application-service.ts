import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface JobApplication {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  currentRole?: string;
  currentCompany?: string;
  
  // Files
  cvUrl?: string;
  photoUrl?: string;
  
  // Application Details
  motivation: string;
  selectedRoles: string[]; // Array of role titles
  
  // Metadata
  submittedAt?: any; // Firestore timestamp
  status?: "pending" | "reviewing" | "accepted" | "rejected" | "offer_made" | "hired";
  notes?: string; // Admin notes/next steps
  id?: string; // Document ID
}

// File type validation
const CV_ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const CV_ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const CV_MAX_SIZE = 10 * 1024 * 1024; // 10MB

const PHOTO_ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const PHOTO_ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const PHOTO_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function validateCVFile(file: File): { valid: boolean; error?: string } {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidType = CV_ALLOWED_TYPES.includes(file.type) || CV_ALLOWED_EXTENSIONS.includes(extension);
  const isValidSize = file.size <= CV_MAX_SIZE;

  if (!isValidType) {
    return { valid: false, error: 'CV must be a PDF, DOC, or DOCX file' };
  }
  if (!isValidSize) {
    return { valid: false, error: 'CV file size must be less than 10MB' };
  }
  return { valid: true };
}

export function validatePhotoFile(file: File): { valid: boolean; error?: string } {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidType = PHOTO_ALLOWED_TYPES.includes(file.type) || PHOTO_ALLOWED_EXTENSIONS.includes(extension);
  const isValidSize = file.size <= PHOTO_MAX_SIZE;

  if (!isValidType) {
    return { valid: false, error: 'Photo must be a JPG, PNG, WEBP, or GIF file' };
  }
  if (!isValidSize) {
    return { valid: false, error: 'Photo file size must be less than 5MB' };
  }
  return { valid: true };
}

export async function uploadFile(
  file: File,
  path: string
): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function submitJobApplication(
  application: Omit<JobApplication, "cvUrl" | "photoUrl">,
  cvFile?: File,
  photoFile?: File
): Promise<string> {
  // Ensure we're on the client side
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    let cvUrl: string | undefined;
    let photoUrl: string | undefined;

    // Upload CV if provided
    if (cvFile) {
      try {
        const cvPath = `job-applications/cvs/${Date.now()}_${cvFile.name}`;
        cvUrl = await uploadFile(cvFile, cvPath);
      } catch (error: any) {
        console.error("Error uploading CV:", error);
        throw new Error(`Failed to upload CV: ${error.message || "Storage permission error"}`);
      }
    }

    // Upload photo if provided
    if (photoFile) {
      try {
        const photoPath = `job-applications/photos/${Date.now()}_${photoFile.name}`;
        photoUrl = await uploadFile(photoFile, photoPath);
      } catch (error: any) {
        console.error("Error uploading photo:", error);
        // Photo is optional, so we don't throw - just log the error
        console.warn("Photo upload failed, but continuing with application submission");
      }
    }

    // Add server timestamp and file URLs
    // Only include file URLs if they exist (Firestore doesn't accept undefined)
    const applicationWithFiles: any = {
      ...application,
      submittedAt: serverTimestamp(),
      status: "pending" as const,
    };

    // Only add file URLs if they exist
    if (cvUrl) {
      applicationWithFiles.cvUrl = cvUrl;
    }
    if (photoUrl) {
      applicationWithFiles.photoUrl = photoUrl;
    }

    // Save to Firestore
    try {
      const docRef = await addDoc(
        collection(db, "jobApplications"),
        applicationWithFiles
      );
      return docRef.id;
    } catch (error: any) {
      console.error("Error saving to Firestore:", error);
      throw new Error(`Failed to save application: ${error.message || "Firestore permission error"}`);
    }
  } catch (error: any) {
    console.error("Error submitting job application:", error);
    throw error;
  }
}

/**
 * Get all job applications (admin only)
 */
export async function getAllJobApplications(): Promise<JobApplication[]> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    const applicationsRef = collection(db, "jobApplications");
    const q = query(applicationsRef, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);

    const applications: JobApplication[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({
        ...doc.data(),
        id: doc.id,
      } as JobApplication);
    });

    return applications;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
}

/**
 * Update job application status and notes (admin only)
 */
export async function updateJobApplication(
  applicationId: string,
  updates: {
    status?: JobApplication["status"];
    notes?: string;
  }
): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    const applicationRef = doc(db, "jobApplications", applicationId);
    await updateDoc(applicationRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating job application:", error);
    throw error;
  }
}
