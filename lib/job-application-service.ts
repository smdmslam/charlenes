import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
  status?: "pending" | "reviewing" | "accepted" | "rejected";
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
      const cvPath = `job-applications/cvs/${Date.now()}_${cvFile.name}`;
      cvUrl = await uploadFile(cvFile, cvPath);
    }

    // Upload photo if provided
    if (photoFile) {
      const photoPath = `job-applications/photos/${Date.now()}_${photoFile.name}`;
      photoUrl = await uploadFile(photoFile, photoPath);
    }

    // Add server timestamp and file URLs
    const applicationWithFiles = {
      ...application,
      cvUrl,
      photoUrl,
      submittedAt: serverTimestamp(),
      status: "pending" as const,
    };

    // Save to Firestore
    const docRef = await addDoc(
      collection(db, "jobApplications"),
      applicationWithFiles
    );

    return docRef.id;
  } catch (error) {
    console.error("Error submitting job application:", error);
    throw error;
  }
}
