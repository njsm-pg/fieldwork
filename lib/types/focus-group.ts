// Focus Group Screener Types

export type FocusGroupQuestionType =
  | 'consent'
  | 'contact_info'
  | 'single_choice'
  | 'multi_choice'
  | 'text'
  | 'textarea'
  | 'number'

export interface FocusGroupOption {
  id: string
  text: string
  qualifies?: boolean // Optional - defaults to true if not specified
}

export interface FocusGroupQuestion {
  id: string
  type: FocusGroupQuestionType
  title: string
  description?: string
  required?: boolean // Defaults to true
  options?: FocusGroupOption[] // For single_choice, multi_choice, consent
  placeholder?: string // For text, textarea, number
  pattern?: string // For text validation (e.g., ZIP code)
  minLength?: number // For text/textarea
  maxLength?: number // For text/textarea
  min?: number // For number
  max?: number // For number
  // Contact info specific fields
  fields?: {
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
  }
  // Consent specific fields
  consents?: {
    id: string
    text: string
    required?: boolean
  }[]
}

export interface FocusGroupScreenerConfig {
  id: string
  name: string
  description?: string
  questions: FocusGroupQuestion[]
  incentiveAmount?: number
  incentiveMethod?: string
  estimatedMinutes?: number
}

// Response types for storing in database
export type FocusGroupResponseValue =
  | string
  | string[]
  | number
  | {
      firstName?: string
      lastName?: string
      email?: string
      phone?: string
    }
  | Record<string, boolean> // For consent checkboxes

export type FocusGroupResponses = Record<string, FocusGroupResponseValue>
