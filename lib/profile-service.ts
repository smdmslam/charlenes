import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export interface MemberProfile {
  // Personal Information
  fullName: string;
  gender: string;
  address: string;
  country: string;
  telephone1: string;
  telephone2?: string;
  email: string;
  linkedin?: string;
  dateOfBirth: string;
  nationality: string;
  
  // Professional Information
  occupation: string;
  companyName: string;
  companyAddress: string;
  
  // Additional Information
  personalInterests?: string;
  personalBiography?: string;
  photoUrl?: string;
  
  // Membership Information
  membershipType?: "founder" | "standard" | "premium" | "vip";
  
  // Metadata
  updatedAt?: any; // Firestore timestamp
  createdAt?: any; // Firestore timestamp
}

/**
 * Get user profile from Firestore
 */
export async function getProfile(userId: string): Promise<MemberProfile | null> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    // Dynamically import to ensure Firebase is initialized
    const { db } = await import("./firebase");
    
    // Check if db is properly initialized
    if (!db || typeof db === "object" && Object.keys(db).length === 0) {
      throw new Error("Firebase is not properly initialized");
    }

    const profileRef = doc(db, "memberProfiles", userId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      return profileSnap.data() as MemberProfile;
    }

    return null;
  } catch (error: any) {
    console.error("Error getting profile:", error);
    
    // Handle offline errors gracefully
    if (error.code === "unavailable" || error.message?.includes("offline")) {
      throw new Error("You are currently offline. Please check your internet connection.");
    }
    
    throw error;
  }
}

/**
 * Save or update user profile in Firestore
 */
export async function saveProfile(userId: string, profile: Partial<MemberProfile>): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    // Dynamically import to ensure Firebase is initialized
    const { db } = await import("./firebase");
    
    // Check if db is properly initialized
    if (!db || typeof db === "object" && Object.keys(db).length === 0) {
      throw new Error("Firebase is not properly initialized");
    }

    const profileRef = doc(db, "memberProfiles", userId);
    const existingProfile = await getDoc(profileRef);

    const profileData = {
      ...profile,
      updatedAt: serverTimestamp(),
    };

    if (existingProfile.exists()) {
      // Update existing profile
      await updateDoc(profileRef, profileData);
    } else {
      // Create new profile
      await setDoc(profileRef, {
        ...profileData,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error: any) {
    console.error("Error saving profile:", error);
    
    // Handle offline errors gracefully
    if (error.code === "unavailable" || error.message?.includes("offline")) {
      throw new Error("You are currently offline. Please check your internet connection and try again.");
    }
    
    throw error;
  }
}

/**
 * Upload photo file to Firebase Storage
 */
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Please upload a JPG, PNG, WEBP, or GIF image.");
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit. Please upload a smaller image.");
    }

    const photoPath = `member-profiles/${userId}/photo_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, photoPath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading profile photo:", error);
    throw error;
  }
}
