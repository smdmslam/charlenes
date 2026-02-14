/**
 * Survey Question Configuration
 * 
 * This file defines the survey questions structure.
 * Questions can be easily imported/exported and extended.
 */

export type QuestionType = 
  | "multiple_choice"
  | "multiple_choice_multi"
  | "opinion_scale"
  | "short_text"
  | "long_text"
  | "matrix"
  | "ranking"

export interface QuestionOption {
  id: string
  label: string
  value: string | number
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: {
    min?: string
    max?: string
  }
  placeholder?: string
  maxLength?: number
  conditionalLogic?: {
    dependsOn: string
    condition: (answer: any) => boolean
  }
}

/**
 * MVP: 5 Simple Questions
 * These can be easily extended with the full survey from the docs
 */
export const mvpQuestions: Question[] = [
  {
    id: "q1",
    type: "multiple_choice",
    title: "What is your current relationship to private members' clubs?",
    required: true,
    options: [
      { id: "opt1", label: "Current member of 1 club", value: "member_1" },
      { id: "opt2", label: "Member of 2-3 clubs", value: "member_2_3" },
      { id: "opt3", label: "Member of 4+ clubs", value: "member_4_plus" },
      { id: "opt4", label: "Frequent guest (non-member)", value: "frequent_guest" },
      { id: "opt5", label: "Former member", value: "former_member" },
    ],
  },
  {
    id: "q2",
    type: "multiple_choice_multi",
    title: "How do you primarily use clubs? (Select your top 3)",
    description: "Select up to 3 options",
    required: true,
    options: [
      { id: "opt1", label: "Business meetings", value: "business_meetings" },
      { id: "opt2", label: "Solo work / laptop sessions", value: "solo_work" },
      { id: "opt3", label: "Social dining & drinks", value: "social_dining" },
      { id: "opt4", label: "Evening entertainment", value: "evening_entertainment" },
      { id: "opt5", label: "Cultural events / talks", value: "cultural_events" },
      { id: "opt6", label: "Wellness / fitness", value: "wellness" },
      { id: "opt7", label: "Overnight stays", value: "overnight_stays" },
    ],
  },
  {
    id: "q3",
    type: "multiple_choice",
    title: "What is your approximate annual spend across all clubs?",
    description: "Membership fees + F&B + rooms",
    required: true,
    options: [
      { id: "opt1", label: "Under £5,000", value: "under_5k" },
      { id: "opt2", label: "£5,000 – £15,000", value: "5k_15k" },
      { id: "opt3", label: "£15,000 – £30,000", value: "15k_30k" },
      { id: "opt4", label: "£30,000 – £50,000", value: "30k_50k" },
      { id: "opt5", label: "Over £50,000", value: "over_50k" },
    ],
  },
  {
    id: "q4",
    type: "opinion_scale",
    title: "How well do London's leading clubs currently deliver on business utility?",
    description: "Rate from 1 (very weak) to 10 (exceptional)",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: {
      min: "Very weak",
      max: "Exceptional",
    },
  },
  {
    id: "q5",
    type: "long_text",
    title: "What would make a new club concept compelling to you?",
    description: "Please share your thoughts",
    required: false,
    placeholder: "Enter your response...",
    maxLength: 500,
  },
]

/**
 * Get question by ID
 */
export function getQuestionById(questionId: string): Question | undefined {
  return mvpQuestions.find((q) => q.id === questionId)
}

/**
 * Get all questions
 */
export function getAllQuestions(): Question[] {
  return mvpQuestions
}

/**
 * Get total number of questions
 */
export function getTotalQuestions(): number {
  return mvpQuestions.length
}

/**
 * Calculate completion percentage
 */
export function calculateCompletion(answers: Record<string, any>): number {
  const requiredQuestions = mvpQuestions.filter((q) => q.required)
  const answeredRequired = requiredQuestions.filter((q) => {
    const answer = answers[q.id]
    return answer !== undefined && answer !== null && answer !== ""
  }).length

  return requiredQuestions.length > 0
    ? Math.round((answeredRequired / requiredQuestions.length) * 100)
    : 0
}
