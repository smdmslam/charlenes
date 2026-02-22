import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

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
  
  // Membership Selection
  membershipType: "standard" | "elite" | "architect";
  
  // Metadata
  submittedAt?: any; // Firestore timestamp
  status?: "pending" | "approved" | "rejected";
}

export async function submitMembershipApplication(
  application: MembershipApplication
): Promise<string> {
  // Ensure we're on the client side
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    // Add server timestamp
    const applicationWithTimestamp = {
      ...application,
      submittedAt: serverTimestamp(),
      status: "pending" as const,
    };

    // Save to Firestore
    const docRef = await addDoc(
      collection(db, "membershipApplications"),
      applicationWithTimestamp
    );

    return docRef.id;
  } catch (error) {
    console.error("Error submitting membership application:", error);
    throw error;
  }
}
