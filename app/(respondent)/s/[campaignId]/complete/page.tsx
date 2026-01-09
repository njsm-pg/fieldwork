import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CompletionScreen } from '@/components/respondent/completion-screen'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface Props {
  params: Promise<{ campaignId: string }>
}

function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-4 py-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Research Study</h1>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

async function CompletionPageContent({ campaignId }: { campaignId: string }) {
  const supabase = await createClient()

  // Fetch campaign details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      incentive_amount,
      incentive_method
    `)
    .eq('id', campaignId)
    .single()

  if (error || !campaign) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingState />}>
      <CompletionScreen
        campaign={{
          id: campaign.id,
          name: campaign.name,
          incentiveAmount: campaign.incentive_amount || 15,
          incentiveMethod: campaign.incentive_method || 'gift_card',
        }}
      />
    </Suspense>
  )
}

export default async function CompletePage({ params }: Props) {
  const { campaignId } = await params
  return <CompletionPageContent campaignId={campaignId} />
}
