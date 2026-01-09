'use client'

import { useState, useEffect } from 'react'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, ArrowRight, Search, Loader2 } from 'lucide-react'

interface District {
  id: string
  code: string
  name: string
  state: string
}

export function StepTargeting() {
  const {
    selectedDistricts,
    setTargeting,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedDistricts))

  useEffect(() => {
    async function fetchDistricts() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('districts')
        .select('id, code, name, state')
        .order('state')
        .order('code')

      if (!error && data) {
        setDistricts(data)
      }
      setLoading(false)
    }
    fetchDistricts()
  }, [])

  const filteredDistricts = districts.filter(
    (d) =>
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase())
  )

  const groupedByState = filteredDistricts.reduce<Record<string, District[]>>(
    (acc, district) => {
      if (!acc[district.state]) acc[district.state] = []
      acc[district.state].push(district)
      return acc
    },
    {}
  )

  const toggleDistrict = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectAllInState = (state: string) => {
    const stateDistricts = districts.filter((d) => d.state === state)
    setSelected((prev) => {
      const next = new Set(prev)
      stateDistricts.forEach((d) => next.add(d.id))
      return next
    })
  }

  const handleBack = () => {
    setTargeting(Array.from(selected))
    setCurrentStep(0)
  }

  const handleContinue = () => {
    setTargeting(Array.from(selected))
    markStepComplete(1)
    setCurrentStep(2)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Targeting</CardTitle>
        <CardDescription>
          Select the congressional districts you want to target for this campaign
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selected.size} selected</Badge>
            {selected.size > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelected(new Set())}
              >
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search districts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* District list */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : districts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">No districts found</p>
            <p className="text-sm text-muted-foreground">
              Districts need to be added to your organization first
            </p>
          </div>
        ) : (
          <ScrollArea className="h-64 rounded-md border p-4">
            {Object.entries(groupedByState).map(([state, stateDistricts]) => (
              <div key={state} className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm font-semibold">{state}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => selectAllInState(state)}
                  >
                    Select all
                  </Button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {stateDistricts.map((district) => (
                    <div
                      key={district.id}
                      className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                    >
                      <Checkbox
                        id={district.id}
                        checked={selected.has(district.id)}
                        onCheckedChange={() => toggleDistrict(district.id)}
                      />
                      <Label
                        htmlFor={district.id}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {district.code}
                        <span className="ml-2 text-muted-foreground">
                          {district.name}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue} disabled={selected.size === 0}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
