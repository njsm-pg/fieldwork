'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Gift, Clock, Shield, AlertCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface LandingConsentProps {
  campaign: {
    id: string
    name: string
    incentiveAmount: number
    incentiveMethod: string
    consentText: string | null
    acknowledgments: any[]
    privacyPolicyUrl: string | null
    contactEmail: string | null
    consentVersionId: string | null
  }
}

export function LandingConsent({ campaign }: LandingConsentProps) {
  const router = useRouter()
  const [zipCode, setZipCode] = useState('')
  const [ageConsent, setAgeConsent] = useState(false)
  const [participationConsent, setParticipationConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFormValid = zipCode.length === 5 && ageConsent && participationConsent

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

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
          campaign_id: campaign.id,
          session_id: sessionId,
          zip_code: zipCode,
          status: 'consented',
          consented_at: new Date().toISOString(),
          consent_version_id: campaign.consentVersionId,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      // Store session in cookie/localStorage for the respondent flow
      document.cookie = `respondent_${campaign.id}=${sessionId}; path=/; max-age=${7 * 24 * 60 * 60}`
      localStorage.setItem(`respondent_${campaign.id}`, JSON.stringify({
        id: respondent.id,
        sessionId,
        zipCode,
      }))

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondent.id,
        event_type: 'consent_granted',
        event_data: { zipCode, consentVersionId: campaign.consentVersionId },
      })

      // Navigate to screener
      router.push(`/s/${campaign.id}/screener`)
    } catch (err: any) {
      console.error('Error:', err)
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
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
      <main className="flex-1 p-4">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Gift className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-xl">
              Earn ${campaign.incentiveAmount} for Your Opinions
            </CardTitle>
            <CardDescription className="text-center">
              Complete a 12-15 minute survey and receive an Amazon Gift Card
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {/* Survey details */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">12-15 min</p>
                  <p className="text-xs text-muted-foreground">Survey length</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Confidential</p>
                  <p className="text-xs text-muted-foreground">Your data is secure</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* ZIP Code */}
              <div className="space-y-2">
                <Label htmlFor="zipCode">Enter your ZIP code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder="12345"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-lg"
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground text-center">
                  We use this to check if you're eligible for this study
                </p>
              </div>

              {/* Consent checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="ageConsent"
                    checked={ageConsent}
                    onCheckedChange={(checked) => setAgeConsent(checked as boolean)}
                    disabled={loading}
                  />
                  <Label htmlFor="ageConsent" className="text-sm font-normal leading-relaxed">
                    I am 18 years of age or older
                  </Label>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="participationConsent"
                    checked={participationConsent}
                    onCheckedChange={(checked) => setParticipationConsent(checked as boolean)}
                    disabled={loading}
                  />
                  <Label htmlFor="participationConsent" className="text-sm font-normal leading-relaxed">
                    I agree to participate and understand how my data will be used.{' '}
                    {campaign.privacyPolicyUrl && (
                      <a
                        href={campaign.privacyPolicyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </a>
                    )}
                  </Label>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid || loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </form>

            {/* Footer text */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to participate in this research study.
              Your responses are confidential and will be used for research purposes only.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
