import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { FocusGroupComplete } from '@/components/respondent/focus-group'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function FocusGroupThankYouPage({ params }: Props) {
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
      privacy_policy_url
    `)
    .eq('id', campaignId)
    .single()

  if (error || !campaign) {
    notFound()
  }

  return (
    <FocusGroupComplete
      privacyPolicyUrl={campaign.privacy_policy_url}
      termsUrl="https://personagrata.co/terms"
    />
  )
}
