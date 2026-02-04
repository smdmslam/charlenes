import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  User,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase";

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData): Promise<User> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Update display name if provided
    if (data.displayName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });
    }

    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up:", error);
    throw error;
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(data: SignInData): Promise<User> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in:", error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function logout(): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

/**
 * Get Firebase Auth error message in user-friendly format
 */
export function getAuthErrorMessage(error: any): string {
  if (!error || !error.code) {
    return "An unexpected error occurred. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled. Please contact support.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    default:
      return error.message || "An error occurred. Please try again.";
  }
}
