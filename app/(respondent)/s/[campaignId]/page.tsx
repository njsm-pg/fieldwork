import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { LandingConsent } from '@/components/respondent/landing-consent'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function RespondentLandingPage({ params }: Props) {
  const { campaignId } = await params
  const supabase = await createClient()

  // Fetch campaign details
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      status,
      incentive_amount,
      incentive_method,
      consent_text,
      privacy_policy_url,
      contact_email,
      consent_versions(id, consent_text, acknowledgments)
    `)
    .eq('id', campaignId)
    .eq('status', 'active')
    .single()

  if (error || !campaign) {
    notFound()
  }

  const activeConsent = campaign.consent_versions?.find((cv: any) => cv) || null

  return (
    <LandingConsent
      campaign={{
        id: campaign.id,
        name: campaign.name,
        incentiveAmount: campaign.incentive_amount,
        incentiveMethod: campaign.incentive_method,
        consentText: activeConsent?.consent_text || campaign.consent_text,
        acknowledgments: activeConsent?.acknowledgments || [],
        privacyPolicyUrl: campaign.privacy_policy_url,
        contactEmail: campaign.contact_email,
        consentVersionId: activeConsent?.id,
      }}
    />
  )
}
