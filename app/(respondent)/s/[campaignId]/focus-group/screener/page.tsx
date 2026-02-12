import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FocusGroupScreener } from '@/components/respondent/focus-group'
import { longwellScreener } from '@/lib/screeners/longwell'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function FocusGroupScreenerPage({ params }: Props) {
  const { campaignId } = await params
  const supabase = await createClient()

  // Fetch campaign details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      status,
      objective,
      privacy_policy_url,
      settings
    `)
    .eq('id', campaignId)
    .eq('status', 'active')
    .single()

  if (error || !campaign) {
    notFound()
  }

  // Verify this is a focus group campaign
  if (campaign.objective !== 'focus_group') {
    notFound()
  }

  // Get screener config - for now, default to Longwell
  const screenerId = (campaign.settings as any)?.screenerId || 'longwell'
  const screener = screenerId === 'longwell' ? longwellScreener : longwellScreener

  return (
    <FocusGroupScreener
      campaignId={campaign.id}
      screener={screener}
      privacyPolicyUrl={campaign.privacy_policy_url}
      termsUrl="https://personagrata.co/terms"
    />
  )
}
