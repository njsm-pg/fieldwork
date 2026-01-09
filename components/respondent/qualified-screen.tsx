'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Gift, Clock, ExternalLink, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface QualifiedScreenProps {
  campaign: {
    id: string
    name: string
    surveyUrl: string
    incentiveAmount: number
    incentiveMethod: string
  }
}

export function QualifiedScreen({ campaign }: QualifiedScreenProps) {
  const [loading, setLoading] = useState(false)

  const handleStartSurvey = async () => {
    setLoading(true)

    try {
      const supabase = createClient()

      // Get respondent from localStorage
      const stored = localStorage.getItem(`respondent_${campaign.id}`)
      if (stored) {
        const { id: respondentId, sessionId } = JSON.parse(stored)

        // Log activity
        await supabase.from('respondent_activity_log').insert({
          respondent_id: respondentId,
          event_type: 'survey_started',
          event_data: { surveyUrl: campaign.surveyUrl },
        })

        // Build survey URL with tracking parameters
        const url = new URL(campaign.surveyUrl)
        url.searchParams.set('rid', respondentId)
        url.searchParams.set('sid', sessionId)
        url.searchParams.set('cid', campaign.id)

        // Redirect to survey
        window.location.href = url.toString()
      } else {
        // Fallback: just redirect without tracking
        window.location.href = campaign.surveyUrl
      }
    } catch (err) {
      console.error('Error starting survey:', err)
      // Still redirect on error
      window.location.href = campaign.surveyUrl
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background px-4 py-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Research Study</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-xl">You're Qualified!</CardTitle>
            <CardDescription>
              Thank you for your responses. You're eligible to participate in this study.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reward info */}
            <div className="rounded-lg bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">${campaign.incentiveAmount} Amazon Gift Card</p>
                  <p className="text-sm text-muted-foreground">
                    Sent via email after completing the survey
                  </p>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div>
              <h3 className="mb-3 font-medium">What to expect:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>The survey takes approximately 12-15 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>Answer all questions thoughtfully and honestly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gift className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>You'll receive your gift card within 24-48 hours</span>
                </li>
              </ul>
            </div>

            {/* Start survey button */}
            <Button
              onClick={handleStartSurvey}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="mr-2 h-4 w-4" />
              )}
              Start Survey
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              You'll be redirected to our survey platform. Please complete the survey in one session.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
