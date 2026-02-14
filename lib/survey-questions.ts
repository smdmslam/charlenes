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
  maxSelections?: number // For multiple_choice_multi questions
  conditionalLogic?: {
    dependsOn: string
    condition: (answer: any) => boolean
  }
}

/**
 * Full Survey Questions
 * Sequential questions without conditional logic
 */
export const mvpQuestions: Question[] = [
  // SECTION 1: Respondent Profile
  {
    id: "q1_1",
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
    id: "q1_2",
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
    id: "q1_3",
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

  // SECTION 2: Clubs You Evaluate
  {
    id: "q2_1",
    type: "multiple_choice_multi",
    title: "Which London clubs do you know well enough to rate?",
    description: "Select all that apply",
    required: true,
    options: [
      { id: "opt1", label: "Annabel's", value: "annabels" },
      { id: "opt2", label: "5 Hertford Street", value: "5_hertford" },
      { id: "opt3", label: "Oswald's", value: "oswalds" },
      { id: "opt4", label: "Soho House (any location)", value: "soho_house" },
      { id: "opt5", label: "The Arts Club", value: "arts_club" },
      { id: "opt6", label: "The Ned", value: "the_ned" },
      { id: "opt7", label: "Home House", value: "home_house" },
      { id: "opt8", label: "Mortimer House", value: "mortimer_house" },
    ],
  },
  {
    id: "q2_2",
    type: "long_text",
    title: "Think of your PRIMARY club (the one you use most). How would you describe its positioning in one sentence?",
    placeholder: "Example: A bohemian creative haven with excellent food but inconsistent service",
    required: true,
    maxLength: 200,
  },

  // SECTION 4: The Co-Working Gap
  {
    id: "q4_1",
    type: "multiple_choice",
    title: "How often do you WANT to use your club(s) as a serious work base but feel you cannot?",
    required: true,
    options: [
      { id: "opt1", label: "Never – clubs work fine for this", value: "never" },
      { id: "opt2", label: "Occasionally (1-2x/month)", value: "occasionally" },
      { id: "opt3", label: "Several times per month (3-5x)", value: "several_times" },
      { id: "opt4", label: "Weekly or more", value: "weekly_plus" },
      { id: "opt5", label: "Not relevant to me", value: "not_relevant" },
    ],
  },
  {
    id: "q4_2",
    type: "opinion_scale",
    title: "For your PRIMARY club, rate the current provision: Quiet, laptop-friendly zones",
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
    id: "q4_3",
    type: "opinion_scale",
    title: "For your PRIMARY club, rate the current provision: Phone/Zoom call rooms",
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
    id: "q4_4",
    type: "opinion_scale",
    title: "For your PRIMARY club, rate the current provision: Small meeting rooms (2-6 people)",
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
    id: "q4_5",
    type: "opinion_scale",
    title: "For your PRIMARY club, rate the current provision: Presentation/boardroom space",
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
    id: "q4_6",
    type: "opinion_scale",
    title: "If a club offered purpose-designed co-working (discreet, high-design, proper infrastructure), how attractive would this be?",
    description: "Rate from 1 (not attractive) to 10 (would change my usage entirely)",
    required: true,
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: {
      min: "Not attractive",
      max: "Would change my usage entirely",
    },
  },
  {
    id: "q4_7",
    type: "multiple_choice_multi",
    title: "Which business services would materially increase your club usage?",
    description: "Select all that apply",
    required: true,
    options: [
      { id: "opt1", label: "Concierge admin (printing, scanning, shipping)", value: "concierge_admin" },
      { id: "opt2", label: "On-demand EA/PA support", value: "ea_pa_support" },
      { id: "opt3", label: "Tech support (AV, secure networks)", value: "tech_support" },
      { id: "opt4", label: "Curated member introductions", value: "member_intros" },
      { id: "opt5", label: "Invitation-only business salons (VC, family offices)", value: "business_salons" },
      { id: "opt6", label: "None would make a difference", value: "none" },
    ],
  },
  {
    id: "q4_8",
    type: "long_text",
    title: "Describe your ideal weekday at a business-enabled club (8am-10pm)",
    placeholder: "Example: Morning coffee + emails in quiet lounge, 10am client meeting in private room, lunch at club restaurant, afternoon calls in soundproof booth, evening drinks in bar...",
    required: false,
    maxLength: 300,
  },

  // SECTION 5: International Expansion
  {
    id: "q5_1",
    type: "multiple_choice",
    title: "Is there demand for a Curzon-style club (art-driven, Michelin dining, discrete suites, cultural programming) in other cities?",
    required: true,
    options: [
      { id: "opt1", label: "Definitely yes", value: "definitely_yes" },
      { id: "opt2", label: "Probably yes", value: "probably_yes" },
      { id: "opt3", label: "Uncertain", value: "uncertain" },
      { id: "opt4", label: "Probably not", value: "probably_not" },
      { id: "opt5", label: "Definitely not", value: "definitely_not" },
    ],
  },
  {
    id: "q5_2",
    type: "multiple_choice_multi",
    title: "Which cities would you prioritize? (Select up to 5)",
    description: "Select up to 5 cities",
    required: false,
    maxSelections: 5,
    options: [
      // North America
      { id: "opt1", label: "New York", value: "new_york" },
      { id: "opt2", label: "Los Angeles", value: "los_angeles" },
      { id: "opt3", label: "Miami", value: "miami" },
      { id: "opt4", label: "San Francisco", value: "san_francisco" },
      // Europe
      { id: "opt5", label: "Paris", value: "paris" },
      { id: "opt6", label: "Geneva", value: "geneva" },
      { id: "opt7", label: "Zurich", value: "zurich" },
      { id: "opt8", label: "Milan", value: "milan" },
      // Middle East
      { id: "opt9", label: "Dubai", value: "dubai" },
      { id: "opt10", label: "Abu Dhabi", value: "abu_dhabi" },
      { id: "opt11", label: "Riyadh", value: "riyadh" },
      // Africa
      { id: "opt12", label: "Lagos", value: "lagos" },
      { id: "opt13", label: "Johannesburg", value: "johannesburg" },
      { id: "opt14", label: "Nairobi", value: "nairobi" },
      { id: "opt15", label: "Cairo", value: "cairo" },
      // Asia
      { id: "opt16", label: "Hong Kong", value: "hong_kong" },
      { id: "opt17", label: "Singapore", value: "singapore" },
      { id: "opt18", label: "Tokyo", value: "tokyo" },
      { id: "opt19", label: "Mumbai", value: "mumbai" },
    ],
  },
  {
    id: "q5_3",
    type: "multiple_choice_multi",
    title: "For international expansion, what must remain CONSISTENT?",
    description: "Select all that apply",
    required: true,
    options: [
      { id: "opt1", label: "Artistic signature/collaboration", value: "artistic_signature" },
      { id: "opt2", label: "Service ritual & standards", value: "service_standards" },
      { id: "opt3", label: "Member caliber & curation", value: "member_curation" },
      { id: "opt4", label: "Michelin-level dining", value: "michelin_dining" },
      { id: "opt5", label: "Brand identity", value: "brand_identity" },
      { id: "opt6", label: "Architectural approach", value: "architectural_approach" },
    ],
  },
  {
    id: "q5_4",
    type: "multiple_choice_multi",
    title: "What should ADAPT locally?",
    description: "Select all that apply",
    required: true,
    options: [
      { id: "opt1", label: "Culinary program", value: "culinary_program" },
      { id: "opt2", label: "Art selection", value: "art_selection" },
      { id: "opt3", label: "Cultural programming", value: "cultural_programming" },
      { id: "opt4", label: "Member composition", value: "member_composition" },
      { id: "opt5", label: "Formality level", value: "formality_level" },
      { id: "opt6", label: "Operating hours", value: "operating_hours" },
    ],
  },

  // SECTION 6: Competitive Advantage
  {
    id: "q6_1_club1",
    type: "short_text",
    title: "Which THREE London clubs are most successful overall?",
    description: "Club 1",
    required: true,
    placeholder: "Enter club name",
    maxLength: 50,
  },
  {
    id: "q6_1_club2",
    type: "short_text",
    title: "Club 2",
    required: true,
    placeholder: "Enter club name",
    maxLength: 50,
  },
  {
    id: "q6_1_club3",
    type: "short_text",
    title: "Club 3",
    required: true,
    placeholder: "Enter club name",
    maxLength: 50,
  },
  {
    id: "q6_2",
    type: "long_text",
    title: "For the clubs you named, what is their ONE decisive advantage?",
    description: "Please describe what makes each club successful",
    required: true,
    placeholder: "Enter your response...",
    maxLength: 500,
  },
  {
    id: "q6_3",
    type: "opinion_scale",
    title: "How well do London's LEADING clubs currently deliver on: Emotional resonance (how a place makes you feel)",
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
    id: "q6_4",
    type: "opinion_scale",
    title: "How well do London's LEADING clubs currently deliver on: Cultural depth (beyond networking)",
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
    id: "q6_5",
    type: "opinion_scale",
    title: "How well do London's LEADING clubs currently deliver on: Serious business utility (office-grade)",
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
    id: "q6_6",
    type: "opinion_scale",
    title: "How well do London's LEADING clubs currently deliver on: International connectivity",
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
    id: "q6_7_priority1",
    type: "short_text",
    title: "If designing a new club from scratch, which THREE dimensions would you deliberately outperform competitors on?",
    description: "Priority 1",
    required: true,
    placeholder: "Enter dimension (e.g., Member quality, Location, Culinary excellence...)",
    maxLength: 100,
  },
  {
    id: "q6_7_why1",
    type: "long_text",
    title: "Why is this your top priority?",
    required: true,
    placeholder: "Enter your response...",
    maxLength: 200,
  },
  {
    id: "q6_7_priority2",
    type: "short_text",
    title: "Priority 2",
    required: true,
    placeholder: "Enter dimension",
    maxLength: 100,
  },
  {
    id: "q6_7_why2",
    type: "long_text",
    title: "Why is this your second priority?",
    required: true,
    placeholder: "Enter your response...",
    maxLength: 200,
  },
  {
    id: "q6_7_priority3",
    type: "short_text",
    title: "Priority 3",
    required: true,
    placeholder: "Enter dimension",
    maxLength: 100,
  },
  {
    id: "q6_7_why3",
    type: "long_text",
    title: "Why is this your third priority?",
    required: true,
    placeholder: "Enter your response...",
    maxLength: 200,
  },

  // SECTION 7: Curzon House Concept Test
  {
    id: "q7_1",
    type: "multiple_choice",
    title: "How compelling is this concept vs your current club(s)?",
    description: "Imagine a Mayfair club combining: Michelin-starred restaurant (open to public), Members-only salons, library, bar, garden, Small number of discrete suites, Contemporary art as cultural language, Advanced but invisible technology, Purpose-designed co-working & meeting spaces",
    required: true,
    options: [
      { id: "opt1", label: "Much less compelling", value: "much_less" },
      { id: "opt2", label: "Slightly less compelling", value: "slightly_less" },
      { id: "opt3", label: "About the same", value: "about_same" },
      { id: "opt4", label: "More compelling", value: "more_compelling" },
      { id: "opt5", label: "Significantly more compelling – would consider switching", value: "significantly_more" },
    ],
  },
  {
    id: "q7_2",
    type: "long_text",
    title: "What would this concept need to ABSOLUTELY NAIL to become your primary club?",
    description: "Be specific",
    placeholder: "Example: The art integration must feel authentic, not corporate. Service needs to match 5 Hertford Street. Co-working can't compromise the evening atmosphere...",
    required: true,
    maxLength: 300,
  },
  {
    id: "q7_3",
    type: "long_text",
    title: "What is your BIGGEST concern or red flag?",
    placeholder: "Example: Sounds like it's trying to be too many things. Worried the restaurant being public would dilute exclusivity...",
    required: true,
    maxLength: 300,
  },
  {
    id: "q7_4",
    type: "multiple_choice",
    title: "Likely membership interest:",
    required: true,
    options: [
      { id: "opt1", label: "Would join as founding member", value: "founding_member" },
      { id: "opt2", label: "Would seriously consider membership", value: "seriously_consider" },
      { id: "opt3", label: "Would visit as guest first", value: "visit_guest" },
      { id: "opt4", label: "Would wait for reviews/reputation", value: "wait_reviews" },
      { id: "opt5", label: "Not interested", value: "not_interested" },
    ],
  },

  // SECTION 8: Partnership Potential
  {
    id: "q8_1",
    type: "multiple_choice_multi",
    title: "Would you be open to:",
    description: "Select all that apply",
    required: true,
    options: [
      { id: "opt1", label: "Being a founding member", value: "founding_member" },
      { id: "opt2", label: "Recommending investors", value: "recommend_investors" },
      { id: "opt3", label: "Providing introductions in other cities", value: "introductions" },
      { id: "opt4", label: "Co-hosting early events", value: "co_hosting" },
      { id: "opt5", label: "None of the above", value: "none" },
    ],
  },
  {
    id: "q8_2",
    type: "multiple_choice",
    title: "May we follow up with you?",
    required: true,
    options: [
      { id: "opt1", label: "Yes – I'm open to a 20-30 minute conversation", value: "yes" },
      { id: "opt2", label: "Maybe – contact me with more details first", value: "maybe" },
      { id: "opt3", label: "No", value: "no" },
    ],
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
