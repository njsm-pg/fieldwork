'use client'

import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const steps = [
  { id: 0, name: 'Basics', description: 'Campaign name & survey URL' },
  { id: 1, name: 'Targeting', description: 'Select districts' },
  { id: 2, name: 'Screener', description: 'Qualification questions' },
  { id: 3, name: 'Consent', description: 'Legal consent text' },
  { id: 4, name: 'Quotas', description: 'Per-district targets' },
  { id: 5, name: 'Incentives', description: 'Reward settings' },
  { id: 6, name: 'Channels', description: 'Ad platforms' },
  { id: 7, name: 'Review', description: 'Confirm & launch' },
]

interface WizardLayoutProps {
  children: React.ReactNode
}

export function WizardLayout({ children }: WizardLayoutProps) {
  const { currentStep, completedSteps, setCurrentStep } = useCampaignWizardStore()

  const canNavigateToStep = (stepId: number) => {
    // Can always go back to completed steps
    if (completedSteps.includes(stepId)) return true
    // Can go to current step
    if (stepId === currentStep) return true
    // Can go to next step if current is complete
    if (stepId === currentStep + 1 && completedSteps.includes(currentStep)) return true
    return false
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar stepper */}
      <aside className="hidden w-64 border-r bg-muted/30 p-6 lg:block">
        <nav className="space-y-1">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id
            const isClickable = canNavigateToStep(step.id)

            return (
              <button
                key={step.id}
                onClick={() => isClickable && setCurrentStep(step.id)}
                disabled={!isClickable}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors',
                  isCurrent && 'bg-primary/10',
                  isClickable && !isCurrent && 'hover:bg-muted',
                  !isClickable && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isCurrent && !isCompleted && 'border-2 border-primary text-primary',
                    !isCurrent && !isCompleted && 'border border-muted-foreground/50 text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.description}
                  </p>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Mobile stepper */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 lg:hidden z-10">
        <div className="flex items-center justify-center gap-1">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id

            return (
              <div
                key={step.id}
                className={cn(
                  'h-2 rounded-full transition-all',
                  isCurrent ? 'w-8 bg-primary' : 'w-2',
                  isCompleted && !isCurrent && 'bg-primary/50',
                  !isCompleted && !isCurrent && 'bg-muted-foreground/30'
                )}
              />
            )
          })}
        </div>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.name}
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="mx-auto max-w-3xl p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
