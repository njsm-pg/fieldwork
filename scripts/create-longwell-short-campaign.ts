/**
 * Create Longwell Short Focus Group Campaign
 *
 * Run with: npx tsx scripts/create-longwell-short-campaign.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('Creating Longwell Short Focus Group Campaign...\n')

  // Get existing organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id')
    .limit(1)
    .single()

  if (orgError || !org) {
    console.error('No organization found:', orgError)
    process.exit(1)
  }

  // Create new focus group campaign with short screener
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .insert({
      organization_id: org.id,
      name: 'Longwell Focus Group (Short)',
      slug: 'longwell-focus-group-short',
      status: 'active',
      objective: 'focus_group',
      desired_completes: 12,
      incentive_amount: 120,
      incentive_method: 'gift_card',
      completion_definition: 'manual',
      meta_ads_enabled: false,
      google_ads_enabled: false,
      utm_source: 'direct',
      utm_medium: 'none',
      overfill_handling: 'allow_10',
      privacy_policy_url: '/privacy',
      contact_email: 'research@personagrata.ai',
      settings: {
        screenerId: 'longwell-short',
      },
      google_headlines: [],
      google_descriptions: [],
    })
    .select()
    .single()

  if (campaignError) {
    console.error('Failed to create campaign:', campaignError)
    process.exit(1)
  }

  console.log('Campaign created successfully!')
  console.log(`Campaign ID: ${campaign.id}`)
  console.log(`\nLive URL: https://mvp-02-mauve.vercel.app/s/${campaign.id}/focus-group`)
}

main().catch(console.error)
