import { create } from 'zustand'

export interface ScreenerQuestion {
  id: string
  question_text: string
  question_type: 'single_choice' | 'multi_choice'
  options: {
    id: string
    text: string
    qualifies: boolean
  }[]
}

export interface CampaignWizardState {
  // Step tracking
  currentStep: number
  completedSteps: number[]

  // Step 1: Basics
  name: string
  surveyUrl: string
  desiredCompletes: number
  startDate: string | null
  endDate: string | null

  // Step 2: Targeting
  selectedDistricts: string[]

  // Step 3: Screener
  screenerQuestions: ScreenerQuestion[]

  // Step 4: Consent
  consentText: string
  privacyPolicyUrl: string
  contactEmail: string
  acknowledgments: string[]

  // Step 5: Quotas
  quotas: Record<string, number> // districtId -> target

  // Step 6: Incentives
  incentiveAmount: number
  incentiveMethod: 'gift_card' | 'direct_deposit'

  // Step 7: Channels
  metaAdsEnabled: boolean
  metaBudget: number
  googleAdsEnabled: boolean
  googleBudget: number

  // Actions
  setCurrentStep: (step: number) => void
  markStepComplete: (step: number) => void
  setBasics: (data: Partial<Pick<CampaignWizardState, 'name' | 'surveyUrl' | 'desiredCompletes' | 'startDate' | 'endDate'>>) => void
  setTargeting: (districts: string[]) => void
  setScreenerQuestions: (questions: ScreenerQuestion[]) => void
  addScreenerQuestion: (question: ScreenerQuestion) => void
  updateScreenerQuestion: (id: string, question: Partial<ScreenerQuestion>) => void
  removeScreenerQuestion: (id: string) => void
  setConsent: (data: Partial<Pick<CampaignWizardState, 'consentText' | 'privacyPolicyUrl' | 'contactEmail' | 'acknowledgments'>>) => void
  setQuotas: (quotas: Record<string, number>) => void
  setIncentives: (data: Partial<Pick<CampaignWizardState, 'incentiveAmount' | 'incentiveMethod'>>) => void
  setChannels: (data: Partial<Pick<CampaignWizardState, 'metaAdsEnabled' | 'metaBudget' | 'googleAdsEnabled' | 'googleBudget'>>) => void
  reset: () => void
}

const initialState = {
  currentStep: 0,
  completedSteps: [],
  name: '',
  surveyUrl: '',
  desiredCompletes: 100,
  startDate: null,
  endDate: null,
  selectedDistricts: [],
  screenerQuestions: [],
  consentText: '',
  privacyPolicyUrl: '',
  contactEmail: '',
  acknowledgments: [],
  quotas: {},
  incentiveAmount: 15,
  incentiveMethod: 'gift_card' as const,
  metaAdsEnabled: false,
  metaBudget: 500,
  googleAdsEnabled: false,
  googleBudget: 500,
}

export const useCampaignWizardStore = create<CampaignWizardState>((set) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  markStepComplete: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),

  setBasics: (data) => set((state) => ({ ...state, ...data })),

  setTargeting: (districts) => set({ selectedDistricts: districts }),

  setScreenerQuestions: (questions) => set({ screenerQuestions: questions }),

  addScreenerQuestion: (question) =>
    set((state) => ({
      screenerQuestions: [...state.screenerQuestions, question],
    })),

  updateScreenerQuestion: (id, updates) =>
    set((state) => ({
      screenerQuestions: state.screenerQuestions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    })),

  removeScreenerQuestion: (id) =>
    set((state) => ({
      screenerQuestions: state.screenerQuestions.filter((q) => q.id !== id),
    })),

  setConsent: (data) => set((state) => ({ ...state, ...data })),

  setQuotas: (quotas) => set({ quotas }),

  setIncentives: (data) => set((state) => ({ ...state, ...data })),

  setChannels: (data) => set((state) => ({ ...state, ...data })),

  reset: () => set(initialState),
}))
