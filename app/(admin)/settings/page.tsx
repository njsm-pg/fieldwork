'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Loader2,
  Save,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Gift,
  Link as LinkIcon,
  Building2,
} from 'lucide-react'

interface GiftCardSettings {
  provider: 'tremendous' | 'cardivo'
  tremendousApiKey: string
  cardivoApiKey: string
  defaultProductId: string
}

interface AdConnection {
  platform: 'meta' | 'google'
  isConnected: boolean
  accountName: string | null
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Organization
  const [orgName, setOrgName] = useState('')
  const [orgSlug, setOrgSlug] = useState('')

  // Gift card settings
  const [giftCardSettings, setGiftCardSettings] = useState<GiftCardSettings>({
    provider: 'tremendous',
    tremendousApiKey: '',
    cardivoApiKey: '',
    defaultProductId: '',
  })

  // Ad connections
  const [adConnections, setAdConnections] = useState<AdConnection[]>([
    { platform: 'meta', isConnected: false, accountName: null },
    { platform: 'google', isConnected: false, accountName: null },
  ])

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    setLoading(true)
    const supabase = createClient()

    // Get user's organization
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: userData } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', user.id)
      .single()

    if (!userData?.organization_id) {
      setLoading(false)
      return
    }

    // Fetch organization
    const { data: org } = await supabase
      .from('organizations')
      .select('name, slug')
      .eq('id', userData.organization_id)
      .single()

    if (org) {
      setOrgName(org.name)
      setOrgSlug(org.slug)
    }

    // Fetch gift card settings
    const { data: giftSettings } = await supabase
      .from('gift_card_settings')
      .select('*')
      .eq('organization_id', userData.organization_id)
      .single()

    if (giftSettings) {
      setGiftCardSettings({
        provider: giftSettings.provider || 'tremendous',
        tremendousApiKey: giftSettings.tremendous_api_key_encrypted ? '••••••••' : '',
        cardivoApiKey: giftSettings.cardivo_api_key_encrypted ? '••••••••' : '',
        defaultProductId: giftSettings.default_product_id || '',
      })
    }

    // Fetch ad connections
    const { data: connections } = await supabase
      .from('ad_connections')
      .select('platform, is_connected, account_name')
      .eq('organization_id', userData.organization_id)

    if (connections) {
      setAdConnections([
        connections.find((c) => c.platform === 'meta') || { platform: 'meta', is_connected: false, account_name: null },
        connections.find((c) => c.platform === 'google') || { platform: 'google', is_connected: false, account_name: null },
      ].map((c) => ({
        platform: c.platform as 'meta' | 'google',
        isConnected: c.is_connected || false,
        accountName: c.account_name || null,
      })))
    }

    setLoading(false)
  }

  async function handleSaveOrganization() {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!userData?.organization_id) throw new Error('No organization found')

      const { error } = await supabase
        .from('organizations')
        .update({ name: orgName, slug: orgSlug })
        .eq('id', userData.organization_id)

      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveGiftCardSettings() {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!userData?.organization_id) throw new Error('No organization found')

      // Upsert gift card settings
      const updates: any = {
        organization_id: userData.organization_id,
        provider: giftCardSettings.provider,
        default_product_id: giftCardSettings.defaultProductId,
      }

      // Only update API keys if they've been changed (not placeholder)
      if (giftCardSettings.tremendousApiKey && !giftCardSettings.tremendousApiKey.includes('•')) {
        updates.tremendous_api_key_encrypted = giftCardSettings.tremendousApiKey
      }
      if (giftCardSettings.cardivoApiKey && !giftCardSettings.cardivoApiKey.includes('•')) {
        updates.cardivo_api_key_encrypted = giftCardSettings.cardivoApiKey
      }

      const { error } = await supabase
        .from('gift_card_settings')
        .upsert(updates, { onConflict: 'organization_id' })

      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleConnectAd = (platform: 'meta' | 'google') => {
    // In a real app, this would initiate OAuth flow
    console.log(`Connecting ${platform}...`)
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and integrations
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Settings saved successfully</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="organization">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Organization Tab */}
        <TabsContent value="organization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organization Details
              </CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Your Organization"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgSlug">URL Slug</Label>
                <Input
                  id="orgSlug"
                  value={orgSlug}
                  onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="your-organization"
                />
                <p className="text-xs text-muted-foreground">
                  Used in URLs and identifiers
                </p>
              </div>
              <div className="pt-4">
                <Button onClick={handleSaveOrganization} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gift Cards Tab */}
        <TabsContent value="gift-cards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Gift Card Provider
              </CardTitle>
              <CardDescription>
                Configure your gift card delivery provider for survey incentives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Provider</Label>
                <RadioGroup
                  value={giftCardSettings.provider}
                  onValueChange={(value) =>
                    setGiftCardSettings({ ...giftCardSettings, provider: value as 'tremendous' | 'cardivo' })
                  }
                >
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="tremendous" id="tremendous" className="mt-1" />
                    <Label htmlFor="tremendous" className="flex-1 cursor-pointer">
                      <span className="font-medium">Tremendous</span>
                      <p className="text-sm text-muted-foreground">
                        Popular choice with wide gift card selection and easy integration
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="cardivo" id="cardivo" className="mt-1" />
                    <Label htmlFor="cardivo" className="flex-1 cursor-pointer">
                      <span className="font-medium">Cardivo</span>
                      <p className="text-sm text-muted-foreground">
                        Competitive pricing with fast delivery times
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {giftCardSettings.provider === 'tremendous' && (
                <div className="space-y-2">
                  <Label htmlFor="tremendousKey">Tremendous API Key</Label>
                  <Input
                    id="tremendousKey"
                    type="password"
                    value={giftCardSettings.tremendousApiKey}
                    onChange={(e) =>
                      setGiftCardSettings({ ...giftCardSettings, tremendousApiKey: e.target.value })
                    }
                    placeholder="Enter your API key"
                  />
                  <p className="text-xs text-muted-foreground">
                    Find this in your Tremendous dashboard under API settings
                  </p>
                </div>
              )}

              {giftCardSettings.provider === 'cardivo' && (
                <div className="space-y-2">
                  <Label htmlFor="cardivoKey">Cardivo API Key</Label>
                  <Input
                    id="cardivoKey"
                    type="password"
                    value={giftCardSettings.cardivoApiKey}
                    onChange={(e) =>
                      setGiftCardSettings({ ...giftCardSettings, cardivoApiKey: e.target.value })
                    }
                    placeholder="Enter your API key"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="productId">Default Product ID (Optional)</Label>
                <Input
                  id="productId"
                  value={giftCardSettings.defaultProductId}
                  onChange={(e) =>
                    setGiftCardSettings({ ...giftCardSettings, defaultProductId: e.target.value })
                  }
                  placeholder="e.g., amazon-us"
                />
                <p className="text-xs text-muted-foreground">
                  The default gift card product to send (usually Amazon)
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveGiftCardSettings} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Gift Card Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Ad Platform Connections
              </CardTitle>
              <CardDescription>
                Connect your advertising accounts to run campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meta */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Meta Ads</p>
                    <p className="text-sm text-muted-foreground">
                      {adConnections.find(c => c.platform === 'meta')?.isConnected
                        ? adConnections.find(c => c.platform === 'meta')?.accountName || 'Connected'
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {adConnections.find(c => c.platform === 'meta')?.isConnected ? (
                    <>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleConnectAd('meta')}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>

              {/* Google */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Google Ads</p>
                    <p className="text-sm text-muted-foreground">
                      {adConnections.find(c => c.platform === 'google')?.isConnected
                        ? adConnections.find(c => c.platform === 'google')?.accountName || 'Connected'
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {adConnections.find(c => c.platform === 'google')?.isConnected ? (
                    <>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleConnectAd('google')}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
