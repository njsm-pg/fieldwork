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
      description: 'Select all to proceed',
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
      type: 'multi_choice',
      title: 'What are the main reasons for your performance rating of Donald Trump?',
      description: 'Select all that apply',
      options: [
        { id: 'affordability', text: 'Their handling of affordability and cost of living (prices, housing, childcare)' },
        { id: 'economy', text: 'Their approach to the economy and taxes (jobs, wages, inflation)' },
        { id: 'immigration', text: 'Their approach to immigration and border policy' },
        { id: 'foreign_policy', text: 'Their approach to foreign policy and national security (Ukraine, Israel/Gaza, China)' },
        { id: 'rights_safety', text: 'Their approach to rights and public safety (reproductive rights, gun policy, crime)' },
      ],
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
      type: 'single_choice',
      title: 'What is your view of Rep. Jeff Crank?',
      options: [
        { id: 'favorable', text: 'Favorable' },
        { id: 'unfavorable', text: 'Unfavorable' },
        { id: 'neutral', text: 'Neutral / No strong opinion' },
        { id: 'dont_know', text: "Don't know who this is" },
      ],
    },
    {
      id: 'media_consumption',
      type: 'multi_choice',
      title: 'Which of the following media sources do you consume regularly?',
      description: 'Select all that apply',
      options: [
        { id: 'cnn', text: 'CNN' },
        { id: 'fox_news', text: 'Fox News' },
        { id: 'msnbc', text: 'MSNBC' },
        { id: 'nytimes', text: 'The New York Times' },
        { id: 'wapo', text: 'The Washington Post' },
        { id: 'wsj', text: 'The Wall Street Journal' },
        { id: 'youtube', text: 'YouTube' },
        { id: 'twitter', text: 'X (Twitter)' },
        { id: 'tiktok', text: 'TikTok' },
        { id: 'podcasts', text: 'Podcasts' },
      ],
    },
    {
      id: 'top_issues',
      type: 'multi_choice',
      title: 'Which issues matter most to you?',
      description: 'Select all that apply',
      options: [
        { id: 'economy', text: 'The economy (inflation, jobs, wages)' },
        { id: 'healthcare', text: 'Healthcare (cost, access, prescription drugs)' },
        { id: 'immigration', text: 'Immigration and border policy' },
        { id: 'climate', text: 'Climate change and energy (gas prices, renewables)' },
        { id: 'public_safety', text: 'Public safety and crime (policing, gun violence)' },
      ],
    },
  ],
}

// Short version with only consent and contact info
export const longwellShortScreener: FocusGroupScreenerConfig = {
  id: 'longwell-short',
  name: 'Longwell Focus Group Screener (Short)',
  description: 'Shortened screener for Colorado 5th District focus group recruitment',
  incentiveAmount: 120,
  incentiveMethod: 'gift_card',
  estimatedMinutes: 2,
  questions: [
    {
      id: 'consent',
      type: 'consent',
      title: 'Consent & Verification',
      description: 'Select all to proceed',
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
  ],
}

// Export a function to get screener by ID
export function getScreenerConfig(screenerId: string): FocusGroupScreenerConfig | null {
  if (screenerId === 'longwell-v1' || screenerId === 'longwell') {
    return longwellScreener
  }
  if (screenerId === 'longwell-short') {
    return longwellShortScreener
  }
  return null
}
