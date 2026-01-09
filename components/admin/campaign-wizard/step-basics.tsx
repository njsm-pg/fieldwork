'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const basicsSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  surveyUrl: z.string().url('Please enter a valid URL'),
  desiredCompletes: z.number().min(1, 'Must be at least 1').max(100000),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

type BasicsFormData = z.infer<typeof basicsSchema>

export function StepBasics() {
  const {
    name,
    surveyUrl,
    desiredCompletes,
    startDate,
    endDate,
    setBasics,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BasicsFormData>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      name,
      surveyUrl,
      desiredCompletes,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  })

  useEffect(() => {
    setValue('name', name)
    setValue('surveyUrl', surveyUrl)
    setValue('desiredCompletes', desiredCompletes)
    if (startDate) setValue('startDate', startDate)
    if (endDate) setValue('endDate', endDate)
  }, [name, surveyUrl, desiredCompletes, startDate, endDate, setValue])

  const onSubmit = (data: BasicsFormData) => {
    setBasics({
      name: data.name,
      surveyUrl: data.surveyUrl,
      desiredCompletes: data.desiredCompletes,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    })
    markStepComplete(0)
    setCurrentStep(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Basics</CardTitle>
        <CardDescription>
          Set up the foundational details for your research campaign
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              placeholder="e.g., PA-08 Voter Survey Q1 2024"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="surveyUrl">Survey URL</Label>
            <Input
              id="surveyUrl"
              type="url"
              placeholder="https://survey.example.com/your-survey"
              {...register('surveyUrl')}
            />
            <p className="text-xs text-muted-foreground">
              The external survey platform URL where respondents will be redirected
            </p>
            {errors.surveyUrl && (
              <p className="text-sm text-destructive">{errors.surveyUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredCompletes">Target Completes</Label>
            <Input
              id="desiredCompletes"
              type="number"
              min={1}
              max={100000}
              {...register('desiredCompletes', { valueAsNumber: true })}
            />
            <p className="text-xs text-muted-foreground">
              Total number of completed surveys you want to collect
            </p>
            {errors.desiredCompletes && (
              <p className="text-sm text-destructive">{errors.desiredCompletes.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date (Optional)</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
