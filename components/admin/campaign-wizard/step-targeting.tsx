'use client'

import { useState, useEffect, useMemo } from 'react'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ArrowLeft, ArrowRight, ChevronsUpDown, Loader2, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedDistricts))

  useEffect(() => {
    async function fetchDistricts() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('districts')
        .select('id, code, name, state')
        .is('organization_id', null)
        .order('state')
        .order('code')

      if (!error && data) {
        setDistricts(data)
      }
      setLoading(false)
    }
    fetchDistricts()
  }, [])

  // Get selected district objects for display
  const selectedDistrictObjects = useMemo(() => {
    return districts.filter((d) => selected.has(d.id))
  }, [districts, selected])

  // Group districts by state for the dropdown
  const groupedByState = useMemo(() => {
    const filtered = search
      ? districts.filter(
          (d) =>
            d.code.toLowerCase().includes(search.toLowerCase()) ||
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.state.toLowerCase().includes(search.toLowerCase())
        )
      : districts

    return filtered.reduce<Record<string, District[]>>((acc, district) => {
      if (!acc[district.state]) acc[district.state] = []
      acc[district.state].push(district)
      return acc
    }, {})
  }, [districts, search])

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

  const removeDistrict = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
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

  const deselectAllInState = (state: string) => {
    const stateDistricts = districts.filter((d) => d.state === state)
    setSelected((prev) => {
      const next = new Set(prev)
      stateDistricts.forEach((d) => next.delete(d.id))
      return next
    })
  }

  const isStateFullySelected = (state: string) => {
    const stateDistricts = districts.filter((d) => d.state === state)
    return stateDistricts.every((d) => selected.has(d.id))
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
        {/* Selected count and clear button */}
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

        {/* Selected districts as badges */}
        {selectedDistrictObjects.length > 0 && (
          <div className="flex flex-wrap gap-2 rounded-md border p-3">
            {selectedDistrictObjects.map((district) => (
              <Badge
                key={district.id}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {district.code}
                <button
                  type="button"
                  onClick={() => removeDistrict(district.id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {district.code}</span>
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Command-based autocomplete */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                Search districts...
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search by district code, name, or state..."
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No districts found.</CommandEmpty>
                  {Object.entries(groupedByState).map(([state, stateDistricts]) => (
                    <CommandGroup key={state} heading={state}>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-xs text-muted-foreground">
                          {stateDistricts.filter((d) => selected.has(d.id)).length} of{' '}
                          {stateDistricts.length} selected
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (isStateFullySelected(state)) {
                              deselectAllInState(state)
                            } else {
                              selectAllInState(state)
                            }
                          }}
                        >
                          {isStateFullySelected(state) ? 'Deselect all' : 'Select all'}
                        </Button>
                      </div>
                      {stateDistricts.map((district) => (
                        <CommandItem
                          key={district.id}
                          value={district.id}
                          onSelect={() => toggleDistrict(district.id)}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selected.has(district.id) ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          <span className="font-medium">{district.code}</span>
                          <span className="ml-2 text-muted-foreground">
                            {district.name}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
