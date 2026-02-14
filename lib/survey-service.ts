import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface SurveySession {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
  status: "in_progress" | "completed"
  answers: Record<string, any>
  metadata?: {
    timeSpent?: number
    lastQuestionId?: string
    completionPercentage?: number
  }
}

export interface SurveyResponse {
  sessionId: string
  questionId: string
  answer: any
  timestamp: Date
}

/**
 * Create a new survey session with name and email
 */
export async function createSurveySession(data: { name: string; email: string }): Promise<string> {
  try {
    const sessionsRef = collection(db, "survey_sessions")
    const newSessionRef = doc(sessionsRef)
    
    const sessionData: Omit<SurveySession, "id"> = {
      name: data.name,
      email: data.email.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "in_progress",
      answers: {},
      metadata: {
        timeSpent: 0,
        completionPercentage: 0,
      },
    }

    await setDoc(newSessionRef, {
      ...sessionData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return newSessionRef.id
  } catch (error) {
    console.error("Error creating survey session:", error)
    throw new Error("Failed to create survey session")
  }
}

/**
 * Get a survey session by ID
 */
export async function getSurveySession(sessionId: string): Promise<SurveySession | null> {
  try {
    const sessionRef = doc(db, "survey_sessions", sessionId)
    const sessionSnap = await getDoc(sessionRef)

    if (!sessionSnap.exists()) {
      return null
    }

    const data = sessionSnap.data()
    return {
      id: sessionSnap.id,
      name: data.name,
      email: data.email,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      status: data.status || "in_progress",
      answers: data.answers || {},
      metadata: data.metadata || {},
    }
  } catch (error) {
    console.error("Error getting survey session:", error)
    throw new Error("Failed to get survey session")
  }
}

/**
 * Update survey session with answers
 */
export async function updateSurveySession(
  sessionId: string,
  updates: {
    answers?: Record<string, any>
    status?: "in_progress" | "completed"
    metadata?: Partial<SurveySession["metadata"]>
  }
): Promise<void> {
  try {
    const sessionRef = doc(db, "survey_sessions", sessionId)
    
    const updateData: any = {
      updatedAt: serverTimestamp(),
    }

    if (updates.answers) {
      updateData.answers = updates.answers
    }

    if (updates.status) {
      updateData.status = updates.status
    }

    if (updates.metadata) {
      updateData.metadata = {
        ...updates.metadata,
      }
    }

    await updateDoc(sessionRef, updateData)
  } catch (error) {
    console.error("Error updating survey session:", error)
    throw new Error("Failed to update survey session")
  }
}

/**
 * Save a single answer to a survey session
 */
export async function saveSurveyAnswer(
  sessionId: string,
  questionId: string,
  answer: any
): Promise<void> {
  try {
    const session = await getSurveySession(sessionId)
    if (!session) {
      throw new Error("Session not found")
    }

    const updatedAnswers = {
      ...session.answers,
      [questionId]: answer,
    }

    await updateSurveySession(sessionId, {
      answers: updatedAnswers,
    })
  } catch (error) {
    console.error("Error saving survey answer:", error)
    throw new Error("Failed to save answer")
  }
}

/**
 * Get all survey sessions (for admin/results)
 */
export async function getAllSurveySessions(): Promise<SurveySession[]> {
  try {
    const sessionsRef = collection(db, "survey_sessions")
    const querySnapshot = await getDocs(sessionsRef)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        status: data.status || "in_progress",
        answers: data.answers || {},
        metadata: data.metadata || {},
      }
    })
  } catch (error) {
    console.error("Error getting all survey sessions:", error)
    throw new Error("Failed to get survey sessions")
  }
}

/**
 * Get completed survey sessions only
 */
export async function getCompletedSurveySessions(): Promise<SurveySession[]> {
  try {
    const sessionsRef = collection(db, "survey_sessions")
    const q = query(sessionsRef, where("status", "==", "completed"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        status: data.status as "completed",
        answers: data.answers || {},
        metadata: data.metadata || {},
      }
    })
  } catch (error) {
    console.error("Error getting completed survey sessions:", error)
    throw new Error("Failed to get completed survey sessions")
  }
}
