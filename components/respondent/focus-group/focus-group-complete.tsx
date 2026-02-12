'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Clock, Mail, Shield } from 'lucide-react'
interface FocusGroupCompleteProps {
  privacyPolicyUrl?: string | null
  termsUrl?: string | null
}

export function FocusGroupComplete({
  privacyPolicyUrl,
  termsUrl,
}: FocusGroupCompleteProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with progress */}
      <header className="border-b bg-background px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Complete</span>
          <span>100% Complete</span>
        </div>
        <Progress value={100} className="h-2" />
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl">
              We&apos;ve got your responses – our team is reviewing them now
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <p className="mb-6 text-center text-muted-foreground">
              Thank you for completing the questionnaire. We&apos;ll review your responses soon to confirm eligibility for this focus group. If you&apos;re selected, we&apos;ll contact you via your preferred method with next steps and incentive details.
            </p>

            {/* Info items */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">
                  Our review usually takes 1-3 business days
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">
                  You&apos;ll be notified through your preferred contact method
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm">
                  Your information remains confidential and secure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Disclosure footer */}
      <div className="border-t bg-muted/30 px-4 py-3">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
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

      {/* Footer */}
      <footer className="border-t bg-background px-4 py-3">
        <p className="text-center text-xs text-muted-foreground">
          Persona Grata Inc.
        </p>
      </footer>
    </div>
  )
}
