import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface MembershipApplication {
  // Personal Information
  fullName: string;
  title: string;
  address?: string;
  country?: string;
  residency: string;
  telephone1: string;
  telephone2?: string;
  email: string;
  linkedin: string;
  dateOfBirth: string;
  nationality: string;
  
  // Professional Information
  occupation: string;
  companyName: string;
  companyAddress?: string;
  
  // Additional Information
  personalInterests?: string;
  personalBiography?: string;
  subscriptionPreference?: string;
  
  // Files
  cvUrl?: string;
  photoUrl?: string;
  additionalDocuments?: string[]; // Array of document URLs
  
  // Membership Selection
  membershipType: "standard" | "elite" | "architect";
  
  // Metadata
  submittedAt?: any; // Firestore timestamp
  status?: "pending" | "approved" | "rejected";
}

/**
 * Upload a file to Firebase Storage
 */
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

export async function submitMembershipApplication(
  application: Omit<MembershipApplication, "cvUrl" | "photoUrl" | "additionalDocuments">,
  cvFile?: File,
  photoFile?: File,
  additionalFiles?: File[]
): Promise<string> {
  // Ensure we're on the client side
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    let cvUrl: string | undefined;
    let photoUrl: string | undefined;
    const additionalDocumentUrls: string[] = [];

    // Upload CV if provided
    if (cvFile) {
      try {
        const cvPath = `membership-applications/cvs/${Date.now()}_${cvFile.name}`;
        cvUrl = await uploadFile(cvFile, cvPath);
      } catch (error: any) {
        console.error("Error uploading CV:", error);
        throw new Error(`Failed to upload CV: ${error.message || "Storage permission error"}`);
      }
    }

    // Upload photo if provided
    if (photoFile) {
      try {
        const photoPath = `membership-applications/photos/${Date.now()}_${photoFile.name}`;
        photoUrl = await uploadFile(photoFile, photoPath);
      } catch (error: any) {
        console.error("Error uploading photo:", error);
        // Photo is optional, so we don't throw - just log the error
        console.warn("Photo upload failed, but continuing with application submission");
      }
    }

    // Upload additional documents if provided
    if (additionalFiles && additionalFiles.length > 0) {
      for (const file of additionalFiles) {
        try {
          const docPath = `membership-applications/documents/${Date.now()}_${file.name}`;
          const docUrl = await uploadFile(file, docPath);
          additionalDocumentUrls.push(docUrl);
        } catch (error: any) {
          console.error("Error uploading additional document:", error);
          // Continue with other files even if one fails
        }
      }
    }

    // Add server timestamp and file URLs
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
    if (additionalDocumentUrls.length > 0) {
      applicationWithFiles.additionalDocuments = additionalDocumentUrls;
    }

    // Save to Firestore
    const docRef = await addDoc(
      collection(db, "membershipApplications"),
      applicationWithFiles
    );

    return docRef.id;
  } catch (error) {
    console.error("Error submitting membership application:", error);
    throw error;
  }
}
