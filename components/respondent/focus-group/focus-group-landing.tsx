'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Gift, Clock, Shield, AlertCircle, Loader2, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FocusGroupScreenerConfig } from '@/lib/types/focus-group'

interface FocusGroupLandingProps {
  campaignId: string
  screener: FocusGroupScreenerConfig
  privacyPolicyUrl?: string | null
  termsUrl?: string | null
}

export function FocusGroupLanding({
  campaignId,
  screener,
  privacyPolicyUrl,
  termsUrl,
}: FocusGroupLandingProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Generate a session ID for this respondent
      const sessionId = crypto.randomUUID()

      // Create respondent record
      const { data: respondent, error: insertError } = await supabase
        .from('respondents')
        .insert({
          campaign_id: campaignId,
          session_id: sessionId,
          status: 'landed',
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message || 'Failed to create respondent')
      }

      // Store session in cookie/localStorage for the respondent flow
      document.cookie = `respondent_${campaignId}=${sessionId}; path=/; max-age=${7 * 24 * 60 * 60}`
      localStorage.setItem(`respondent_${campaignId}`, JSON.stringify({
        id: respondent.id,
        sessionId,
      }))

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondent.id,
        event_type: 'focus_group_landing',
        event_data: { screenerId: screener.id },
      })

      // Navigate to screener
      router.push(`/s/${campaignId}/focus-group/screener`)
    } catch (err: unknown) {
      console.error('Error:', JSON.stringify(err, null, 2))
      const errorMessage = err instanceof Error
        ? err.message
        : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : 'An error occurred. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background px-4 py-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Focus Group Research</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-xl">
              ${screener.incentiveAmount} Incentive for Focus Group
            </CardTitle>
            <CardDescription className="text-center">
              (If Qualified & Selected)
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {/* Intro text */}
            <p className="mb-6 text-center text-muted-foreground">
              Thanks for clicking – your perspective matters. Complete this short questionnaire to see if you qualify for a live focus group.
            </p>

            {/* Survey details */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Quick and easy</p>
                  <p className="text-xs text-muted-foreground">
                    Most people finish in {screener.estimatedMinutes || 5} minutes or less
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Gift className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">${screener.incentiveAmount} incentive</p>
                  <p className="text-xs text-muted-foreground">
                    Selected participants who complete the 2-hour focus group receive ${screener.incentiveAmount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Confidential and secure</p>
                  <p className="text-xs text-muted-foreground">
                    Your data stays confidential and secure
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Start button */}
            <Button
              onClick={handleStart}
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Start Now
            </Button>

            {/* Disclosure */}
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Disclosure:</strong> Participation in this research (including any questionnaire, survey, interview, or focus group) does not guarantee eligibility for an incentive. Only individuals who meet our client&apos;s criteria will be invited to participate in any incentivized research activity. Persona Grata Inc. (&quot;PGI&quot;) facilitates participant matching and assumes no liability or responsibility for client-determined eligibility requirements, incentive fulfillment, or research content.
                {(termsUrl || privacyPolicyUrl) && (
                  <>
                    {' '}For more information, please review Persona Grata Inc.&apos;s{' '}
                    {termsUrl && (
                      <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>
                    )}
                    {termsUrl && privacyPolicyUrl && ' and '}
                    {privacyPolicyUrl && (
                      <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    )}
                    .
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background px-4 py-3">
        <p className="text-center text-xs text-muted-foreground">
          Persona Grata Inc.
        </p>
      </footer>
    </div>
  )
}
