import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
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
      privacy_policy_url,
      settings
    `)
    .eq('id', campaignId)
    .single()

  if (error || !campaign) {
    notFound()
  }

  return (
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
      <FocusGroupComplete
        privacyPolicyUrl={campaign.privacy_policy_url}
        termsUrl="/terms"
      />
    </>
  )
}
