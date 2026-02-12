/**
 * Setup script for Focus Group Screener testing
 *
 * Run with: npx tsx scripts/setup-focus-group-test.ts
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

async function runMigration() {
  console.log('Running migration: add first_name and last_name columns...')

  // Check if columns already exist by trying to select them
  const { error: checkError } = await supabase
    .from('respondents')
    .select('first_name, last_name')
    .limit(1)

  if (!checkError) {
    console.log('Columns already exist, skipping migration.')
    return true
  }

  // Run migration via RPC or direct SQL
  // Note: This requires the service role key and SQL execution permissions
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      ALTER TABLE respondents
      ADD COLUMN IF NOT EXISTS first_name TEXT,
      ADD COLUMN IF NOT EXISTS last_name TEXT;
    `
  })

  if (error) {
    // If RPC doesn't exist, provide manual instructions
    console.log('\nCannot run migration automatically.')
    console.log('Please run this SQL in your Supabase Dashboard (SQL Editor):')
    console.log('---')
    console.log(`
ALTER TABLE respondents
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

CREATE INDEX IF NOT EXISTS idx_respondents_names
ON respondents (first_name, last_name);
    `)
    console.log('---')
    return false
  }

  console.log('Migration completed successfully!')
  return true
}

async function createTestCampaign() {
  console.log('\nCreating test focus group campaign...')

  // First, get or create an organization
  let { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id')
    .limit(1)
    .single()

  if (orgError || !org) {
    console.log('Creating test organization...')
    const { data: newOrg, error: createOrgError } = await supabase
      .from('organizations')
      .insert({
        name: 'Test Organization',
        slug: 'test-org',
        settings: {},
      })
      .select()
      .single()

    if (createOrgError) {
      console.error('Failed to create organization:', createOrgError)
      return null
    }
    org = newOrg
  }

  // Check if a focus group campaign already exists
  const { data: existingCampaign } = await supabase
    .from('campaigns')
    .select('id, name')
    .eq('objective', 'focus_group')
    .eq('status', 'active')
    .limit(1)
    .single()

  if (existingCampaign) {
    console.log(`Found existing focus group campaign: ${existingCampaign.name}`)
    console.log(`Campaign ID: ${existingCampaign.id}`)
    return existingCampaign.id
  }

  // Create new focus group campaign
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .insert({
      organization_id: org.id,
      name: 'Longwell Focus Group Test',
      slug: 'longwell-focus-group-test',
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
      privacy_policy_url: 'https://personagrata.co/privacy',
      contact_email: 'research@personagrata.co',
      settings: {
        screenerId: 'longwell',
      },
      google_headlines: [],
      google_descriptions: [],
    })
    .select()
    .single()

  if (campaignError) {
    console.error('Failed to create campaign:', campaignError)
    return null
  }

  console.log(`Created campaign: ${campaign.name}`)
  console.log(`Campaign ID: ${campaign.id}`)
  return campaign.id
}

async function main() {
  console.log('=== Focus Group Screener Test Setup ===\n')

  // Run migration
  await runMigration()

  // Create test campaign
  const campaignId = await createTestCampaign()

  if (campaignId) {
    console.log('\n=== Setup Complete ===')
    console.log(`\nTest URL: http://localhost:3000/s/${campaignId}/focus-group`)
    console.log('\nStart the dev server with: npm run dev')
  }
}

main().catch(console.error)
