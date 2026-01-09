'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PayoutTable, type Payout } from '@/components/admin/payouts/payout-table'
import { PayoutDrawer } from '@/components/admin/payouts/payout-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Search, Send, DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react'

type TabValue = 'all' | 'pending' | 'sent' | 'failed'

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tab, setTab] = useState<TabValue>('pending')
  const [search, setSearch] = useState('')
  const [campaignFilter, setCampaignFilter] = useState<string>('all')
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([])
  const [sending, setSending] = useState(false)
  const [stats, setStats] = useState({
    pending: 0,
    pendingAmount: 0,
    sent: 0,
    sentAmount: 0,
    failed: 0,
    failedAmount: 0,
  })

  useEffect(() => {
    fetchPayouts()
    fetchCampaigns()
  }, [])

  async function fetchPayouts() {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from('payouts')
      .select(`
        id,
        amount,
        recipient_email,
        status,
        created_at,
        sent_at,
        error_message,
        respondent:respondents(
          id,
          zip_code,
          district:districts(code)
        ),
        campaign:campaigns(id, name)
      `)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPayouts(data as unknown as Payout[])

      // Calculate stats
      const newStats = {
        pending: 0,
        pendingAmount: 0,
        sent: 0,
        sentAmount: 0,
        failed: 0,
        failedAmount: 0,
      }

      data.forEach((p: any) => {
        if (p.status === 'pending') {
          newStats.pending++
          newStats.pendingAmount += p.amount
        } else if (p.status === 'sent') {
          newStats.sent++
          newStats.sentAmount += p.amount
        } else if (p.status === 'failed') {
          newStats.failed++
          newStats.failedAmount += p.amount
        }
      })

      setStats(newStats)
    }

    setLoading(false)
  }

  async function fetchCampaigns() {
    const supabase = createClient()
    const { data } = await supabase
      .from('campaigns')
      .select('id, name')
      .order('name')

    if (data) setCampaigns(data)
  }

  const filteredPayouts = payouts.filter((p) => {
    // Tab filter
    if (tab !== 'all' && p.status !== tab) return false

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      if (
        !p.recipient_email.toLowerCase().includes(searchLower) &&
        !p.campaign?.name.toLowerCase().includes(searchLower) &&
        !p.respondent?.district?.code.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    // Campaign filter
    if (campaignFilter !== 'all' && p.campaign?.id !== campaignFilter) {
      return false
    }

    return true
  })

  const handleSendPayout = async (id: string) => {
    // In a real app, this would call an API to send the gift card
    console.log('Sending payout:', id)
    // For now, just mark as sent
    const supabase = createClient()
    await supabase
      .from('payouts')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', id)
    fetchPayouts()
  }

  const handleBulkSend = async () => {
    if (selectedIds.size === 0) return

    setSending(true)
    // In a real app, batch send payouts
    for (const id of selectedIds) {
      await handleSendPayout(id)
    }
    setSelectedIds(new Set())
    setSending(false)
    fetchPayouts()
  }

  const handleViewDetails = (payout: Payout) => {
    setSelectedPayout(payout)
    setDrawerOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Payouts</h1>
        <p className="text-muted-foreground">
          Manage gift card payouts for survey completions
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.pendingAmount.toLocaleString()} to send
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.sentAmount.toLocaleString()} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.failedAmount.toLocaleString()} needs retry
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payouts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All campaigns" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All campaigns</SelectItem>
              {campaigns.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedIds.size > 0 && (
          <Button onClick={handleBulkSend} disabled={sending}>
            {sending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Send {selectedIds.size} Selected
          </Button>
        )}
      </div>

      {/* Tabs and table */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="sent">Sent ({stats.sent})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({stats.failed})</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <PayoutTable
              payouts={filteredPayouts}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onSendPayout={handleSendPayout}
              onViewDetails={handleViewDetails}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Detail drawer */}
      <PayoutDrawer
        payout={selectedPayout}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSend={handleSendPayout}
      />
    </div>
  )
}
