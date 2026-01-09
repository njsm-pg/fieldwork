import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, Mail } from 'lucide-react'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function DisqualifiedPage({ params }: Props) {
  const { campaignId } = await params
  const supabase = await createClient()

  // Fetch campaign details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      contact_email
    `)
    .eq('id', campaignId)
    .single()

  if (error || !campaign) {
    notFound()
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <XCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl">Thank You for Your Interest</CardTitle>
            <CardDescription>
              Unfortunately, you don't meet the criteria for this particular study.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">
                We appreciate you taking the time to check your eligibility.
                Our research studies have specific requirements to ensure we gather
                the right insights.
              </p>
            </div>

            <div className="text-center">
              <p className="mb-2 text-sm font-medium">What happens next?</p>
              <p className="text-sm text-muted-foreground">
                Keep an eye out for future research opportunities that may be a better fit.
                We're always looking for participants with different backgrounds and perspectives.
              </p>
            </div>

            {campaign.contact_email && (
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Questions?</p>
                    <a
                      href={`mailto:${campaign.contact_email}`}
                      className="text-primary hover:underline"
                    >
                      {campaign.contact_email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground">
              You may close this window.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
