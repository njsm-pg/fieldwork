'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, Gift, Mail, Loader2, AlertCircle, PartyPopper } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface CompletionScreenProps {
  campaign: {
    id: string
    name: string
    incentiveAmount: number
    incentiveMethod: string
  }
}

export function CompletionScreen({ campaign }: CompletionScreenProps) {
  const searchParams = useSearchParams()
  const respondentId = searchParams.get('rid')

  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEmailValid = email && email === confirmEmail && email.includes('@')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmailValid) return

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Try to get respondent ID from URL or localStorage
      let rid = respondentId
      if (!rid) {
        const stored = localStorage.getItem(`respondent_${campaign.id}`)
        if (stored) {
          rid = JSON.parse(stored).id
        }
      }

      if (!rid) {
        throw new Error('Session not found. Please contact support.')
      }

      // Update respondent with payout email and completion status
      const { error: updateError } = await supabase
        .from('respondents')
        .update({
          status: 'completed',
          payout_email: email,
          survey_completed_at: new Date().toISOString(),
        })
        .eq('id', rid)

      if (updateError) throw updateError

      // Create payout record
      const { error: payoutError } = await supabase
        .from('payouts')
        .insert({
          respondent_id: rid,
          campaign_id: campaign.id,
          amount: campaign.incentiveAmount,
          recipient_email: email,
          status: 'pending',
        })

      if (payoutError) throw payoutError

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: rid,
        event_type: 'survey_completed',
        event_data: { payoutEmail: email },
      })

      // Clear local storage
      localStorage.removeItem(`respondent_${campaign.id}`)

      setSubmitted(true)
    } catch (err: any) {
      console.error('Error submitting:', err)
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b bg-background px-4 py-4">
          <div className="text-center">
            <h1 className="text-lg font-semibold">Research Study</h1>
          </div>
        </header>

        {/* Success state */}
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <PartyPopper className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-xl">You're All Set!</CardTitle>
              <CardDescription>
                Your gift card is on its way
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-center">
                <Gift className="mx-auto mb-2 h-8 w-8 text-green-600 dark:text-green-400" />
                <p className="font-medium text-green-800 dark:text-green-300">
                  ${campaign.incentiveAmount} Amazon Gift Card
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Will be sent to {email}
                </p>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>You should receive your gift card within 24-48 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>Check your spam folder if you don't see it</span>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Thank you for participating in our research! You may close this window.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background px-4 py-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Research Study</h1>
        </div>
      </header>

      {/* Form state */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-xl">Survey Complete!</CardTitle>
            <CardDescription>
              Enter your email to receive your ${campaign.incentiveAmount} gift card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirm email</Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                {confirmEmail && email !== confirmEmail && (
                  <p className="text-xs text-destructive">Emails don't match</p>
                )}
              </div>

              <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Your ${campaign.incentiveAmount} Amazon gift card will be sent to this email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isEmailValid || loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Claim My Gift Card
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Make sure to enter the correct email. Gift cards cannot be re-sent to a different address.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
