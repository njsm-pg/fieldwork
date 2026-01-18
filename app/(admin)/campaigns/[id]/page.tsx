import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Target,
  Gift,
  Calendar,
  Users,
  TrendingUp,
  Megaphone,
  Edit,
} from 'lucide-react'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-green-100 text-green-700',
  paused: 'bg-orange-100 text-orange-700',
  completed: 'bg-blue-100 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch campaign with districts
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      campaign_districts(
        target_completes,
        districts(id, code, name, state)
      )
    `)
    .eq('id', id)
    .single()

  if (error || !campaign) {
    notFound()
  }

  // Fetch respondent stats
  const { data: respondents } = await supabase
    .from('respondents')
    .select('status')
    .eq('campaign_id', id)

  const stats = {
    total: respondents?.length || 0,
    completed: respondents?.filter((r) => r.status === 'survey_completed').length || 0,
    qualified: respondents?.filter((r) => r.status === 'screener_passed' || r.status === 'survey_started' || r.status === 'survey_completed').length || 0,
  }

  const districts = campaign.campaign_districts?.map((cd: any) => ({
    ...cd.districts,
    target: cd.target_completes,
  })) || []

  const totalTarget = districts.reduce((sum: number, d: any) => sum + (d.target || 0), 0) || campaign.desired_completes
  const fillRate = totalTarget > 0 ? Math.round((stats.completed / totalTarget) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{campaign.name}</h1>
              <Badge className={statusColors[campaign.status]}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {campaign.objective === 'online_survey' ? 'Online Survey' : 'Focus Group'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {campaign.survey_url && (
            <Button variant="outline" asChild>
              <a href={campaign.survey_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Survey
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href={`/campaigns/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Respondents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">of {totalTarget} target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Fill Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{fillRate}%</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${Math.min(fillRate, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Incentive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${campaign.incentive_amount}</p>
            <p className="text-sm text-muted-foreground">
              {campaign.incentive_method === 'gift_card' ? 'Gift Card' : 'Direct Deposit'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Details */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaign.survey_url && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Survey URL</p>
                <a
                  href={campaign.survey_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {campaign.survey_url}
                </a>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {campaign.start_date || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Date</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {campaign.end_date || 'Not set'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Advertising</p>
              <div className="mt-1 flex gap-2">
                {campaign.meta_ads_enabled && (
                  <Badge variant="outline">
                    <Megaphone className="mr-1 h-3 w-3" />
                    Meta Ads
                    {campaign.meta_daily_budget && ` ($${campaign.meta_daily_budget}/day)`}
                  </Badge>
                )}
                {campaign.google_ads_enabled && (
                  <Badge variant="outline">
                    <Megaphone className="mr-1 h-3 w-3" />
                    Google Ads
                    {campaign.google_daily_budget && ` ($${campaign.google_daily_budget}/day)`}
                  </Badge>
                )}
                {!campaign.meta_ads_enabled && !campaign.google_ads_enabled && (
                  <span className="text-sm text-muted-foreground">No advertising enabled</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Districts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Target Districts
            </CardTitle>
            <CardDescription>
              {districts.length} district{districts.length !== 1 ? 's' : ''} selected
            </CardDescription>
          </CardHeader>
          <CardContent>
            {districts.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {districts.map((district: any) => (
                  <Badge key={district.id} variant="secondary">
                    {district.code}
                    {district.target > 0 && (
                      <span className="ml-1 text-muted-foreground">({district.target})</span>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No districts selected</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Consent Text */}
      {campaign.consent_text && (
        <Card>
          <CardHeader>
            <CardTitle>Consent Text</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{campaign.consent_text}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
