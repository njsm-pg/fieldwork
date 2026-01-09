'use client'

import { useState, useEffect } from 'react'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

interface District {
  id: string
  code: string
  name: string
  state: string
}

export function StepQuotas() {
  const {
    selectedDistricts,
    desiredCompletes,
    quotas,
    setQuotas,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)
  const [localQuotas, setLocalQuotas] = useState<Record<string, number>>(quotas)

  useEffect(() => {
    async function fetchDistricts() {
      if (selectedDistricts.length === 0) {
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('districts')
        .select('id, code, name, state')
        .in('id', selectedDistricts)
        .order('state')
        .order('code')

      if (!error && data) {
        setDistricts(data)

        // Initialize quotas evenly if not set
        if (Object.keys(localQuotas).length === 0) {
          const evenSplit = Math.floor(desiredCompletes / data.length)
          const remainder = desiredCompletes % data.length
          const newQuotas: Record<string, number> = {}
          data.forEach((d, index) => {
            newQuotas[d.id] = evenSplit + (index < remainder ? 1 : 0)
          })
          setLocalQuotas(newQuotas)
        }
      }
      setLoading(false)
    }
    fetchDistricts()
  }, [selectedDistricts, desiredCompletes])

  const handleQuotaChange = (districtId: string, value: number) => {
    setLocalQuotas((prev) => ({
      ...prev,
      [districtId]: Math.max(0, value),
    }))
  }

  const totalQuota = Object.values(localQuotas).reduce((sum, q) => sum + q, 0)

  const distributeEvenly = () => {
    const evenSplit = Math.floor(desiredCompletes / districts.length)
    const remainder = desiredCompletes % districts.length
    const newQuotas: Record<string, number> = {}
    districts.forEach((d, index) => {
      newQuotas[d.id] = evenSplit + (index < remainder ? 1 : 0)
    })
    setLocalQuotas(newQuotas)
  }

  const handleBack = () => {
    setQuotas(localQuotas)
    setCurrentStep(3)
  }

  const handleContinue = () => {
    setQuotas(localQuotas)
    markStepComplete(4)
    setCurrentStep(5)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (districts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quota Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No districts selected.</p>
            <p className="text-sm">Go back to targeting to select districts.</p>
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => setCurrentStep(1)}>
              Go to Targeting
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group by state
  const groupedByState = districts.reduce<Record<string, District[]>>(
    (acc, district) => {
      if (!acc[district.state]) acc[district.state] = []
      acc[district.state].push(district)
      return acc
    },
    {}
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quota Allocation</CardTitle>
        <CardDescription>
          Set target completes for each district. Total should match your campaign target of {desiredCompletes}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <div>
            <p className="text-sm font-medium">Total Quota</p>
            <p className={`text-2xl font-bold ${totalQuota !== desiredCompletes ? 'text-destructive' : 'text-primary'}`}>
              {totalQuota} / {desiredCompletes}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={distributeEvenly}>
            Distribute Evenly
          </Button>
        </div>

        {totalQuota !== desiredCompletes && (
          <p className="text-sm text-destructive">
            {totalQuota > desiredCompletes
              ? `Over target by ${totalQuota - desiredCompletes}`
              : `Under target by ${desiredCompletes - totalQuota}`}
          </p>
        )}

        {/* Quota inputs by state */}
        {Object.entries(groupedByState).map(([state, stateDistricts]) => (
          <div key={state} className="space-y-3">
            <Label className="text-sm font-semibold">{state}</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {stateDistricts.map((district) => (
                <div key={district.id} className="flex items-center gap-3">
                  <Label className="w-20 flex-shrink-0 text-sm">
                    {district.code}
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    value={localQuotas[district.id] || 0}
                    onChange={(e) =>
                      handleQuotaChange(district.id, parseInt(e.target.value) || 0)
                    }
                    className="w-24"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

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
