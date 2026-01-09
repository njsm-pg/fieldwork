import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { QualifiedScreen } from '@/components/respondent/qualified-screen'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function QualifiedPage({ params }: Props) {
  const { campaignId } = await params
  const supabase = await createClient()

  // Fetch campaign details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      status,
      survey_url,
      incentive_amount,
      incentive_method
    `)
    .eq('id', campaignId)
    .eq('status', 'active')
    .single()

  if (error || !campaign || !campaign.survey_url) {
    notFound()
  }

  return (
    <QualifiedScreen
      campaign={{
        id: campaign.id,
        name: campaign.name,
        surveyUrl: campaign.survey_url,
        incentiveAmount: campaign.incentive_amount || 15,
        incentiveMethod: campaign.incentive_method || 'gift_card',
      }}
    />
  )
}
