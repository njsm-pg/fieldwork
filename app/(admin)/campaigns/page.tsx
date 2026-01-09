import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Plus, Megaphone, MoreHorizontal, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-green-100 text-green-700',
  paused: 'bg-orange-100 text-orange-700',
  completed: 'bg-blue-100 text-blue-700',
  archived: 'bg-gray-100 text-gray-500',
}

export default async function CampaignsPage() {
  const supabase = await createClient()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select(`
      *,
      campaign_districts(
        target_completes,
        districts(code, name)
      )
    `)
    .order('created_at', { ascending: false })

  // Get respondent counts for each campaign
  const campaignIds = campaigns?.map((c) => c.id) || []
  const { data: respondentCounts } = await supabase
    .from('respondents')
    .select('campaign_id, status')
    .in('campaign_id', campaignIds)

  const getCampaignStats = (campaignId: string) => {
    const campaignRespondents = respondentCounts?.filter((r) => r.campaign_id === campaignId) || []
    return {
      total: campaignRespondents.length,
      completed: campaignRespondents.filter((r) => r.status === 'survey_completed').length,
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-muted-foreground">Manage your survey campaigns</p>
        </div>
        <Button asChild>
          <Link href="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            {campaigns?.length || 0} campaign{campaigns?.length !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns && campaigns.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Districts</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Fill Rate</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => {
                  const stats = getCampaignStats(campaign.id)
                  const districts = campaign.campaign_districts?.map((cd: any) => cd.districts?.code).filter(Boolean)
                  const totalTarget = campaign.campaign_districts?.reduce((sum: number, cd: any) => sum + (cd.target_completes || 0), 0) || campaign.desired_completes
                  const fillRate = totalTarget > 0 ? Math.round((stats.completed / totalTarget) * 100) : 0

                  return (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <Link
                          href={`/campaigns/${campaign.id}`}
                          className="font-medium hover:underline"
                        >
                          {campaign.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {campaign.objective === 'online_survey' ? 'Online Survey' : 'Focus Group'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[campaign.status] || 'bg-gray-100'}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {districts && districts.length > 0 ? (
                          <div className="flex gap-1">
                            {districts.slice(0, 2).map((code: string) => (
                              <Badge key={code} variant="outline">
                                {code}
                              </Badge>
                            ))}
                            {districts.length > 2 && (
                              <Badge variant="outline">+{districts.length - 2}</Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{totalTarget}</TableCell>
                      <TableCell>{stats.completed}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${Math.min(fillRate, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm">{fillRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/campaigns/${campaign.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/campaigns/${campaign.id}/edit`}>
                                Edit Campaign
                              </Link>
                            </DropdownMenuItem>
                            {campaign.survey_url && (
                              <DropdownMenuItem asChild>
                                <a href={campaign.survey_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open Survey
                                </a>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Megaphone className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">No campaigns yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first campaign to start collecting survey responses.
              </p>
              <Button asChild className="mt-4">
                <Link href="/campaigns/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
