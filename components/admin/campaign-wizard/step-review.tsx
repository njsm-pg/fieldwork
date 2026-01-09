'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  MapPin,
  HelpCircle,
  FileText,
  Target,
  Gift,
  Megaphone,
  Rocket,
} from 'lucide-react'

interface District {
  id: string
  code: string
  name: string
}

export function StepReview() {
  const router = useRouter()
  const store = useCampaignWizardStore()
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDistricts() {
      if (store.selectedDistricts.length === 0) return

      const supabase = createClient()
      const { data } = await supabase
        .from('districts')
        .select('id, code, name')
        .in('id', store.selectedDistricts)

      if (data) setDistricts(data)
    }
    fetchDistricts()
  }, [store.selectedDistricts])

  const handleBack = () => {
    store.setCurrentStep(6)
  }

  const handleLaunch = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Get current user's organization
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!userData?.organization_id) throw new Error('No organization found')

      // Create campaign
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          organization_id: userData.organization_id,
          name: store.name,
          slug: store.name.toLowerCase().replace(/\s+/g, '-'),
          status: 'draft',
          survey_url: store.surveyUrl,
          desired_completes: store.desiredCompletes,
          start_date: store.startDate,
          end_date: store.endDate,
          incentive_amount: store.incentiveAmount,
          incentive_method: store.incentiveMethod,
          consent_text: store.consentText,
          privacy_policy_url: store.privacyPolicyUrl || null,
          contact_email: store.contactEmail || null,
          meta_ads_enabled: store.metaAdsEnabled,
          google_ads_enabled: store.googleAdsEnabled,
        })
        .select()
        .single()

      if (campaignError) throw campaignError

      // Create campaign districts with quotas
      if (store.selectedDistricts.length > 0) {
        const campaignDistricts = store.selectedDistricts.map((districtId) => ({
          campaign_id: campaign.id,
          district_id: districtId,
          target_completes: store.quotas[districtId] || 0,
        }))

        await supabase.from('campaign_districts').insert(campaignDistricts)

        // Initialize quota tracking
        const quotaTracking = store.selectedDistricts.map((districtId) => ({
          campaign_id: campaign.id,
          district_id: districtId,
          target: store.quotas[districtId] || 0,
          filled: 0,
        }))

        await supabase.from('quota_tracking').insert(quotaTracking)
      }

      // Create screener questions
      if (store.screenerQuestions.length > 0) {
        const questions = store.screenerQuestions.map((q, index) => ({
          campaign_id: campaign.id,
          question_text: q.question_text,
          question_type: q.question_type,
          options: q.options,
          order_index: index,
        }))

        await supabase.from('screener_questions').insert(questions)
      }

      // Create consent version if provided
      if (store.consentText || store.acknowledgments.length > 0) {
        await supabase.from('consent_versions').insert({
          campaign_id: campaign.id,
          version_number: 1,
          consent_text: store.consentText,
          acknowledgments: store.acknowledgments,
          is_active: true,
        })
      }

      // Reset wizard and redirect
      store.reset()
      router.push(`/campaigns/${campaign.id}`)
    } catch (err: any) {
      console.error('Error creating campaign:', err)
      setError(err.message || 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  const totalQuota = Object.values(store.quotas).reduce((sum, q) => sum + q, 0)
  const totalIncentiveCost = store.incentiveAmount * store.desiredCompletes
  const dailyAdSpend = (store.metaAdsEnabled ? store.metaBudget : 0) + (store.googleAdsEnabled ? store.googleBudget : 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Launch</CardTitle>
        <CardDescription>
          Review your campaign settings before launching
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Campaign name */}
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold text-lg">{store.name || 'Untitled Campaign'}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {store.surveyUrl || 'No survey URL set'}
          </p>
        </div>

        {/* Summary sections */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Targeting */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <MapPin className="h-4 w-4" />
              Targeting
            </div>
            <p className="text-2xl font-bold">{store.selectedDistricts.length}</p>
            <p className="text-sm text-muted-foreground">Districts selected</p>
            {districts.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {districts.slice(0, 5).map((d) => (
                  <Badge key={d.id} variant="secondary" className="text-xs">
                    {d.code}
                  </Badge>
                ))}
                {districts.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{districts.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Screener */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <HelpCircle className="h-4 w-4" />
              Screener
            </div>
            <p className="text-2xl font-bold">{store.screenerQuestions.length}</p>
            <p className="text-sm text-muted-foreground">
              {store.screenerQuestions.length === 0 ? 'No screener questions' : 'Qualification questions'}
            </p>
          </div>

          {/* Quotas */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Target className="h-4 w-4" />
              Quotas
            </div>
            <p className="text-2xl font-bold">{store.desiredCompletes}</p>
            <p className="text-sm text-muted-foreground">Target completes</p>
            {totalQuota !== store.desiredCompletes && totalQuota > 0 && (
              <p className="text-xs text-destructive mt-1">
                Quota allocation: {totalQuota}
              </p>
            )}
          </div>

          {/* Incentives */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Gift className="h-4 w-4" />
              Incentives
            </div>
            <p className="text-2xl font-bold">${store.incentiveAmount}</p>
            <p className="text-sm text-muted-foreground">Per complete ({store.incentiveMethod === 'gift_card' ? 'Gift Card' : 'Direct Deposit'})</p>
            <p className="text-xs text-muted-foreground mt-1">
              Est. total: ${totalIncentiveCost.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Channels */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3">
            <Megaphone className="h-4 w-4" />
            Advertising Channels
          </div>
          {!store.metaAdsEnabled && !store.googleAdsEnabled ? (
            <p className="text-sm text-muted-foreground">No advertising enabled</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {store.metaAdsEnabled && (
                <Badge className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Meta Ads (${store.metaBudget}/day)
                </Badge>
              )}
              {store.googleAdsEnabled && (
                <Badge className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Google Ads (${store.googleBudget}/day)
                </Badge>
              )}
            </div>
          )}
          {dailyAdSpend > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Total daily ad spend: ${dailyAdSpend}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            <FileText className="h-4 w-4" />
            Consent
          </div>
          {store.consentText ? (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {store.consentText}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No consent text configured</p>
          )}
          {store.acknowledgments.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {store.acknowledgments.length} acknowledgment checkbox(es)
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack} disabled={loading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleLaunch} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Rocket className="mr-2 h-4 w-4" />
            )}
            Create Campaign
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
