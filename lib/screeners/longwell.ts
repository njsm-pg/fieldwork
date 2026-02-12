import { FocusGroupScreenerConfig } from '@/lib/types/focus-group'

export const longwellScreener: FocusGroupScreenerConfig = {
  id: 'longwell-v1',
  name: 'Longwell Focus Group Screener',
  description: 'Screener for Colorado 5th District focus group recruitment',
  incentiveAmount: 120,
  incentiveMethod: 'gift_card',
  estimatedMinutes: 5,
  questions: [
    {
      id: 'consent',
      type: 'consent',
      title: 'Consent & Verification',
      consents: [
        {
          id: 'age_consent',
          text: 'I confirm that I am 18 years of age or older',
          required: true,
        },
        {
          id: 'data_consent',
          text: 'I consent to my responses being collected, stored, and analyzed for research purposes',
          required: true,
        },
        {
          id: 'contact_consent',
          text: 'I agree to be contacted for follow-up questions or clarifications',
          required: true,
        },
      ],
    },
    {
      id: 'contact_info',
      type: 'contact_info',
      title: 'Contact Information',
      fields: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    },
    {
      id: 'race_ethnicity',
      type: 'multi_choice',
      title: 'What is your race/ethnicity?',
      description: 'Select all that apply',
      options: [
        { id: 'white', text: 'White' },
        { id: 'black', text: 'Black or African American' },
        { id: 'native_american', text: 'American Indian or Alaska Native' },
        { id: 'hispanic', text: 'Hispanic or Latino' },
        { id: 'asian', text: 'Asian' },
        { id: 'pacific_islander', text: 'Native Hawaiian or Pacific Islander' },
        { id: 'other', text: 'Some other race' },
      ],
    },
    {
      id: 'age',
      type: 'number',
      title: 'Enter your age',
      placeholder: 'Age',
      min: 18,
      max: 120,
      required: true,
    },
    {
      id: 'zip_code',
      type: 'text',
      title: 'Enter your ZIP code',
      placeholder: '12345',
      pattern: '^[0-9]{5}$',
      minLength: 5,
      maxLength: 5,
      required: true,
    },
    {
      id: 'household_income',
      type: 'single_choice',
      title: 'What is your household income?',
      options: [
        { id: 'under_50k', text: 'Under $50,000' },
        { id: '50k_99k', text: '$50,000 to $99,999' },
        { id: '100k_149k', text: '$100,000 to $149,999' },
        { id: '150k_plus', text: '$150,000 or more' },
        { id: 'prefer_not_to_say', text: 'Prefer not to say' },
      ],
    },
    {
      id: 'gender',
      type: 'single_choice',
      title: 'What is your gender?',
      options: [
        { id: 'male', text: 'Male' },
        { id: 'female', text: 'Female' },
        { id: 'other', text: 'Other' },
        { id: 'prefer_not_to_say', text: 'Prefer not to say' },
      ],
    },
    {
      id: 'voter_eligibility',
      type: 'single_choice',
      title: 'Are you eligible to vote and likely to vote in 2026 mid-term elections?',
      options: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
        { id: 'not_sure', text: "I'm not sure" },
      ],
    },
    {
      id: 'political_id',
      type: 'single_choice',
      title: 'How do you identify politically?',
      options: [
        { id: 'republican', text: 'Republican' },
        { id: 'democrat', text: 'Democrat' },
        { id: 'other', text: 'Other / Third-Party' },
      ],
    },
    {
      id: 'vote_2016',
      type: 'single_choice',
      title: 'Who did you vote for in the 2016 Presidential election?',
      options: [
        { id: 'trump', text: 'Donald Trump' },
        { id: 'clinton', text: 'Hillary Clinton' },
        { id: 'did_not_vote', text: 'Did not vote' },
        { id: 'other', text: 'Other' },
      ],
    },
    {
      id: 'vote_2020',
      type: 'single_choice',
      title: 'Who did you vote for in the 2020 presidential election?',
      options: [
        { id: 'trump', text: 'Donald Trump' },
        { id: 'biden', text: 'Joe Biden' },
        { id: 'did_not_vote', text: 'Did not vote' },
        { id: 'other', text: 'Other' },
      ],
    },
    {
      id: 'vote_2024',
      type: 'single_choice',
      title: 'Who did you vote for in the 2024 presidential election?',
      options: [
        { id: 'trump', text: 'Donald Trump' },
        { id: 'harris', text: 'Kamala Harris' },
        { id: 'did_not_vote', text: 'Did not vote' },
        { id: 'other', text: 'Other' },
      ],
    },
    {
      id: 'trump_approval',
      type: 'single_choice',
      title: 'How would you rate your view of the job Donald Trump is doing as president?',
      options: [
        { id: 'strongly_approve', text: 'Strongly approve' },
        { id: 'somewhat_approve', text: 'Somewhat approve' },
        { id: 'neutral', text: 'Neutral' },
        { id: 'somewhat_disapprove', text: 'Somewhat disapprove' },
        { id: 'strongly_disapprove', text: 'Strongly disapprove' },
      ],
    },
    {
      id: 'trump_reasoning',
      type: 'textarea',
      title: 'Briefly explain the main reasons for your performance rating of Donald Trump in Question 13',
      placeholder: 'Enter your response...',
      maxLength: 500,
      required: true,
    },
    {
      id: 'health_insurance',
      type: 'single_choice',
      title: 'Where do you get your health insurance?',
      options: [
        { id: 'employer', text: "Employer sponsored (your job or family member's job)" },
        { id: 'medicaid', text: 'Medicaid' },
        { id: 'medicare', text: 'Medicare' },
        { id: 'aca', text: 'ACA marketplace / individual marketplace' },
        { id: 'military', text: 'Military (VA or TRICARE)' },
        { id: 'uninsured', text: 'Uninsured' },
      ],
    },
    {
      id: 'rep_crank_view',
      type: 'textarea',
      title: 'Briefly describe your view of Rep. Jeff Crank',
      placeholder: 'Enter your response...',
      maxLength: 500,
      required: true,
    },
    {
      id: 'media_consumption',
      type: 'textarea',
      title: 'Name five pieces of political or non-political media you consumed this week',
      description: 'They can be podcasts, TV shows, YouTube, personalities, news articles, or prominent social media accounts. Please be as specific as possible.',
      placeholder: 'Enter your response...',
      maxLength: 500,
      required: true,
    },
    {
      id: 'top_issues',
      type: 'textarea',
      title: 'Name three issues that matter most to you',
      placeholder: 'Enter your response...',
      maxLength: 500,
      required: true,
    },
    {
      id: 'advocacy_issues',
      type: 'textarea',
      title: 'Name three issues that are important for your elected officials to advocate for or against',
      placeholder: 'Enter your response...',
      maxLength: 500,
      required: true,
    },
  ],
}

// Export a function to get screener by ID
export function getScreenerConfig(screenerId: string): FocusGroupScreenerConfig | null {
  if (screenerId === 'longwell-v1' || screenerId === 'longwell') {
    return longwellScreener
  }
  return null
}
