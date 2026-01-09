'use client'

import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Gift, CreditCard, DollarSign } from 'lucide-react'

export function StepIncentives() {
  const {
    incentiveAmount,
    incentiveMethod,
    desiredCompletes,
    setIncentives,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const totalCost = incentiveAmount * desiredCompletes

  const handleBack = () => {
    setCurrentStep(4)
  }

  const handleContinue = () => {
    markStepComplete(5)
    setCurrentStep(6)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incentives</CardTitle>
        <CardDescription>
          Configure the reward respondents receive for completing the survey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Incentive Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              min={1}
              max={500}
              value={incentiveAmount}
              onChange={(e) =>
                setIncentives({ incentiveAmount: parseInt(e.target.value) || 0 })
              }
              className="pl-9"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Amount each respondent receives for a completed survey
          </p>
        </div>

        {/* Quick amounts */}
        <div className="flex flex-wrap gap-2">
          {[5, 10, 15, 20, 25, 50].map((amount) => (
            <Button
              key={amount}
              variant={incentiveAmount === amount ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIncentives({ incentiveAmount: amount })}
            >
              ${amount}
            </Button>
          ))}
        </div>

        {/* Method */}
        <div className="space-y-3">
          <Label>Delivery Method</Label>
          <RadioGroup
            value={incentiveMethod}
            onValueChange={(value) =>
              setIncentives({ incentiveMethod: value as 'gift_card' | 'direct_deposit' })
            }
          >
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <RadioGroupItem value="gift_card" id="gift_card" className="mt-1" />
              <Label htmlFor="gift_card" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className="font-medium">Gift Card</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Amazon gift cards sent via email. Most common and widely accepted.
                </p>
              </Label>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 opacity-50">
              <RadioGroupItem value="direct_deposit" id="direct_deposit" className="mt-1" disabled />
              <Label htmlFor="direct_deposit" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">Direct Deposit</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs">Coming Soon</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Direct bank transfer. Higher completion rates but requires more setup.
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Cost estimate */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Estimated Total Cost</p>
              <p className="text-xs text-muted-foreground">
                Based on {desiredCompletes} target completes
              </p>
            </div>
            <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
