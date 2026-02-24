import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { FocusGroupLanding } from '@/components/respondent/focus-group'
import { getScreenerConfig } from '@/lib/screeners/longwell'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function FocusGroupLandingPage({ params }: Props) {
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

  // Get screener config based on campaign settings
  const screenerId = (campaign.settings as any)?.screenerId || 'longwell'
  const screener = getScreenerConfig(screenerId)

  if (!screener) {
    notFound()
  }

  const isShortScreener = screenerId === 'longwell-short'

  return (
    <>
      {isShortScreener && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17958682844"
            strategy="afterInteractive"
          />
          <Script id="google-ads-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17958682844');
            `}
          </Script>
        </>
      )}
      <FocusGroupLanding
        campaignId={campaign.id}
        screener={screener}
        privacyPolicyUrl={campaign.privacy_policy_url}
        termsUrl="/terms"
      />
    </>
  )
}
