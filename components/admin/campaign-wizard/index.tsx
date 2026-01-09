'use client'

import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { WizardLayout } from './wizard-layout'
import { StepBasics } from './step-basics'
import { StepTargeting } from './step-targeting'
import { StepScreener } from './step-screener'
import { StepConsent } from './step-consent'
import { StepQuotas } from './step-quotas'
import { StepIncentives } from './step-incentives'
import { StepChannels } from './step-channels'
import { StepReview } from './step-review'

const steps = [
  StepBasics,
  StepTargeting,
  StepScreener,
  StepConsent,
  StepQuotas,
  StepIncentives,
  StepChannels,
  StepReview,
]

export function CampaignWizard() {
  const { currentStep } = useCampaignWizardStore()
  const StepComponent = steps[currentStep] || StepBasics

  return (
    <WizardLayout>
      <StepComponent />
    </WizardLayout>
  )
}
