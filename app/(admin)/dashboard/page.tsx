import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, TrendingUp, Users, DollarSign, Target } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch dashboard stats
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, status')

  const { data: respondents } = await supabase
    .from('respondents')
    .select('id, status')

  const { data: payouts } = await supabase
    .from('payouts')
    .select('id, amount, status')

  const activeCampaigns = campaigns?.filter((c) => c.status === 'active').length || 0
  const totalRespondents = respondents?.length || 0
  const completedResponses = respondents?.filter((r) => r.status === 'survey_completed').length || 0
  const totalPaid = payouts?.filter((p) => p.status === 'sent').reduce((sum, p) => sum + (p.amount || 0), 0) || 0
  const pendingPayouts = payouts?.filter((p) => p.status === 'pending').length || 0

  const stats = [
    {
      title: 'Active Campaigns',
      value: activeCampaigns,
      icon: Target,
      description: 'Currently running',
    },
    {
      title: 'Total Respondents',
      value: totalRespondents,
      icon: Users,
      description: 'All time',
    },
    {
      title: 'Completed Surveys',
      value: completedResponses,
      icon: TrendingUp,
      description: 'Successfully completed',
    },
    {
      title: 'Total Paid Out',
      value: `$${totalPaid.toLocaleString()}`,
      icon: DollarSign,
      description: `${pendingPayouts} pending`,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your campaigns.</p>
        </div>
        <Button asChild>
          <Link href="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>Your most recent campaign activity</CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns && campaigns.length > 0 ? (
            <div className="text-sm text-muted-foreground">
              You have {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}.
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <Megaphone className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">No campaigns yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first campaign to start collecting responses.
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

import { Megaphone } from 'lucide-react'
